import React from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Api } from '../../services/api';

import AnamnesisTable from '../patient/AnamnesisTable'
import EnergyExpenditureTable from '../patient/EnergyExpenditureTable'

function HomeContent({ id }) {

  const { data: patient } = useQuery(`patient/${id}`, async () => {
    const response = await Api.get(`patient/${id}`)

    return response.data.patient
  })

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <section>
          {(patient && patient.Anamneses && (patient.Anamneses.length === 0) && patient && patient.EnergyExpenditures && (patient.EnergyExpenditures.length === 0)) && <h2 className="text-xl text-gray-800 font-bold mb-5">O que quer fazer?</h2>}
          {((patient && patient.Anamneses && (patient.Anamneses.length > 0)) || (patient && patient.EnergyExpenditures && (patient.EnergyExpenditures.length > 0))) && <h2 className="text-xl text-gray-800 font-bold mb-5">Início</h2>}
        </section>
        {/* Options to do */}
        <section>
          <div className="">

            {/* Table */}
            {patient && patient.Anamneses && patient.Anamneses.length === 0 && patient.EnergyExpenditures.length === 0 &&
              <div className="flex gap-2">
                <div className="w-40 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-blue-50 border-blue-300">
                  <NavLink to={`/patients/edit/${id}/anamnesis`}>
                    <div className="px-6 py-4">
                      <div className="text-center font-bold text-base">Anamnese</div>
                    </div>
                  </NavLink>
                </div>

                <div className="w-40 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-green-50 border-green-300">
                  <NavLink to={`/patients/edit/${id}/gasto-energetico`}>
                    <div className="px-6 py-4">
                      <div className="text-center font-bold text-base">Gastos energéticos</div>
                    </div>
                  </NavLink>
                </div>
              </div>
            }

            {patient && ((patient.Anamneses && patient.Anamneses.length > 0) || (patient.EnergyExpenditures && patient.EnergyExpenditures.length > 0))
              &&
              <section className="flex-1">
                {patient.Anamneses.length > 0 &&
                  <div className="mb-6">
                    <h3 className="text leading-snug text-gray-500 font-bold">Anamneses</h3>
                    <div className="bg-indigo-50 p-2">
                      <AnamnesisTable patient={patient} />
                    </div>
                  </div>}

                {patient.EnergyExpenditures.length > 0 &&
                  <div>
                    <h3 className="text leading-snug text-gray-500 font-bold">Gastos energéticos</h3>
                    <div className="bg-indigo-50 p-2">
                      <EnergyExpenditureTable patient={patient} />
                    </div>
                  </div>}
              </section>
            }

          </div>
        </section>

      </div>
    </div>
  );
}

export default HomeContent;