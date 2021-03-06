export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
  const dayObj = days.find((item) => item.name === day);

  let count = dayObj.appointments.reduce((acc, cur) => {
    if (!appointments[cur].interview) {
      return ++acc;
    } else {
      return acc;
    }
  }, 0);

  const newDaysArray = days.map((item) => {
    if (item.name === day) {
      return { ...item, spots: count };
    }
    return item;
  });

  return newDaysArray;
}
