import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

import { Api } from '../../services/api';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PatientSidebar from '../../partials/patient/PatientProfileSidebar';
import ProfileContent from '../../partials/patient/ProfileContent';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useQuery } from 'react-query';
import { getInitialsName } from '../../utils/Utils';

function PatientProfile(props) {
  const auth = useAuth()

  const { id } = useParams()

  const { data: patient } = useQuery(`patient/${id}`, async () => {
    const response = await Api.get(`patient/${id}`)

    return response.data.patient
  })

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="mb-8 bg-white p-10 p-2">
              {/* Title */}
              <div className="flex items-center">
                <div className="mr-4">
                <div className="flex items-center justify-center bg-blue-200 rounded-full w-12 h-12 text-lg font-semibold uppercase text-slate-500">{getInitialsName(patient.name)}</div>
                  {/* <img className="w-10 h-10 rounded-full" src={Image} width="20" height="20" alt="User upload" /> */}
                </div>
                <h1 className="text-1xl md:text-2xl text-gray-800 font-bold">{patient.name}</h1>
              </div>

            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <PatientSidebar id={id}/>
                <ProfileContent id={id} />
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default PatientProfile;