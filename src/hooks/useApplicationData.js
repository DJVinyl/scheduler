import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview ? { ...action.interview } : null,
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };

      const days = spotsRemaining(state.day, state.days, appointments);

      return { ...state, appointments, days };
    }
     
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

function spotsRemaining(day, days, appointments) {
  let apptIDs = [];
  let count = 0;
  for (const element of days) {
    if (element.name === day) {
      apptIDs = [...element.appointments];
      break;
    }
  }

  for (const element of apptIDs) {
    if (!appointments[`${element}`].interview) {
      count++;
    }
  }
  console.log(count);

  const newDaysArray = days.map((item) => {
    if (item.name === day) {
      return { ...item, spots: count };
    }
    return item;
  });

  return newDaysArray;
}


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  function cancelInterview(id) {
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: interview,
      })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, id, interview: interview });
      });
  }

  return { state, setDay, cancelInterview, bookInterview };
}
