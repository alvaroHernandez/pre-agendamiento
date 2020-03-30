import React, {useEffect, useState} from 'react';

const Centers = (props) => {
    const [centerItems, setCenterItems] = useState([
    ]);

    useEffect(() => {
        fetch("http://localhost:42000/api/centros/")
            .then((response) => response.json())
            .then((json) => {
                setCenterItems(json.centros);
            })
            .catch((error) => {
                console.log(error);
                setCenterItems([]);
            });
    },[]);

    return  <div>
		        <p>Centros médicos</p>
                <ul>
                    { centerItems.map( (center) => <li key={center.id}>{center.nombre}</li> ) }
                </ul>
	        </div>
}
export default Centers