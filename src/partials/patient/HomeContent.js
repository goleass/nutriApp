import React from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Api } from '../../services/api';

import AnamnesisTable from '../patient/AnamnesisTable'

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
          {patient && patient.Anamneses && (patient.Anamneses.length === 0) && <h2 className="text-xl text-gray-800 font-bold mb-5">O que quer fazer?</h2>}
          {patient && patient.Anamneses && (patient.Anamneses.length > 0) && <h2 className="text-xl text-gray-800 font-bold mb-5">Início</h2>}
        </section>
        {/* Options to do */}
        <section>
          <div className="flex flex-wrap gap-2">

            {/* Table */}
            {patient && patient.Anamneses && (patient.Anamneses.length === 0) &&
              <div className="w-1/1 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-blue-50 border-blue-300">
                <NavLink to={`/patients/edit/${id}/anamnesis`}>
                  <div className="px-6 py-4">
                    <div className="text-center font-bold text-base mb-2">Anamnese</div>
                  </div>
                </NavLink>
              </div>
            }

            {patient && patient.Anamneses && (patient.Anamneses.length > 0) && <section className="flex-1">
              <h3 className="text leading-snug text-gray-500 font-bold mb-1 pb-2">Anamneses</h3>
              <div className="bg-indigo-50 p-2">
                <AnamnesisTable patient={patient} />
              </div>
            </section>}

          </div>
        </section>

      </div>
    </div>
  );
}

export default HomeContent;