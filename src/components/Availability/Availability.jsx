import React, { useState } from 'react';
import useAuthenticatedFetch from '../../hooks/useAuthenticatedFetch';
import * as centerClient from '../../clients/centersClient';

const Availability = () => {
  const [availabilityItems] = useState([]);
  const [centerName] = useState([]);
  const { status } = useAuthenticatedFetch(['centers'], centerClient.getAll);

  if (status === 'success') {
    return (
      <div>
        <p>Horas disponibles</p>
        <p>{centerName}</p>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            {availabilityItems.map((availability) => (
              <tr key={availability.date + availability.hourFrom}>
                <td>{availability.date}</td>
                <td>{availability.hourFrom}</td>
                <td>{availability.hourTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};
export default Availability;
