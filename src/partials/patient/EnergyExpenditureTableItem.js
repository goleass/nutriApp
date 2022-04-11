import DropdownEditMenu from '../../components/DropdownEditMenu';
import { useQueryClient, useMutation } from 'react-query'

import { Api } from '../../services/api'
import { NavLink } from 'react-router-dom';

function EnergyExpenditureTableItem({ patient }) {
  const remove = async id => {
    try {
      await Api.delete(`energy-expenditure/delete/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(remove)

  const handleDelete = async id => {
    await mutateAsync(id)
    queryClient.invalidateQueries(`patient/${patient.id}`)
  }

  return (
    <>
      {patient &&
        patient.EnergyExpenditures.map(ee => (

          <tr className="flex-1 border border-gray-300 hover:bg-indigo-50">
            <td className="py-1 px-3 whitespace-nowrap">
              <div className="flex">
                <div className="font-medium text-gray-400"><span className="font-medium text-gray-500">{ee.energy_expenditure_date.split("T")[0].split('-').reverse().join('/')}</span> - {ee.description}</div>
              </div>
            </td>
            <td className="py-1 px-3 whitespace-nowrap w-px">
              <div className="flex">
                <DropdownEditMenu  align='right' className="relative inline-flex">
                  <li>
                    <NavLink to={`/patients/edit/${patient.id}/gasto-energetico/${ee.id}`}>
                      <a className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" href="#0">Editar</a>
                    </NavLink>
                  </li>
                  <li>
                    <a className="font-medium text-sm text-red-600 hover:text-red-700 flex py-1 px-3" href="#0" aria-controls="danger-modal" onClick={(e) => { e.stopPropagation(); handleDelete(ee.id); }}>Remover</a>
                  </li>
                </DropdownEditMenu>
              </div>
            </td>
          </tr>
        ))
      }
    </>
  )
}

export default EnergyExpenditureTableItem