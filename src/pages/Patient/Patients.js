import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider/useAuth';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PatientsTable from '../../partials/patient/PatientsTable';
import ModalBasic from '../../components/ModalBasic';
import { Api } from '../../services/api';
import { useQuery } from 'react-query';

function Patients() {

  const auth = useAuth()
  const navigate = useNavigate()

  const { data: patientsList, isLoading } = useQuery(`/patient/?user_professional_id=${auth.id}`, async () => {
    const response = await Api.get(`/patient/?user_professional_id=${auth.id}`)

    return response.data.patients
  })

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  const [name, setName] = useState("")
  const [birthData, setBirthData] = useState("")
  const [gender, setGender] = useState("m")
  const [email, setEmail] = useState("")
  const [nullFields, setNullFields] = useState({ name: true, birthData: true })

  const handleSave = async () => {
    try {
      if (!name || !birthData) {
        setNullFields({ ...nullFields, name: Boolean(name), birthData: Boolean(birthData) })
        return
      }

      const patientData = { name, birth_data: birthData, gender, email, user_professional_id: auth.id }

      const { data } = await Api.post('/patient/new', patientData)


      navigate(`/patients/edit/${data.patient.id}`)
    } catch (error) {
      console.log("Falha ao criar paciente.")
    }
  }

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangeBirthData = e => {
    setBirthData(e.target.value)
  }

  const onChangeGender = e => {
    setGender(e.target.value)
  }

  const onChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Pacientes</h1>
              </div>

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add patient button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="xs:block ml-2" aria-controls="feedback-modal">Adicionar paciente</span>
                </button>
              </div>

            </div>

            {patientsList && <PatientsTable patients={patientsList} />}

            {isLoading && <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
              <header className="px-5 py-4">
                <h2 className="font-semibold text-gray-800">Meus Pacientes</h2>
              </header>
              <div>
                <div className="overflow-x-auto">
                  <div className="flex items-center justify-center text-gray-500 text-lg text-center px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#38BDF8" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="#38BDF8" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>

                    Carregando
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </main>

      </div>

      {/* Send Feedback */}
      <div className="">
        {/* Start */}
        <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="Adicionar paciente">
          {/* Modal content */}
          <div className="px-5 py-4">
            <div className="flex mb-3">
              <div className='flex-1 mr-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">Nome completo <span className="text-red-500">*</span></label>
                  <input id="name" className={`form-input w-full px-2 py-1 ${!nullFields.name && "border-red-300"}`} type="text" required onChange={onChangeName} value={name} />
                </div>
                {!nullFields.name && <div className="text-xs mt-1 text-red-500">Esse campo ?? obrigat??rio!</div>}
              </div>
              <div className='flex-3'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="birth_data">Data de nascimento <span className="text-red-500">*</span></label>
                  <input id="birth_data" className={`form-input w-full px-2 py-1 ${!nullFields.birthData && "border-red-300"}`} type="date" required onChange={onChangeBirthData} value={birthData} />
                </div>
                {!nullFields.birthData && <div className="text-xs mt-1 text-red-500">Esse campo ?? obrigat??rio!</div>}
              </div>
            </div>

            <div className="flex mb-3">

              <div className="flex flex-wrap items-center -m-3">

                <div className="m-3">
                  {/* Start */}
                  <label className="flex items-center" onChange={onChangeGender}>
                    <input type="radio" name="radio-buttons" className="form-radio" value="m" checked={gender === "m"} />
                    <span className="text-sm ml-2">Masculino</span>
                  </label>
                  {/* End */}
                </div>
                <div className="m-3">
                  {/* Start */}
                  <label className="flex items-center" onChange={onChangeGender}>
                    <input type="radio" name="radio-buttons" className="form-radio" value="f" checked={gender === "f"} />
                    <span className="text-sm ml-2">Feminino</span>
                  </label>
                  {/* End */}
                </div>

              </div>

            </div>

            <div className="flex mb-3">
              <div className='flex-1 mr-2'>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input id="email" className="form-input w-full px-2 py-1" type="email" required value={email} onChange={onChangeEmail} />
              </div>
            </div>
          </div>
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancelar</button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleSave()}>Salvar</button>
            </div>
          </div>
        </ModalBasic>
        {/* End */}
      </div>

    </div>
  );
}

export default Patients;