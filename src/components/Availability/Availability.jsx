import React, { useEffect, useState } from 'react';
import { httpClient } from '../../clients/httpClient';

const Availability = () => {
  const [availabilityItems, setAvailabilityItems] = useState([]);
  const [centerName, setCenterName] = useState([]);
  useEffect(() => {
    httpClient(
      `${process.env.REACT_APP_API_MANAGEMENT_URL}/healthcarefacilities`,
      'GET',
      (json) => {
        setCenterName(json.centros[0].nombre);
        setAvailabilityItems(json.centros[0].disponibilidad);
      },
      () => {
        setAvailabilityItems([]);
      },
    );
  }, []);

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
};
export default Availability;
