export const getAppointmentsForDay = (currentState, currentDay) => {
  const dayObj = currentState.days.find((item) => item.name === currentDay);

  if (!dayObj) {
    return [];
  }

  const result = dayObj.appointments.map((ID) => {
    return currentState.appointments[ID];
  });
  
  return result;
};

export const getInterviewersForDay = (currentState, currentDay) => {
  const day = currentState.days.find((item) => item.name === currentDay);

  if (!day) {
    return [];
  }

  const result = day.interviewers.map((ID) => {
    return currentState.interviewers[ID];
  });

  return result;
};

export const getInterview = (currentState, interview) => {
  let result = null;
  if (interview === null) {
    return result;
  } else {
    for (const key in currentState.interviewers) {
      if (interview.interviewer === currentState.interviewers[key].id) {
        result = {
          student: interview.student,
          interviewer: {
            ...currentState.interviewers[key],
          },
        };
        break;
      }
    }
  }
  return result;
};
