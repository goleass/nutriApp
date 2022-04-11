import React from 'react';
import { NavLink } from 'react-router-dom';

import { getInitialsName } from '../../utils/Utils';

function PatientsTableItem(props) {
  return (
    <NavLink className={"flex"} to={`/patients/edit/${props.id}`}>
      <tr className="flex-1 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
              <div className="flex items-center justify-center bg-blue-200 rounded-full w-10 h-10 text-lg font-semibold uppercase text-slate-500">{getInitialsName(props.name)}</div>
              {/* <img className="rounded-full" src={props.image || Image02} width="40" height="40" alt={props.name} /> */}
            </div>
            <div className="font-medium text-gray-800">{props.name}</div>
          </div>
        </td>
      </tr>
    </NavLink>
  );
}

export default PatientsTableItem;
