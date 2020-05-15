import React, { useEffect, useState } from 'react';

const Centers = () => {
  const [centerItems, setCenterItems] = useState([]);

  useEffect(() => {
    fetch('https://impostors.azurewebsites.net/api/centros/')
      .then((response) => response.json())
      .then((json) => {
        setCenterItems(json.centros);
      })
      .catch(() => {
        setCenterItems([]);
      });
  }, []);

  return (
    <div>
      <p>Centros médicos</p>
      <ol>
        {centerItems.map((center) => (
          <li key={center.id}>{center.nombre}</li>
        ))}
      </ol>
    </div>
  );
};
export default Centers;
