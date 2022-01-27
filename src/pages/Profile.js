import React, { useState } from 'react';

import Image from '../images/avatar-01.jpg';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ProfileSidebar from '../partials/profile/ProfileSidebar';
import ProfileContent from '../partials/profile/ProfileContent';
import { useAuth } from '../context/AuthProvider/useAuth';

function Settings() {

  const auth = useAuth()

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
                  <img className="w-10 h-10 rounded-full" src={Image} width="20" height="20" alt="User upload" />
                </div>
                <h1 className="text-1xl md:text-2xl text-gray-800 font-bold">{auth.name}</h1>
              </div>

            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <ProfileSidebar />
                <ProfileContent />
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Settings;