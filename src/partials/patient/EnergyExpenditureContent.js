import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import moment from 'moment';

import { Api } from '../../services/api';

function EnergyExpenditureContent({ id, energyExpenditure }) {

  const navigate = useNavigate()

  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const { data: patient } = useQuery(`patient/${id}`, async () => {
    const response = await Api.get(`patient/${id}`)

    return response.data.patient
  })

  const [description, setDescription] = useState(energyExpenditure ? energyExpenditure.description : `${patient.EnergyExpenditures.length + 1} ° Cálculo de gastos energéticos`)
  const [tall, setTall] = useState(energyExpenditure ? energyExpenditure.tall : "")
  const [weight, setWeight] = useState(energyExpenditure ? energyExpenditure.weight : "")
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState(energyExpenditure ? energyExpenditure.physical_activity_level : "")
  const [formula, setFormula] = useState(energyExpenditure ? energyExpenditure.formula : "")
  const [energyExpenditureDate, setEnergyExpenditureDate] = useState(energyExpenditure ? energyExpenditure.energy_expenditure_date.split("T")[0].split('-').join("-") : new Date().toLocaleDateString().split("/").reverse().join("-"))
  const [calculatedFormula, setCalculatedFormula] = useState({ tmb: 0, get: 0 })

  const [nullFields, setNullFields] = useState({ description: true, energyExpenditureDate: true, tall: true, weight: true, formula: true, physicalActivityLevel: true })

  const calculate = () => {
    const age = moment().diff(moment(patient.birth_data), 'years')
    const gender = patient.gender

    const result = gender === 'm' ? 66 + (13.7 * weight) + (5 * tall * 100) - (6.8 * age) : 655 + (9.6 * weight) + (1.8 * tall * 100) - (4.7 * age)

    setCalculatedFormula({ get: (result * physicalActivityLevel).toFixed(), tmb: result.toFixed() })

  }

  useEffect(() => {
    calculate()
  }, []);

  useEffect(() => {
    calculate()
  }, [tall, weight, physicalActivityLevel, formula]);

  const onChangeEnergyExpenditureDate = e => {
    setEnergyExpenditureDate(e.target.value)
  }

  const onChangeWeight = e => {
    setWeight(e.target.value)
  }

  const onChangeFormula = e => {
    setFormula(e.target.value)
  }

  const onChangePhysicalActivityLevel = e => {
    setPhysicalActivityLevel(e.target.value)
  }

  const onChangeTall = e => {
    setTall(e.target.value)
  }

  const onChangeDescription = e => {
    setDescription(e.target.value)
  }

  const makeDate = () => {
    const data = {
      description,
      energy_expenditure_date: energyExpenditureDate,
      tall: parseFloat(tall),
      weight: parseFloat(weight),
      formula: parseInt(formula),
      physical_activity_level: parseFloat(physicalActivityLevel),
      user_patient_id: id
    }

    return data
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setNullFields({ ...nullFields, description: !!description.trim(), energyExpenditureDate: !!energyExpenditureDate, tall: !!tall, weight: !!weight, formula: !!formula, physicalActivityLevel: !!physicalActivityLevel })

      if (!description || !energyExpenditureDate || !energyExpenditureDate || !tall || !weight || !formula || !physicalActivityLevel) {
        return
      }

      const energyExpenditureData = makeDate()

      await Api.post('/energy-expenditure/new', energyExpenditureData)


      navigate(`/patients/edit/${id}`)
    } catch (error) {
      if (error && error.response && error.response.status === 401) auth.setUserU(null)
      console.log("Falha ao salvar gasto energético.")
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      setNullFields({ ...nullFields, description: !!description.trim(), energyExpenditureDate: !!energyExpenditureDate, tall: !!tall, weight: !!weight, formula: !!formula, physicalActivityLevel: !!physicalActivityLevel })

      if (!description || !energyExpenditureDate || !energyExpenditureDate || !tall || !weight || !formula || !physicalActivityLevel) {
        return
      }

      const energyExpenditureData = makeDate()

      await Api.put(`/energy-expenditure/update/${energyExpenditure.id}`, energyExpenditureData)

      navigate(`/patients/edit/${id}`)
    } catch (error) {
      if (error && error.response && error.response.status === 401) auth.setUserU(null)
      console.log("Falha ao salvar gasto energético.", error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-grow">
      <header>
        <div className="flex flex-row px-6 py-5 border-b border-gray-200">
          <NavLink className={"flex"} to={`/patients/edit/${id}`}>
            <div className="w-7 h-7 rounded-full shrink-0 bg-indigo-500 hover:bg-indigo-600 mr-2 cursor-pointer items-center">
              <svg className="w-7 h-7 fill-current text-white" viewBox="0 0 36 36">
                <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
              </svg>
            </div>
          </NavLink>
          <h1 className="text-xl text-gray-800 font-bold mb-1 ">{!energyExpenditure ? "Adicionar gasto energético" : "Editar gasto energético"}</h1>
        </div>
      </header>
      <div className="pl-6 pr-6">

        <section className="pb-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-flex-start mt-5">
            <div className='flex-1 mr-2 mt-2'>
              <div>
                <label className="block text-sm font-medium" htmlFor="description">Descrição<span className="text-red-500">*</span></label>
                <textarea id="description" className={`form-textarea w-full px-2 py-1 ${!nullFields.description && "border-red-300"}`} rows="1" value={description} onChange={onChangeDescription}></textarea>
                {!nullFields.description && <div className="text-xs text-red-500">Esse campo é obrigatório!</div>}
              </div>
            </div>

            <div className='flex-3 mt-2'>
              <div>
                <label className="block text-sm font-medium" htmlFor="energy_expenditure_date">Data<span className="text-red-500">*</span></label>
                <input id="energy_expenditure_date" className={`form-input w-full px-2 py-1 ${!nullFields.energyExpenditureDate && "border-red-300"}`} type="date" required onChange={onChangeEnergyExpenditureDate} value={energyExpenditureDate} />
                {!nullFields.energyExpenditureDate && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div className='flex flex-col sm:flex-row mr-0'>
            <div className="flex-1 mr-2 mt-2">
              <label className="block text-sm font-medium mb-1" htmlFor="tall">Altura<span className="text-red-500">*</span></label>
              <input id="tall" type="number" min="0" max="3" step="0.1" className={`form-input w-full px-2 py-1 ${!nullFields.tall && "border-red-300"}`} value={tall} onChange={onChangeTall}></input>
              {!nullFields.tall && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
            </div>
            <div className="flex-1 mt-2">
              <label className="block text-sm font-medium mb-1" htmlFor="weight">Peso<span className="text-red-500">*</span></label>
              <input id="weight" type="number" min="0" max="300" step="0.1" className={`form-input w-full px-2 py-1 ${!nullFields.weight && "border-red-300"}`} value={weight} onChange={onChangeWeight}></input>
              {!nullFields.weight && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
            </div>
          </div>
        </section>

        <section className="pb-6">
          <div className='flex flex-col sm:flex-row mr-0'>
            <div className="flex-1 mr-2 mt-2">
              <label className="block text-sm font-medium mb-1" htmlFor="formula">Fórmula</label>
              <select id="formula" className="form-select w-full" value={formula} onChange={onChangeFormula}>
                <option value="" selected></option>
                <option value={1}>Harris &amp; Benedict</option>
              </select>
              {!nullFields.formula && <div className="text-xs text-red-500 mt-1">Selecione uma fórmula!</div>}
            </div>
            <div className="flex-1 mt-2">
              <label className="block text-sm font-medium mb-1" htmlFor="physical_activity_level">Nível de atividade</label>
              <select id="physical_activity_level" className="form-select w-full" value={physicalActivityLevel} onChange={onChangePhysicalActivityLevel}>
                <option value="" selected></option>
                <option value="1.200" >Sedentário</option>
                <option value="1.375" >Pouca</option>
                <option value="1.550" >Moderada</option>
                <option value="1.725" >Intensa</option>
                <option value="1.900" >Muito intensa</option>
              </select>
              {!nullFields.physicalActivityLevel && <div className="text-xs text-red-500 mt-1">Selecione um nível de atividade!</div>}
            </div>
          </div>
        </section>

        <section className="pb-6">
          <div className='flex gap-1'>
            <div class="w-40 bg-green-200 p-3 rounded-lg shadow-lg">
              <p class="text-center text-gray-600">TMB</p>
              <h2 class="text-center text font-bold mb-2 text-gray-700">{calculatedFormula.tmb} kcal</h2>
            </div>
            <div class="w-40 bg-green-200 p-3 rounded-lg shadow-lg">
              <p class="text-center text-gray-600">GET</p>
              <h2 class="text-center text font-bold mb-2 text-gray-700">{calculatedFormula.get} kcal</h2>
            </div>
          </div>
        </section>

      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button disabled={isLoading} className="btn disabled:opacity-75 disabled:bg-indigo-600 bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => !energyExpenditure ? handleSave() : handleUpdate()}>
              {isLoading && <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}

              {isLoading ? 'Salvando...' : !energyExpenditure ? 'Salvar' : 'Salvar mudanças'}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EnergyExpenditureContent;