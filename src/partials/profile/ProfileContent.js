import React, { useState } from 'react';

import { useAuth } from '../../context/AuthProvider/useAuth'

import Image from '../../images/avatar-01.jpg';
import { getInitialsName } from '../../utils/Utils';

function SettingsContent() {

  const auth = useAuth()

  const [name, setName] = useState(auth.name)
  const [email, setEmail] = useState(auth.email)

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Picture */}
        <section className="flex flex-col items-center">
          {/* <h2 className="text-xl text-gray-800 font-bold mb-5">Foto de Perfil</h2> */}
          <div className="flex flex-col items-center gap-2">
            <div className="">
            <div className="flex items-center justify-center bg-blue-200 rounded-full w-28 h-28 text-lg font-semibold uppercase text-slate-500">{getInitialsName(name)}</div>
              {/* <img className="w-120 h-120 rounded-full" src={Image} width="120" height="120" alt="User upload" /> */}
            </div>
            <div className="">
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Atualizar foto de perfil</button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Meus dados</h2>
          {/* <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div> */}
          <div className="">
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">Nome completo</label>
              <input id="name" className="form-input w-full" type="text" value={name}/>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1" htmlFor="name" >Email</label>
              <input id="email" className="form-input w-full bg-indigo-100" type="email" value={email} disabled/>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">CRN</label>
              <input id="CRN" className="form-input w-full" type="text" />
            </div>
            {/* <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="business-id">Business ID</label>
              <input id="business-id" className="form-input w-full" type="text" />
            </div>
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
              <input id="location" className="form-input w-full" type="text" />
            </div> */}
          </div>
        </section>
        {/* Email */}
        {/* <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Email</h2>
          <div className="text-sm">Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</div>
          <div className="flex flex-wrap mt-5">
            <div className="mr-2">
              <label className="sr-only" htmlFor="email">Business email</label>
              <input id="email" className="form-input" type="email" />
            </div>
            <button className="btn border-gray-200 hover:border-gray-300 shadow-sm text-indigo-500">Change</button>
          </div>
        </section> */}
        {/* Password */}
        {/* <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Password</h2>
          <div className="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
          <div className="mt-5">
            <button className="btn border-gray-200 shadow-sm text-indigo-500">Set New Password</button>
          </div>
        </section> */}
        {/* Smart Sync */}
        {/* <section>
          <h2 className="text-xl text-gray-800 font-bold mb-1">Smart Sync update for Mac</h2>
          <div className="text-sm">With this update, online-only files will no longer appear to take up hard drive space.</div>
          <div className="flex items-center mt-5">
            <div className="form-switch focus-within:shadow-outline">
              <input type="checkbox" id="toggle" className="sr-only" onChange={() => setSync(!sync)} />
              <label className="bg-gray-400" htmlFor="toggle">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Enable smart sync</span>
              </label>
            </div>
            <div className="text-sm text-gray-400 italic ml-2">{sync ? 'On' : 'Off'}</div>
          </div>
        </section> */}
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200">
          <div className="flex self-end">
            <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">Cancelar</button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Salvar alterações</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SettingsContent;