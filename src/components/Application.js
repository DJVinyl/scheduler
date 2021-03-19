import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import Appointment from 'components/Appointment'
import DayList from 'components/DayList'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state,state.day)

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

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

  function deleteAppt(id) {
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
    });
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
      console.log('put request made');
      console.log('response', response);
      setState((prevState) => ({
        ...prevState,
        appointments
      }));


    });
  }


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.days.id}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);
          return <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            onDelete={deleteAppt}
            onEdit={bookInterview}
          />
          })
        }
        {<Appointment key="last" time="5pm" />}
        {/* {dailyAppointments} */}
      </section>
    </main>
  );
}
