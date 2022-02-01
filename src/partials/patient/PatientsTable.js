import React from 'react';
import PatientTableItem from './PatientsTableItem';

function PatientsTable({ patients }) {

  return (
    <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800">Meus Pacientes</h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-200">
              {(!patients || patients.length === 0) && <tr class="border-b border-gray-200 bg-gray-100">
                <td className="text-gray-500 text-lg text-center px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  Nenhum paciente ainda
                </td>
              </tr>}
              {
                patients.map(patient => {
                  return (
                    <PatientTableItem
                      key={patient.id}
                      id={patient.id}
                      image={patient.image}
                      name={patient.name}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default PatientsTable;
