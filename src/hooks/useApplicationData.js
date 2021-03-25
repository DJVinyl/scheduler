import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducer/reducer";

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
