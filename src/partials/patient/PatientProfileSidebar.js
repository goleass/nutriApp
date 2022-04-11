import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import ModalBasic from '../../components/ModalBasic';

function PatientProfileSidebar({ id }) {

  const location = useLocation();
  const { pathname } = location;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 min-w-60 md:space-y-3">
      <div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <div className="flex border-gray-200">
              <button className="btn bg-green-500 hover:bg-green-600 text-white flex-1" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}>
                <span className="" aria-controls="aaaaa" >Adicionar</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to={`/patients/edit/${id}`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.endsWith(`/patients/edit/${id}`) && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.endsWith(`/patients/edit/${id}`) && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.endsWith(`/patients/edit/${id}`) ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Início</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to={`/patients/edit/${id}/profile`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.endsWith(`/patients/edit/${id}/profile`) && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.endsWith(`/patients/edit/${id}/profile`) && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.endsWith(`/patients/edit/${id}/profile`) ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Perfil</span>
            </NavLink>
          </li>
          {/* Send Feedback */}
          <div className="">
            {/* Start */}
            <ModalBasic id="aaaaa" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="O que quer fazer?">
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="flex mb-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="w-1/1 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-blue-50 border-blue-300">
                      <NavLink to={`/patients/edit/${id}/anamnesis`}>
                        <div className="px-6 py-4">
                          <div className="text-center font-bold text-base mb-2">Anamnese</div>
                        </div>
                      </NavLink>
                    </div>

                    <div className="w-1/1 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-green-50 border-green-300">
                      <NavLink to={`/patients/edit/${id}/gasto-energetico`}>
                        <div className="px-6 py-4">
                          <div className="text-center font-bold text-base mb-2">Gasto energético</div>
                        </div>
                      </NavLink>
                    </div>

                    {/* <div className="w-1/1 rounded overflow-hidden shadow-lg cursor-pointer border-t-4 hover:bg-red-50 border-red-300">
                      <NavLink to={`/patients/edit/${id}/anamnesis`}>
                        <div className="px-6 py-4">
                          <div className="text-center font-bold text-base mb-2">Plano alimentar</div>
                        </div>
                      </NavLink>
                    </div> */}
                  </div>
                </div>

              </div>
              {/* Modal footer */}
              <div className="px-5 py-4 border-t border-gray-200">
                <div className="flex flex-wrap justify-end space-x-2">
                  <button className="btn-sm border-gray-200 hover:border-gray-300 text-gray-600" onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(false); }}>Cancelar</button>
                </div>
              </div>
            </ModalBasic>
            {/* End */}
          </div>
        </ul>

      </div>
      {/* <div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-3">Fidelização</div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/profile/account" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/profile/account') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/profile/account') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/profile/account') ? 'text-indigo-500' : 'hover:text-gray-700'}`}>My Account</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/settings/notifications" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/notifications') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/settings/notifications') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/notifications') ? 'text-indigo-500' : 'hover:text-gray-700'}`}></span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/settings/apps" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/apps') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/settings/apps') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M3.414 2L9 7.586V16H7V8.414l-5-5V6H0V1a1 1 0 011-1h5v2H3.414zM15 0a1 1 0 011 1v5h-2V3.414l-3.172 3.172-1.414-1.414L12.586 2H10V0h5z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/apps') ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Connected Apps</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/settings/plans" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/plans') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/settings/plans') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/plans') ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Plans</span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/settings/billing" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/billing') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/settings/billing') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/billing') ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Billing & Invoices</span>
            </NavLink>
          </li>
        </ul>
      </div> */}
      {/* <div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-3">Experience</div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink to="/settings/feedback" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/feedback') && 'bg-indigo-50'}`}>
              <svg className={`w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2 ${pathname.includes('/settings/feedback') && 'text-indigo-400'}`} viewBox="0 0 16 16">
                <path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z" />
              </svg>
              <span className={`text-sm font-medium ${pathname.includes('/settings/feedback') ? 'text-indigo-500' : 'hover:text-gray-700'}`}>Give Feedback</span>
            </NavLink>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default PatientProfileSidebar;