import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get('http://localhost:8001/api/interviewers')
    // .then(response => setDays(response.data));
    ]).then((all) => {
      console.log(all);
      setState(prevState => ({
        ...prevState,
        days: all[0].data,
        appointments:{
          ...prevState.appointments,
          ...all[1].data
        },
        interviewers: {
          ...prevState.interviewers,
          ...all[2].data
        }
      }))
    });
  }, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios({
      method: 'delete',
      url: `http://localhost:8001/api/appointments/${id}`,
    })
    .then((response) => {
      setState((prevState) => ({
        ...prevState,
        appointments,
      }));
    })
    .then(() => {
      let daysObj = spotsRemaining(state.day,state.days,state.appointments)
      console.log('new daysObj', daysObj);
      setState((prevState)=> ({
        ...prevState,
        days: daysObj
      }));
    })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      method: 'put',
      url: `http://localhost:8001/api/appointments/${id}`,
      data: {
        interview: interview
      }
    })
    .then((response) => {
      setState((prevState) => ({
        ...prevState,
        appointments
      }));
    })
    .then(() => {
      let daysObj = spotsRemaining(state.day,state.days,state.appointments, true)
      console.log('new daysObj', daysObj);
      setState((prevState)=> ({
        ...prevState,
        days: daysObj
      }));
    })
  }
  
  function spotsRemaining(day, days, appointments, type = false) {
    let apptIDs = [];
    let count = 0;
    for (const element of days)
    {
      if(element.name === day){
        apptIDs = [...element.appointments];
        break;
      }
    }

    for (const element of apptIDs){
      if (!appointments[`${element}`].interview){
        count++
      }
    }
    
    //Not sure why I need this, that state does not update correctly even after updating
    //update 
    if (type){
      count--;
    } else {
      //delete 
      count++;
    }

    const newDaysArray = days.map(item => {
      if (item.name === day) {
        return { ...item, spots: count }
      }
      return item;
    })

    return newDaysArray;
  }



  return {state, setDay, cancelInterview, bookInterview}
}

