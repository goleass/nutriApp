import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Api } from '../../services/api'
import { getInitialsName } from '../../utils/Utils';

function ProfileContent({ id }) {

  const { data: patient } = useQuery(`patient/${id}`, async () => {
    const response = await Api.get(`patient/${id}`)

    return response.data.patient
  })
  const auth = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(patient.name ? patient.name : "")
  const [birthData, setBirthData] = useState(patient.birth_data.split("T")[0].split('-').join("-"))
  const [gender, setGender] = useState(patient.gender ? patient.gender : "m")
  const [email, setEmail] = useState(patient.email ? patient.email : "")
  const [isLoading, setIsLoading] = useState(false)
  const [nullFields, setNullFields] = useState({ name: true, birthData: true })

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

  const handleUpdate = async () => {
    try {
      setIsLoading(true)

      if (!name || !birthData) {
        setNullFields({ ...nullFields, name: Boolean(name), birthData: Boolean(birthData) })
        return
      }

      const patientData = { name, birth_data: birthData, gender, email }

      await Api.put(`/patient/update/${id}`, patientData)

      navigate(`/patients/edit/${id}`)
    } catch (error) {
      if (error && error.response && error.response.status === 401) auth.setUserU(null)
      console.log("Falha ao salvar paciente.", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Picture */}
        <section>
          <h2 className="text-xl text-gray-800 font-bold mb-5">Foto de Perfil</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <div className="flex items-center justify-center bg-blue-200 rounded-full w-16 h-16 text-lg font-semibold uppercase text-slate-500">{getInitialsName(name)}</div>
              {/* <img className="w-20 h-20 rounded-full" src={Image} width="80" height="80" alt="User upload" /> */}
            </div>
            {/* <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Atualizar</button> */}
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Dados pessoais do paciente</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='flex-1 mr-2'>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Nome completo <span className="text-red-500">*</span></label>
                <input id="name" className={`form-input w-full px-2 py-1 ${!nullFields.name && "border-red-300"}`} type="text" required onChange={onChangeName} value={name} />
              </div>
              {!nullFields.name && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
            </div>
            <div className='flex-3'>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="birth_data">Data de nascimento <span className="text-red-500">*</span></label>
                <input id="birth_data" className={`form-input w-full px-2 py-1 ${!nullFields.birthData && "border-red-300"}`} type="date" required onChange={onChangeBirthData} value={birthData} />
              </div>
              {!nullFields.birthData && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
            </div>
          </div>

          <div className='flex-1 mr-2 mt-3'>
            <div>
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
          </div>

        </section>
        {/* Email */}
        <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Acesso ao aplicativo</h2>
          <div className="text-sm">Este email será utilizado para permitir que o paciente possa acessar o aplicativo.</div>
          <div className="flex flex-wrap mt-5">
            <div className='flex-1 mr-2'>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email </label>
              <input id="email" className="form-input w-full px-2 py-1" type="email" required value={email} onChange={onChangeEmail} />
            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button disabled={isLoading} className="btn disabled:opacity-75 disabled:bg-indigo-600 bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => handleUpdate()}>
              {isLoading && <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}

              {isLoading ? 'Salvando...' : 'Salvar mudanças'}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfileContent;