import React, {useEffect, useState} from 'react';
 
const TableAvailability = (props) => {
    const [availabilityItems, setAvailabilityItems] = useState([]);
    const [centerName, setCenterName] = useState([]);
    const [week, setWeek] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
 
 
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
        setWeek(createCurrentWeek);
        setTimeSlots(createTimeSlots);
    },[]);
 
    const createCurrentWeek = () => {
        let currentDay = new Date();
        let currentWeek = [];
        for (let day = 1; day <= 5; day++) {
            let dayOfWeek = currentDay.getDate() - currentDay.getDay() + day ;
            let date = new Date(currentDay.setDate(dayOfWeek));
            let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            currentWeek.push(dateString);
        }
        return currentWeek;
    }

    const createTimeSlots = () => {
        let timeSlotsTable = Array(9).fill(null).map(x => Array(6).fill("x")); 
        for (let hourIndex = 0; hourIndex <= 8; hourIndex++){
            let hourString = hourIndex+9 + ":00 - " + (hourIndex+10) + ":00";
            timeSlotsTable[hourIndex][0] = hourString;
            console.log(timeSlotsTable[hourIndex][0]);
        }

        let availableHours = availabilityItems;
        let weekDays = createCurrentWeek;
        availableHours.forEach((item) => {
            for (let dayIndex = 0; dayIndex<=4; dayIndex++) {
                if (item.date = weekDays[dayIndex]) {
                    timeSlotsTable[item.hourFrom-9][dayIndex+1] = "Disponible";
                }
            }
        });

        return timeSlotsTable;       
    }


 
    var tableStyle = {
        "border": "1px solid black"
     };
 
 
    return  (       
    <div>
                <p>Horas disponibles</p>
                <p>{centerName}</p>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th></th>
                            {week.map( (day) => 
                                <th key={day}>{day}</th>
                            )}                          
                        </tr>
                    </thead>
                    <tbody>
                        
                        {timeSlots.map( (workHourRow) =>
                                <tr key={workHourRow}>
                                    {workHourRow.map( (atDay) =>
                                            <th key={atDay}>{atDay}</th>
                                        )}
                                </tr>
                            )}
                                      
                    </tbody>
                </table>
              
            </div>)

}

export default TableAvailability;