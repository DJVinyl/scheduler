export const getAppointmentsForDay = (currentState, currentDay) => {
  const result = [];
  let apptIDs = [];
  //check for appts for that day
  //could probably do this in a map
  for (const element of currentState.days) {
    if (element.name === currentDay) {
      apptIDs = [...element.appointments]
      break;
    }
  }
  for (const element of apptIDs)
  {
    for (const key in currentState.appointments)
    {
      if (element === currentState.appointments[key].id)
      {
        result.push(currentState.appointments[key]);
        break;
      }
    }
  }
  return result;
}

export const getInterviewersForDay = (currentState, currentDay) => {
  let result = [];
  let interviewerIDs = [];
  //check for appts for that day
  //could probably do this in a map
  for (const element of currentState.days) {
    if (element.name === currentDay) {
      //get the appointments
      interviewerIDs = [...element.interviewers]
      break;
    }
  }

  for (const element of interviewerIDs)
  {
    for (const key in currentState.interviewers)
    {
      if (element === currentState.interviewers[key].id)
      {
        result.push(currentState.interviewers[key]);
        break;
      }
    }
  }
  return result;
}


export const getInterview = (currentState, interview)  => {
  let result = null;
  if (interview === null){
    return result;
  } else {
    for(const key in currentState.interviewers){
      if (interview.interviewer === currentState.interviewers[key].id) {
        result = { 
          student: interview.student,
          interviewer: {
            ...currentState.interviewers[key]
           }
        }
        break;
      }
    }
  }
  return result;
}  



