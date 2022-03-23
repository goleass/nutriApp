import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';

import bisto1 from '../../images/bistolScale/1.png'
import bisto2 from '../../images/bistolScale/2.png'
import bisto3 from '../../images/bistolScale/3.png'
import bisto4 from '../../images/bistolScale/4.png'
import bisto5 from '../../images/bistolScale/5.png'
import bisto6 from '../../images/bistolScale/6.png'
import bisto7 from '../../images/bistolScale/7.png'
import { Api } from '../../services/api';

const patologiesList = [
  { name: "Ansiedade", checked: false },
  { name: "Câncer", checked: false },
  { name: "Cardíaco", checked: false },
  { name: "Circulatório", checked: false },
  { name: "Colite", checked: false },
  { name: "Depressão", checked: false },
  { name: "Diabetes", checked: false },
  { name: "Dislipidemia", checked: false },
  { name: "cabeça", checked: false },
  { name: "Endócrino", checked: false },
  { name: "Gastrite", checked: false },
  { name: "Irritabilidade", checked: false },
  { name: "Herpes", checked: false },
  { name: "Hepatite", checked: false },
  { name: "Hipertireoidismo", checked: false },
  { name: "Hipotireoidismo", checked: false },
  { name: "Hipoglicemia", checked: false },
  { name: "Hipertensão", checked: false },
  { name: "Osteoporose", checked: false },
  { name: "Renal", checked: false },
  { name: "Rinite/Sinusite", checked: false },
  { name: "RGE", checked: false }
]

const bistoScaleList = [
  { id: "1", name: "Caroços duros e separados, como nozes (difícil de passar)", image: bisto1 },
  { id: "2", name: "Forma de salsicha, mas granuloso", image: bisto2 },
  { id: "3", name: "Como uma salsicha, mas com fissuras em sua superfície", image: bisto3 },
  { id: "4", name: "Como uma salsicha ou serpente, suave e macio", image: bisto4 },
  { id: "5", name: "Bolhas suaves com bordas nítidas (que passa facilmente)", image: bisto5 },
  { id: "6", name: "Peças fofas com bordas em pedaços", image: bisto6 },
  { id: "7", name: "Aquoso, sem partes sólidas, inteiramente líquido", image: bisto7 },
]

function AnamnesisContent({ id, anamnesis }) {

  const navigate = useNavigate()

  const auth = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const [clinicalCase, setClinicalCase] = useState(anamnesis ? anamnesis.clinical_case : "")
  const [date, setData] = useState(anamnesis ? anamnesis.anamnesis_date.split("T")[0].split('-').join("-") : new Date().toLocaleDateString().split("/").reverse().join("-"))
  const [foodRestriction, setFoodRestriction] = useState(anamnesis ? anamnesis.life_habits.food_restriction : "")
  const [alcoholicBeverage, setAlcoholicBeverage] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.alcoholic_beverage_type) || (anamnesis && anamnesis.life_habits && anamnesis.life_habits.alcoholic_beverage_description)
  const [alcoholicBeverageType, setAlcoholicBeverageType] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.alcoholic_beverage_type ? anamnesis.life_habits.alcoholic_beverage_type : "")
  const [alcoholicBeverageDescription, setAlcoholicBeverageDescription] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.alcoholic_beverage_description ? anamnesis.life_habits.alcoholic_beverage_description : "")
  const [smoker, setSmoker] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.smoker_type) || (anamnesis && anamnesis.life_habits && anamnesis.life_habits.how_many_cigarettes)
  const [smokerType, setSmokerType] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.smoker_type ? anamnesis.life_habits.smoker_type : "")
  const [howManyCigarettes, setHowManyCigarettes] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.how_many_cigarettes ? anamnesis.life_habits.how_many_cigarettes : "")
  const [patologies, setPatologies] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.pathologies.length > 0 ? patologiesList.map(pl => ({ ...pl, checked: !!anamnesis.pathologies.pathologies.filter(p => p === pl.name)[0] })) : patologiesList)
  const [otherPathologies, setOtherPathologies] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.other_pathologies ? anamnesis.pathologies.other_pathologies : "")
  const [medicines, setMedicines] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.medicines ? anamnesis.pathologies.medicines : "")
  const [exams, setExams] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.exams ? anamnesis.pathologies.exams : "")
  const [familyHistory, setFamilyHistory] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.family_history ? anamnesis.pathologies.family_history : "")
  const [observationPatologies, setObservationPatologies] = useState(anamnesis && anamnesis.pathologies && anamnesis.pathologies.pathologies_obs ? anamnesis.pathologies.pathologies_obs : "")
  const [eatOut, setEatOut] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.what_do_you_eat_out)
  const [whatDoYouEatOut, setWhatDoYouEatOut] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.what_do_you_eat_out ? anamnesis.life_habits.what_do_you_eat_out : "")
  const [evacuationFrequency, setEvacuationFrequency] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.bowel_habit && anamnesis.clinical_evaluation.bowel_habit.evacuation_frequency ? anamnesis.clinical_evaluation.bowel_habit.evacuation_frequency : "")
  const [urinaryHabitsDescription, setUrinaryHabitsDescription] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.urinary_habit && anamnesis.clinical_evaluation.urinary_habit.urinary_habits_description ? anamnesis.clinical_evaluation.urinary_habit.urinary_habits_description : "")
  const [waterIntake, setWaterIntake] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.urinary_habit && anamnesis.clinical_evaluation.urinary_habit.wate_intake ? anamnesis.clinical_evaluation.urinary_habit.wate_intake : 0)
  const [urinaryHydration, setUrinaryHydration] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.urinary_habit && anamnesis.clinical_evaluation.urinary_habit.urinary_hydration ? anamnesis.clinical_evaluation.urinary_habit.urinary_hydration : "")
  const [urinaryHabitsObs, setUrinaryHabitsObs] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.urinary_habit && anamnesis.clinical_evaluation.urinary_habit.urinary_habits_obs ? anamnesis.clinical_evaluation.urinary_habit.urinary_habits_obs : "")
  const [howManyPeopleLiveWithYou, setHowManyPeopleLiveWithYou] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.how_many_people_live_with_you ? anamnesis.life_habits.how_many_people_live_with_you : 0)
  const [whoDoesTheHomeShopping, setWhoDoesTheHomeShopping] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.who_does_the_home_shopping ? anamnesis.life_habits.who_does_the_home_shopping : "")
  const [whereDoYouDoYourHomeShopping, setWhereDoYouDoYourHomeShopping] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.where_do_you_do_your_home_shopping ? anamnesis.life_habits.where_do_you_do_your_home_shopping : "")
  const [howManyTimesAMonthDoYouShopForYourHome, setHowManyTimesAMonthDoYouShopForYourHome] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.how_many_times_a_month_do_you_shop_for_your_home ? anamnesis.life_habits.how_many_times_a_month_do_you_shop_for_your_home : 0)
  const [amountOfOilPerMonth, setAmountOfOilPerMonth] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.amount_of_oil_per_month ? anamnesis.life_habits.amount_of_oil_per_month : 0)
  const [amountOfSaltPerMonth, setAmountOfSaltPerMonth] = useState(anamnesis && anamnesis.life_habits && anamnesis.life_habits.amount_of_salt_per_month ? anamnesis.life_habits.amount_of_salt_per_month : 0)
  const [appetite, setAppetite] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.appetite ? anamnesis.clinical_evaluation.appetite : "")
  const [chewing, setChewing] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.chewing ? anamnesis.clinical_evaluation.chewing : "")
  const [bowelHabit, setBowelHabit] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.bowel_habit && anamnesis.clinical_evaluation.bowel_habit.bowel_habit ? anamnesis.clinical_evaluation.bowel_habit.bowel_habit : "")
  const [bistolScale, setBistolScale] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.bowel_habit && anamnesis.clinical_evaluation.bowel_habit.bistol_scale ? anamnesis.clinical_evaluation.bowel_habit.bistol_scale : "")
  const [stoolColor, setStoolColor] = useState(anamnesis && anamnesis.clinical_evaluation && anamnesis.clinical_evaluation.bowel_habit && anamnesis.clinical_evaluation.bowel_habit.stool_color ? anamnesis.clinical_evaluation.bowel_habit.stool_color : "")
  const [foodSuplements, setFoodSuplements] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.food_suplements ? anamnesis.food_habits.food_suplements : "")
  const [foodAllergy, setFoodAllergy] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.food_allergy ? anamnesis.food_habits.food_allergy : "")
  const [foodIntolerance, setFoodIntolerance] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.food_intolerance ? anamnesis.food_habits.food_intolerance : "")
  const [foodAversion, setFoodAversion] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.food_aversion ? anamnesis.food_habits.food_aversion : "")
  const [foodHabitsObs, setFoodHabitsObs] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.food_habits_obs ? anamnesis.food_habits.food_habits_obs : "")
  const [howManyMealsDoYouEatDuringTheDay, setHowManyMealsDoYouEatDuringTheDay] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.how_many_meals_do_you_eat_during_the_day ? anamnesis.food_habits.how_many_meals_do_you_eat_during_the_day : "")
  const [doYouFeelSatisfiedWithYourMeals, setDoYouFeelSatisfiedWithYourMeals] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_feel_satisfied_with_your_meals ? anamnesis.food_habits.do_you_feel_satisfied_with_your_meals : "")
  const [doYouSnackDuringTheDay, setDoYouSnackDuringTheDay] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_snack_during_the_day ? anamnesis.food_habits.do_you_snack_during_the_day : "")
  const [doYouApproveOfYourEatingHabits, setDoYouApproveOfYourEatingHabits] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_approve_of_your_eating_habits ? anamnesis.food_habits.do_you_approve_of_your_eating_habits : "")
  const [doYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint, setDoYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_feel_that_your_emotions_influence_your_eating_at_some_point ? anamnesis.food_habits.do_you_feel_that_your_emotions_influence_your_eating_at_some_point : "")
  const [haveYouEverBeenOnARestrictiveDiet, setHaveYouEverBeenOnARestrictiveDiet] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.have_you_ever_been_on_a_restrictive_diet ? anamnesis.food_habits.have_you_ever_been_on_a_restrictive_diet : "")
  const [doYouEatImpulsivelyOrOnlyWhenYouAreHungry, setDoYouEatImpulsivelyOrOnlyWhenYouAreHungry] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_eat_impulsively_or_only_when_you_are_hungry ? anamnesis.food_habits.do_you_eat_impulsively_or_only_when_you_are_hungry : "")
  const [doYouFeelTheNeedToEatSweetsDuringTheDay, setDoYouFeelTheNeedToEatSweetsDuringTheDay] = useState(anamnesis && anamnesis.food_habits && anamnesis.food_habits.do_you_feel_the_need_to_eat_sweets_during_the_day ? anamnesis.food_habits.do_you_feel_the_need_to_eat_sweets_during_the_day : "")

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

  const onChangeSmokerType = e => {
    setSmokerType(e.target.value)
  }

  const onChangeSmoker = () => {
    setSmoker(!smoker)
  }

  const onChangeHowManyCigarettes = e => {
    setHowManyCigarettes(e.target.value)
  }

  const onChangeEatOut = () => {
    setEatOut(!eatOut)
  }

  const onChangeWhatDoYouEatOut = e => {
    setWhatDoYouEatOut(e.target.value)
  }

  const onChangeHowManyPeopleLiveWithYou = e => {
    setHowManyPeopleLiveWithYou(e.target.value)
  }

  const onChangeWhoDoesTheHomeShopping = e => {
    setWhoDoesTheHomeShopping(e.target.value)
  }

  const onChangeWhereDoYouDoYourHomeShopping = e => {
    setWhereDoYouDoYourHomeShopping(e.target.value)
  }

  const onChangeHowManyTimesAMonthDoYouShopForYourHome = e => {
    setHowManyTimesAMonthDoYouShopForYourHome(e.target.value)
  }

  const onChangeAmountOfOilPerMonth = e => {
    setAmountOfOilPerMonth(e.target.value)
  }

  const onChangeAmountOfSaltPerMonth = e => {
    setAmountOfSaltPerMonth(e.target.value)
  }

  const onChangeUrinaryHabitsDescription = e => {
    setUrinaryHabitsDescription(e.target.value)
  }

  const onChangeWaterIntake = e => {
    setWaterIntake(e.target.value)
  }

  const onChangeEvacuationFrequency = e => {
    const qtd = document.querySelector('#evacuation_qtd').value
    const frequency = document.querySelector('#evacuation_frequency').value

    if (qtd && frequency) {
      setEvacuationFrequency(`${qtd},${frequency}`)
    }
  }

  const onChangeUrinaryHydration = e => {
    setUrinaryHydration(e.target.value)
  }

  const onChangeUrinaryHabitsObs = e => {
    setUrinaryHabitsObs(e.target.value)
  }

  const onChangeFoodSuplements = e => {
    setFoodSuplements(e.target.value)
  }

  const onChangeFoodAllergy = e => {
    setFoodAllergy(e.target.value)
  }

  const onChangeFoodIntolerance = e => {
    setFoodIntolerance(e.target.value)
  }

  const onChangeFoodAversion = e => {
    setFoodAversion(e.target.value)
  }

  const onChangeFoodHabitsObs = e => {
    setFoodHabitsObs(e.target.value)
  }

  const onChangePatologies = e => {
    setPatologies(patologies.map(patology => {
      if (patology.name === e.target.value) return { ...patology, checked: !patology.checked }
      else return patology
    }))
  }

  const onChangeAppetite = e => {
    setAppetite(e.target.value)
  }

  const onChangeChewing = e => {
    setChewing(e.target.value)
  }

  const onChangeBowelHabit = e => {
    setBowelHabit(e.target.value)
  }

  const onChangeOtherPathologies = e => {
    setOtherPathologies(e.target.value)
  }

  const onChangeMedicines = e => {
    setMedicines(e.target.value)
  }

  const onChangeExams = e => {
    setExams(e.target.value)
  }

  const onChangeFamilyHistory = e => {
    setFamilyHistory(e.target.value)
  }

  const onChangeObservationPatologies = e => {
    setObservationPatologies(e.target.value)
  }

  const onClickBistolScale = v => {
    setBistolScale(v)
  }

  const onChangeStoolColor = e => {
    setStoolColor(e.target.value)
  }

  const onChangeHowManyMealsDoYouEatDuringTheDay = e => {
    setHowManyMealsDoYouEatDuringTheDay(e.target.value)
  }

  const onChangeDoYouFeelSatisfiedWithYourMeals = e => {
    setDoYouFeelSatisfiedWithYourMeals(e.target.value)
  }

  const onChangeDoYouSnackDuringTheDay = e => {
    setDoYouSnackDuringTheDay(e.target.value)
  }

  const onChangeDoYouApproveOfYourEatingHabits = e => {
    setDoYouApproveOfYourEatingHabits(e.target.value)
  }

  const onChangeDoYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint = e => {
    setDoYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint(e.target.value)
  }

  const onChangeHaveYouEverBeenOnARestrictiveDiet = e => {
    setHaveYouEverBeenOnARestrictiveDiet(e.target.value)
  }

  const onChangeDoYouEatImpulsivelyOrOnlyWhenYouAreHungry = e => {
    setDoYouEatImpulsivelyOrOnlyWhenYouAreHungry(e.target.value)
  }

  const onChangeDoYouFeelTheNeedToEatSweetsDuringTheDay = e => {
    setDoYouFeelTheNeedToEatSweetsDuringTheDay(e.target.value)
  }

  const makeDate = () => {
    const anamnese = {
      clinical_case: clinicalCase,
      anamnesis_date: date,
      user_patient_id: id,
      life_habits: {
        food_restriction: foodRestriction,
        alcoholic_beverage_type: alcoholicBeverage ? alcoholicBeverageType : "",
        alcoholic_beverage_description: alcoholicBeverage ? alcoholicBeverageDescription : "",
        smoker_type: smoker ? smokerType : "",
        how_many_cigarettes: smoker ? howManyCigarettes : "",
        what_do_you_eat_out: eatOut ? whatDoYouEatOut : "",
        how_many_people_live_with_you: parseInt(howManyPeopleLiveWithYou),
        who_does_the_home_shopping: whoDoesTheHomeShopping,
        where_do_you_do_your_home_shopping: whereDoYouDoYourHomeShopping,
        how_many_times_a_month_do_you_shop_for_your_home: parseInt(howManyTimesAMonthDoYouShopForYourHome),
        amount_of_oil_per_month: parseInt(amountOfOilPerMonth),
        amount_of_salt_per_month: parseInt(amountOfSaltPerMonth)
      },
      pathologies: {
        pathologies: patologies.filter(x => x.checked).map(y => y.name),
        other_pathologies: otherPathologies,
        medicines,
        exams,
        family_history: familyHistory,
        pathologies_obs: observationPatologies
      },
      clinical_evaluation: {
        appetite,
        chewing,
        bowel_habit: {
          bowel_habit: bowelHabit,
          evacuation_frequency: evacuationFrequency,
          bistol_scale: bistolScale,
          stool_color: stoolColor
        },
        urinary_habit: {
          urinary_habits_description: urinaryHabitsDescription,
          wate_intake: parseInt(waterIntake),
          urinary_hydration: urinaryHydration,
          urinary_habits_obs: urinaryHabitsObs
        }
      },
      food_habits: {
        how_many_meals_do_you_eat_during_the_day: howManyMealsDoYouEatDuringTheDay,
        do_you_feel_satisfied_with_your_meals: doYouFeelSatisfiedWithYourMeals,
        do_you_snack_during_the_day: doYouSnackDuringTheDay,
        do_you_approve_of_your_eating_habits: doYouApproveOfYourEatingHabits,
        do_you_feel_that_your_emotions_influence_your_eating_at_some_point: doYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint,
        have_you_ever_been_on_a_restrictive_diet: haveYouEverBeenOnARestrictiveDiet,
        do_you_eat_impulsively_or_only_when_you_are_hungry: doYouEatImpulsivelyOrOnlyWhenYouAreHungry,
        do_you_feel_the_need_to_eat_sweets_during_the_day: doYouFeelTheNeedToEatSweetsDuringTheDay,
        food_suplements: foodSuplements,
        food_allergy: foodAllergy,
        food_intolerance: foodIntolerance,
        food_aversion: foodAversion,
        food_habits_obs: foodHabitsObs
      }
    }

    return anamnese
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      setNullFields({ ...nullFields, clinicalCase: Boolean(clinicalCase.trim()), date: Boolean(date) })

      if (!clinicalCase || !date) {
        return
      }

      const anamnese = makeDate()

      await Api.post('/anamnesis/new', anamnese)

      navigate(`/patients/edit/${id}`)
    } catch (error) {
      if (error && error.response && error.response.status === 401) auth.setUserU(null)
      console.log("Falha ao salvar anamnese.")
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      setNullFields({ ...nullFields, clinicalCase: Boolean(clinicalCase.trim()), date: Boolean(date) })

      if (!clinicalCase || !date) {
        return
      }

      const anamnese = makeDate()

      await Api.put(`/anamnesis/update/${anamnesis.id}`, anamnese)

      navigate(`/patients/edit/${id}`)
    } catch (error) {
      if (error && error.response && error.response.status === 401) auth.setUserU(null)
      console.log("Falha ao salvar anamnese.", error)
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
          <h1 className="text-xl text-gray-800 font-bold mb-1 ">{!anamnesis ? "Adicionar anamnese" : "Editar anamnese"}</h1>
        </div>
      </header>
      <div className="pl-6 pr-6 space-y-6">

        {/* Clinical Case Section */}
        <section className="pb-6 border-b border-gray-200">
          <div className="flex items-flex-start space-y-0 mt-5">
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

        {/* Life Habits Section */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Hábitos de vida</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
              <div className="m-3">
                {/* Start */}
                <label className="block text-sm font-medium mb-1" htmlFor="food_restriction">Restrição alimentar</label>
                <select id="food_restriction" className="form-select w-full" value={foodRestriction} onChange={onChangeFoodRestriction}>
                  <option value="" selected={foodRestriction === ""}>Não</option>
                  <option value="Vegetariano" selected={foodRestriction === "Vegetariano"}>Vegetariano</option>
                  <option value="Vegano" selected={foodRestriction === "Vegano"}>Vegano</option>
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
                          <label className="block text-sm font-medium mb-1" htmlFor="alcoholic_beverage_description">Qual e quanto</label>
                          <textarea id="alcoholic_beverage_description" className="form-textarea w-full px-2 py-1" rows="1" value={alcoholicBeverageDescription} onChange={onChangeAlcoholicBeverageDescription}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>}
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={smoker} onChange={onChangeSmoker} />
                  <span className="text-sm ml-2">Fumante</span>
                </label>

                {smoker &&
                  <div className="bg-indigo-50">
                    <div className="flex flex-wrap gap-2 p-3">
                      <div className="">
                        <label className="flex items-center" onChange={onChangeSmokerType}>
                          <input hidden type="radio" className="hidden" value="Todos os dias" checked={smokerType === "Todos os dias"} />
                          <div className={`btn btn-xs ${smokerType === "Todos os dias" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Todos os dias</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeSmokerType}>
                          <input type="radio" className="hidden" value="Finais de semana" checked={smokerType === "Finais de semana"} />
                          <div className={`btn btn-xs ${smokerType === "Finais de semana" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Finais de semana</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeSmokerType}>
                          <input type="radio" className="hidden" value="Socialmente" checked={smokerType === "Socialmente"} />
                          <div className={`btn btn-xs ${smokerType === "Socialmente" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Socialmente</div>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 p-3">
                      <div className='flex-1 mr-0'>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="how_many_cigarettes">Quantidade</label>
                          <textarea id="how_many_cigarettes" className="form-textarea w-full px-2 py-1" value={howManyCigarettes} onChange={onChangeHowManyCigarettes}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>}
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={eatOut} onChange={onChangeEatOut} />
                  <span className="text-sm ml-2">Refeições fora de casa</span>
                </label>

                {eatOut &&
                  <div className="bg-indigo-50">
                    <div className="flex flex-wrap gap-2 p-3">
                      <div className='flex-1 mr-0'>
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="what_do_you_eat_out">Quais</label>
                          <textarea id="what_do_you_eat_out" className="form-textarea w-full px-2 py-1" rows="1" value={whatDoYouEatOut} onChange={onChangeWhatDoYouEatOut}></textarea>
                        </div>
                      </div>
                    </div>
                  </div>}
                {/* End */}
              </div>

              <div className="m-3">
                {/* Start */}
                <label className="block text-sm font-medium mb-1">Hábitos de compra</label>

                <div className='flex-1 mr-0'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="how_many_people_live_with_you">Mora com quantas pessoas?</label>
                    <input id="how_many_people_live_with_you" type="number" min="0" className="form-input w-full px-2 py-1" value={howManyPeopleLiveWithYou} onChange={onChangeHowManyPeopleLiveWithYou}></input>
                  </div>
                </div>

                <div className='flex-1 mr-0 mt-4'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="who_does_the_home_shopping">Quem realiza as compras da casa?</label>
                    <textarea id="who_does_the_home_shopping" className="form-textarea w-full px-2 py-1" rows="1" value={whoDoesTheHomeShopping} onChange={onChangeWhoDoesTheHomeShopping}></textarea>
                  </div>
                </div>

                <div className='flex-1 mr-0 mt-4'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="where_do_you_do_your_home_shopping">Onde realiza as compras?</label>
                    <textarea id="where_do_you_do_your_home_shopping" className="form-textarea w-full px-2 py-1" rows="1" value={whereDoYouDoYourHomeShopping} onChange={onChangeWhereDoYouDoYourHomeShopping}></textarea>
                  </div>
                </div>

                <div className='flex-1 mr-0 mt-4'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="how_many_times_a_month_do_you_shop_for_your_home">Quantas vezes por mês?</label>
                    <input id="how_many_times_a_month_do_you_shop_for_your_home" type="number" min="0" className="form-input w-full px-2 py-1" value={howManyTimesAMonthDoYouShopForYourHome} onChange={onChangeHowManyTimesAMonthDoYouShopForYourHome}></input>
                  </div>
                </div>

                <div className='flex-1 mr-0 mt-4'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="amount_of_oil_per_month">Litros de óleo utilizados por mês</label>
                    <input id="amount_of_oil_per_month" type="number" min="0" className="form-input w-full px-2 py-1" value={amountOfOilPerMonth} onChange={onChangeAmountOfOilPerMonth}></input>
                  </div>
                </div>

                <div className='flex-1 mr-0 mt-4'>
                  <div className="ml-2">
                    <label className="block text-sm font-medium mb-1" htmlFor="amount_of_salt_per_month">Kg de sal utilizado por mês</label>
                    <input id="amount_of_salt_per_month" type="number" min="0" className="form-input w-full px-2 py-1" value={amountOfSaltPerMonth} onChange={onChangeAmountOfSaltPerMonth}></input>
                  </div>
                </div>
                {/* End */}
              </div>
            </div>

          </div>
        </section>

        {/* Patologies Section */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Patologias</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
              {/* Patologies */}
              <div className="flex flex-wrap gap-2 p-3">
                {
                  patologiesList.map(patology => {
                    return (
                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value={patology.name} onChange={onChangePatologies} />
                          <div className={`btn btn-xs ${(patologies.filter(p => p.name === patology.name)[0] && patologies.filter(p => p.name === patology.name)[0].checked) ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>{patology.name}</div>
                        </label>
                      </div>
                    )
                  })
                }
              </div>

              {/* Other Patologies */}
              <div className="m-3">
                <label className="block text-sm font-medium mb-1" htmlFor="otherPathologies">Outras patologias</label>
                <textarea id="otherPathologies" className={`form-textarea w-full px-2 py-1`} rows="1" value={otherPathologies} onChange={onChangeOtherPathologies}></textarea>
              </div>

              {/* Medicines */}
              <div className="m-3">
                <label className="block text-sm font-medium mb-1" htmlFor="medicines">Medicamentos</label>
                <textarea id="medicines" className={`form-textarea w-full px-2 py-1`} rows="1" value={medicines} onChange={onChangeMedicines}></textarea>
              </div>

              {/* Exams */}
              <div className="m-3">
                <label className="block text-sm font-medium mb-1" htmlFor="exams">Exames</label>
                <textarea id="exams" className={`form-textarea w-full px-2 py-1`} rows="1" value={exams} onChange={onChangeExams}></textarea>
              </div>

              {/* Family History */}
              <div className="m-3">
                <label className="block text-sm font-medium mb-1" htmlFor="familyHistory">Histórico familiar</label>
                <textarea id="familyHistory" className={`form-textarea w-full px-2 py-1`} rows="1" value={familyHistory} onChange={onChangeFamilyHistory}></textarea>
              </div>

              {/* Observations Patologies */}
              <div className="m-3">
                <label className="block text-sm font-medium mb-1" htmlFor="observationPatologies">Observações</label>
                <textarea id="observationPatologies" className={`form-textarea w-full px-2 py-1`} rows="1" value={observationPatologies} onChange={onChangeObservationPatologies}></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Evaluation Section */}
        <section className="pb-6 border-b border-gray-200">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Avaliação clínica</h2>
          <div className="flex flex-col space-y-4 mt-5 gap-y-4">
            <div className="flex flex-row flex-wrap justify-between -m-3 gap-y-4">
              <div>
                <h3 className="block text-sm font-medium ml-3 -mb-1" htmlFor="country">Apetite</h3>
                <div className="flex flex-wrap gap-2 p-3">
                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Normal" onChange={onChangeAppetite} />
                      <div className={`btn btn-xs ${appetite === "Normal" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Normal</div>
                    </label>
                  </div>

                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Aumentado" onChange={onChangeAppetite} />
                      <div className={`btn btn-xs ${appetite === "Aumentado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Aumentado</div>
                    </label>
                  </div>

                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Diminuído" onChange={onChangeAppetite} />
                      <div className={`btn btn-xs ${appetite === "Diminuído" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Diminuído</div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="block text-sm font-medium ml-3 -mb-1" htmlFor="country">Mastigação</h3>
                <div className="flex flex-wrap gap-2 p-3">
                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Normal" onChange={onChangeChewing} />
                      <div className={`btn btn-xs ${chewing === "Normal" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Normal</div>
                    </label>
                  </div>

                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Rápida" onChange={onChangeChewing} />
                      <div className={`btn btn-xs ${chewing === "Rápida" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Rápida</div>
                    </label>
                  </div>

                  <div className="">
                    <label className="flex items-center">
                      <input type="checkbox" className="hidden" value="Lenta" onChange={onChangeChewing} />
                      <div className={`btn btn-xs ${chewing === "Lenta" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Lenta</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-between -m-3">
              <div className="flex-1">
                <h3 className="block text-sm font-medium ml-3 -mb-1" htmlFor="country">Hábito intestinal</h3>
                <div className="bg-indigo-50 m-3">
                  <div>
                    <div className="flex flex-wrap gap-2 p-3">
                      <div className="">
                        <label className="flex items-center" onChange={onChangeBowelHabit}>
                          <input hidden type="radio" className="hidden" value="Normal" checked={bowelHabit === "Normal"} />
                          <div className={`btn btn-xs ${bowelHabit === "Normal" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Normal</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeBowelHabit}>
                          <input type="radio" className="hidden" value="Constipante" checked={bowelHabit === "Constipante"} />
                          <div className={`btn btn-xs ${bowelHabit === "Constipante" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Constipante</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeBowelHabit}>
                          <input type="radio" className="hidden" value="Diarréico" checked={bowelHabit === "Diarréico"} />
                          <div className={`btn btn-xs ${bowelHabit === "Diarréico" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Diarréico</div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center" onChange={onChangeBowelHabit}>
                          <input type="radio" className="hidden" value="Variado" checked={bowelHabit === "Variado"} />
                          <div className={`btn btn-xs ${bowelHabit === "Variado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>Variado</div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 p-3">
                      <div className='flex-1 gap-y-2'>
                        <div onChange={onChangeEvacuationFrequency}>
                          <label className="block text-sm font-medium mb-1" htmlFor="evacuation_qtd">Frequência de evacuação</label>
                          <div className="mt-1 relative rounded-sm shadow-sm w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3">
                            <input type="number" name="evacuation_qtd" id="evacuation_qtd" className="form-input block w-full px-2 py-1 rounded-sm" value={evacuationFrequency.split(",")[0]} />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <select id="evacuation_frequency" name="evacuation_frequency" className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 text-sm rounded-sm">
                                <option value="d" selected={evacuationFrequency.split(",")[1] === "d"}>Por dia</option>
                                <option value="w" selected={evacuationFrequency.split(",")[1] === "w"}>Por semana</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1 mt-4">Formato das fezes</label>

                          <div className="flex flex-col">
                            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow border-b border-gray-200 sm:rounded-sm">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">

                                      {bistoScaleList.map(b => (
                                        <tr className={`${bistolScale === b.id ? "text-white bg-blue-600" : "text-gray-900 hover:text-white hover:bg-blue-600"}`} onClick={() => onClickBistolScale(b.id)}>
                                          <td className="px-2 py-2">
                                            <div className="flex items-center">
                                              <div className="flex-shrink-0">
                                                <img className="h-6 w-20" src={b.image} alt="" />
                                              </div>
                                              <div className="ml-4">
                                                <p className="flex break-words text-sm font-medium">{b.name}</p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}

                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div>
                          <h3 className="block text-sm font-medium -mb-2 mt-4" htmlFor="country">Cor das Fezes</h3>
                          <div className="flex flex-wrap gap-2 pt-3">

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Marrom" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Marrom" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#653203' }}></span> <span>Marrom</span>
                                </div>
                              </label>
                            </div>

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Amarelo" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Amarelo" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#F2C917' }}></span> <span>Amarelo</span>
                                </div>
                              </label>
                            </div>

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Verde" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Verde" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#809D59' }}></span> <span>Verde</span>
                                </div>
                              </label>
                            </div>

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Avermelhado" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Avermelhado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#C6452F' }}></span> <span>Avermelhado</span>
                                </div>
                              </label>
                            </div>

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Escura" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Escura" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#410C00' }}></span> <span>Escura</span>
                                </div>
                              </label>
                            </div>

                            <div className="">
                              <label className="flex items-center">
                                <input type="checkbox" className="hidden" value="Clara" onChange={onChangeStoolColor} />
                                <div className={`flex btn btn-xs ${stoolColor === "Clara" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                                  <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#EBE6E0' }}></span> <span>Clara</span>
                                </div>
                              </label>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row flex-wrap justify-between -m-3">
              <div className="flex-1">
                <h3 className="block text-sm font-medium ml-3 -mb-1">Hábito urinário</h3>

                <div className="bg-indigo-50 m-3 p-3">
                  {/* row */}
                  <div className="flex flex-col sm:flex-row md:flex-row">
                    <div className="flex-1 mr-0 sm:mr-2">
                      <div className="">
                        <label className="block text-sm font-medium mb-1" htmlFor="urinary_habits_description">Descreva</label>
                        <textarea id="urinary_habits_description" className={`form-textarea w-full px-2 py-1`} rows="1" value={urinaryHabitsDescription} onChange={onChangeUrinaryHabitsDescription}></textarea>
                      </div>
                    </div>

                    <div className="flex-2">
                      <div className="">
                        <label className="block text-sm font-medium mb-1" htmlFor="water_intake">Ingestão hídrica</label>
                        <input id="water_intake" type="number" min="0" className={`form-input w-full px-2 py-1`} rows="1" value={waterIntake} onChange={onChangeWaterIntake}></input>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="block text-sm font-medium -mb-2 mt-3">Hidratação urinária</h3>
                    <div className="flex flex-wrap gap-2 pt-3">
                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="1 Bem hidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "1 Bem hidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#eee3a2' }}></span> <span>1 Bem hidratado</span>
                          </div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="2 Bem hidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "2 Bem hidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#e1d873' }}></span> <span>2 Bem hidratado</span>
                          </div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="3 Mal hidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "3 Mal hidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#f4c402' }}></span> <span>3 Mal hidratado</span>
                          </div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="4 Mal hidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "4 Mal hidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#f6b326' }}></span> <span>4 Mal hidratado</span>
                          </div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="5 Desidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "5 Desidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#df9b20' }}></span> <span>5 Desidratado</span>
                          </div>
                        </label>
                      </div>

                      <div className="">
                        <label className="flex items-center">
                          <input type="checkbox" className="hidden" value="6 Desidratado" onChange={onChangeUrinaryHydration} />
                          <div className={`flex btn btn-xs ${urinaryHydration === "6 Desidratado" ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600"}`}>
                            <span className="w-4 h-4 border-solid border-1 border-white mr-2 rounded-sm" style={{ backgroundColor: '#85722e' }}></span> <span>6 Desidratado</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mr-2 mt-4">
                    <div className="">
                      <label className="block text-sm font-medium mb-1" htmlFor="urinary_habits_obs">Observações</label>
                      <textarea id="urinary_habits_obs" className={`form-textarea w-full px-2 py-1`} rows="1" value={urinaryHabitsObs} onChange={onChangeUrinaryHabitsObs}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Food Habits Section */}
        <section className="pb-6">
          <h2 className="text-xl leading-snug text-gray-800 font-bold mb-1">Hábitos alimentares</h2>
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="flex flex-col flex-wrap -m-3">
              <div className="bg-indigo-50 m-3 p-3">
                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="how_many_meals_do_you_eat_during_the_day">Quantas refeições você faz durante o dia?</label>
                    <textarea id="how_many_meals_do_you_eat_during_the_day" className={`form-textarea w-full px-2 py-1`} rows="2" value={howManyMealsDoYouEatDuringTheDay} onChange={onChangeHowManyMealsDoYouEatDuringTheDay}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_feel_satisfied_with_your_meals">Você se sente satisfeito com as suas refeições?</label>
                    <textarea id="do_you_feel_satisfied_with_your_meals" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouFeelSatisfiedWithYourMeals} onChange={onChangeDoYouFeelSatisfiedWithYourMeals}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_snack_during_the_day">Você belisca muito durante o dia?</label>
                    <textarea id="do_you_snack_during_the_day" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouSnackDuringTheDay} onChange={onChangeDoYouSnackDuringTheDay}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_approve_of_your_eating_habits">Você aprova seus hábitos alimentares?</label>
                    <textarea id="do_you_approve_of_your_eating_habits" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouApproveOfYourEatingHabits} onChange={onChangeDoYouApproveOfYourEatingHabits}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_feel_that_your_emotions_influence_your_eating_at_some_point">Sente que suas emoções influenciam na sua alimentação em algum momento?</label>
                    <textarea id="do_you_feel_that_your_emotions_influence_your_eating_at_some_point" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint} onChange={onChangeDoYouFeelThatYourEmotionsInfluenceYourEatingAtSomePoint}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="have_you_ever_been_on_a_restrictive_diet">Já fez alguma dieta restritiva?</label>
                    <textarea id="have_you_ever_been_on_a_restrictive_diet" className={`form-textarea w-full px-2 py-1`} rows="2" value={haveYouEverBeenOnARestrictiveDiet} onChange={onChangeHaveYouEverBeenOnARestrictiveDiet}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_eat_impulsively_or_only_when_you_are_hungry">Você come por impulsividade ou somente quando está com fome?</label>
                    <textarea id="do_you_eat_impulsively_or_only_when_you_are_hungry" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouEatImpulsivelyOrOnlyWhenYouAreHungry} onChange={onChangeDoYouEatImpulsivelyOrOnlyWhenYouAreHungry}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="do_you_feel_the_need_to_eat_sweets_during_the_day">Sente muita necessidade de comer doce durante o dia? Masca chiclete ou chupa bala diariamente?</label>
                    <textarea id="do_you_feel_the_need_to_eat_sweets_during_the_day" className={`form-textarea w-full px-2 py-1`} rows="2" value={doYouFeelTheNeedToEatSweetsDuringTheDay} onChange={onChangeDoYouFeelTheNeedToEatSweetsDuringTheDay}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="food_suplements">Suplementos alimentares</label>
                    <textarea id="food_suplements" className={`form-textarea w-full px-2 py-1`} rows="2" value={foodSuplements} onChange={onChangeFoodSuplements}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="food_allergy">Alergia alimentar</label>
                    <textarea id="food_allergy" className={`form-textarea w-full px-2 py-1`} rows="2" value={foodAllergy} onChange={onChangeFoodAllergy}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="food_intolerance">Intolerâncias alimentares</label>
                    <textarea id="food_intolerance" className={`form-textarea w-full px-2 py-1`} rows="2" value={foodIntolerance} onChange={onChangeFoodIntolerance}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="food_aversion">Aversão alimentares</label>
                    <textarea id="food_aversion" className={`form-textarea w-full px-2 py-1`} rows="2" value={foodAversion} onChange={onChangeFoodAversion}></textarea>
                  </div>
                </div>

                <div className="flex-1 mr-2">
                  <div className="">
                    <label className="block text-sm font-medium mb-2" htmlFor="food_habits_obs">Observação</label>
                    <textarea id="food_habits_obs" className={`form-textarea w-full px-2 py-1`} rows="2" value={foodHabitsObs} onChange={onChangeFoodHabitsObs}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button disabled={isLoading} className="btn disabled:opacity-75 disabled:bg-indigo-600 bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => !anamnesis ? handleSave() : handleUpdate()}>
              {isLoading && <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}

              {isLoading ? 'Salvando...' : !anamnesis ? 'Salvar' : 'Salvar mudanças'}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AnamnesisContent;