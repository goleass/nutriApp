import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

import { Api } from '../../services/api';

import Image from '../../images/avatar-01.jpg';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PatientSidebar from '../../partials/patient/PatientProfileSidebar';
import HomeContent from '../../partials/patient/HomeContent';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useQuery } from 'react-query';

function PatientHome(props) {
  const auth = useAuth()

  const { id } = useParams()

  const { data: patient } = useQuery(`patient/${id}`, async () => {
    const response = await Api.get(`patient/${id}`)

    return response.data.patient
  })

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">

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
                  <img className="w-10 h-10 rounded-full" src={Image} width="20" height="20" alt="User upload" />
                </div>
                <h1 className="text-1xl md:text-2xl text-gray-800 font-bold">{patient && patient.name}</h1>
              </div>

            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <PatientSidebar id={id} />
                <HomeContent id={id} />
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default PatientHome;