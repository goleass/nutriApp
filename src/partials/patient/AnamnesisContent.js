import React, { useState } from 'react';

function HomeContent({ id }) {
  const [clinicalCase, setClinicalCase] = useState("")
  const [date, setData] = useState(new Date().toISOString().slice(0, 10))
  const [foodRestriction, setFoodRestriction] = useState("")
  const [alcoholicBeverage, setAlcoholicBeverage] = useState(false)
  const [alcoholicBeverageType, setAlcoholicBeverageType] = useState("")
  const [alcoholicBeverageDescription, setAlcoholicBeverageDescription] = useState("")
  const [smoker, setSmoker] = useState(false)
  const [eatOut, setEatOut] = useState(false)

  const [nullFields, setNullFields] = useState({ clinicalCase: true, date: true })

  const onChangeFoodRestriction = e => {
    setFoodRestriction(e.target.value)
  }

  const onChangeDate = e => {
    setData(e.target.value)
  }

  const onChangeClinicalCase = e => {
    setClinicalCase(e.target.value)
  }

  const onChangeAlcoholicBeverage = () => {
    setAlcoholicBeverage(!alcoholicBeverage)
  }

  const onChangeAlcoholicBeverageDescription = e => {
    setAlcoholicBeverageDescription(e.target.value)
  }

  const onChangeAlcoholicBeverageType = e => {
    setAlcoholicBeverageType(e.target.value)
  }

  const onChangeSmoker = () => {
    setSmoker(!smoker)
  }

  const onChangeEatOut = () => {
    setEatOut(!eatOut)
  }

  const handleSave = async () => {
    try {
      setNullFields({ ...nullFields, clinicalCase: Boolean(clinicalCase.trim()), date: Boolean(date) })

      if (!clinicalCase || !date) {
        return
      }

      // const patientData = { name, birth_data: birthData, gender, email, user_professional_id: auth.id }

      // const { data } = await Api.post('/patient/new', patientData)


      // navigate(`/patients/edit/${data.patient.id}`)
    } catch (error) {
      console.log("Falha ao salvar anamnese.")
    }
  }

  return (
    <div className="flex-grow">
      <header>
        <div className="flex flex-col px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl text-gray-800 font-bold mb-1 ">Adicionar anamnese</h1>
        </div>
      </header>
      <div className="pl-6 pr-6 space-y-6">
        <section className="pb-6 border-b border-gray-200">
          <section>
            <div className="flex items-flex-start space-y-4 space-y-0 space-x-4 mt-5">
              <div className='flex-1 mr-2'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clinicalCase">Caso clínico<span className="text-red-500">*</span></label>
                  <textarea id="clinicalCase" className={`form-textarea w-full px-2 py-1 ${!nullFields.clinicalCase && "border-red-300"}`} rows="1" value={clinicalCase} onChange={onChangeClinicalCase}></textarea>
                </div>
                {!nullFields.clinicalCase && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
              </div>
              <div className='flex-3'>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="date">Data<span className="text-red-500">*</span></label>
                  <input id="date" className={`form-input w-full px-2 py-1 ${!nullFields.date && "border-red-300"}`} type="date" required onChange={onChangeDate} value={date} />
                </div>
                {!nullFields.date && <div className="text-xs mt-1 text-red-500">Esse campo é obrigatório!</div>}
              </div>
            </div>
          </section>
        </section>

        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Hábitos de vida</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
              <div className="m-3">
                {/* Start */}
                <label className="block text-sm font-medium mb-1" htmlFor="country">Restrição alimentar</label>
                <select id="country" className="form-select w-full" value={foodRestriction} onChange={onChangeFoodRestriction}>
                  <option value="" selected>Não</option>
                  <option value="Vegetariano">Vegetariano</option>
                  <option value="Vegano">Vegano</option>
                </select>
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={alcoholicBeverage} onChange={onChangeAlcoholicBeverage} />
                  <span className="text-sm ml-2">Ingere bebida alcoólica</span>
                </label>

                {alcoholicBeverage &&
                  <div className="bg-indigo-50">
                    <div className="flex flex-wrap gap-2 p-3">
                      <div className="">
                        <label className="flex items-center" onChange={onChangeAlcoholicBeverageType}>
                          <input hidden type="radio" className="hidden" value="Todos os dias" checked={alcoholicBeverageType === "Todos os dias"} />
                          <div className={`btn btn-xs ${alcoholicBeverageType === "Todos os dias" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Todos os dias</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeAlcoholicBeverageType}>
                          <input type="radio" className="hidden" value="Finais de semana" checked={alcoholicBeverageType === "Finais de semana"} />
                          <div className={`btn btn-xs ${alcoholicBeverageType === "Finais de semana" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Finais de semana</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeAlcoholicBeverageType}>
                          <input type="radio" className="hidden" value="Socialmente" checked={alcoholicBeverageType === "Socialmente"} />
                          <div className={`btn btn-xs ${alcoholicBeverageType === "Socialmente" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Socialmente</div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 p-3">
                      <div className='flex-1 mr-0'>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="description">Qual e quanto</label>
                          <textarea id="description" className="form-textarea w-full px-2 py-1" rows="1" value={alcoholicBeverageDescription} onChange={onChangeAlcoholicBeverageDescription}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>}
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" value={smoker} onChange={onChangeSmoker} />
                  <span className="text-sm ml-2">Fumante</span>
                </label>
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" value={eatOut} onChange={onChangeEatOut} />
                  <span className="text-sm ml-2">Refeições fora de casa</span>
                </label>
                {/* End */}
              </div>

            </div>
          </div>
        </section>

        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Patologias</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
            
            {/* Conteudo */}

            </div>
          </div>
        </section>

        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Avaliação clínica</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
            
            {/* Conteudo */}

            </div>
          </div>
        </section>

        <section className="pb-6">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Hábitos alimentares</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
            
            {/* Conteudo */}

            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">Cancelar</button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => handleSave()}>Salvar</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeContent;