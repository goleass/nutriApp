import React from 'react';
import { NavLink } from 'react-router-dom';

function HomeContent({ id }) {

  return (
    <div className="flex-grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <section>
          <h2 className="text-xl text-gray-800 font-bold mb-5">O que quer fazer?</h2>
        </section>
        {/* Options to do */}
        <section>
          <div className="flex flex-wrap gap-2">
            <div class="w-1/4 rounded overflow-hidden shadow-lg cursor-pointer bg-blue-200 hover:bg-blue-300">
              <NavLink exact to={`/patients/edit/${id}/anamnesis`}>
                <div class="px-6 py-4">
                  <div class="text-center font-bold text-base mb-2">Anamnese</div>
                </div>
              </NavLink>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default HomeContent;