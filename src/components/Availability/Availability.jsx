import React, { useEffect, useState } from "react";

const Availability = (props) => {
  const [availabilityItems, setAvailabilityItems] = useState([]);
  const [centerName, setCenterName] = useState([]);

  useEffect(() => {
    fetch("http://13.89.110.83/healthcarefacilities/")
      .then((response) => response.json())
      .then((json) => {
        setCenterName(json.centros[0].nombre);
        setAvailabilityItems(json.centros[0].disponibilidad);
      })
      .catch((error) => {
        console.log(error);
        setAvailabilityItems([]);
      });
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
