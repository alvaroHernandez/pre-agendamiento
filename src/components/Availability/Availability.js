import React, {useEffect, useState} from 'react';

const Availability = (props) => {
    const [availabilityItems, setAvailabilityItems] = useState([
    ]);

    useEffect(() => {
        fetch("http://52.141.211.84/calendaravailability/")
            .then((response) => response.json())
            .then((json) => {
                setAvailabilityItems(json);
            })
            .catch((error) => {
                console.log(error);
                setAvailabilityItems([]);
            });
    },[]);

    return  <div>
		        <p>Horas disponibles</p>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                        </tr>
                    </thead>
                    <tbody>

                    { availabilityItems.map( (availability) => <tr key={availability.date}><td>{availability.date}</td><td>{availability.hourFrom}</td><td>{availability.hourTo}</td></tr> ) }

                    </tbody>
                </table>
	        </div>
}
export default Availability