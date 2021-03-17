export const getAppointmentsForDay = (currentState, currentDay) => {
  const result = [];
  let apptIDs = [];
  //check for appts for that day
  //could probably do this in a map
  for (const element of currentState.days) {
    if (element.name === currentDay) {
      //get the appointments
      apptIDs = [...element.appointments]
      break;
    }
  }
  // console.log(apptIDs);
  // now that we have an appointment id array, get the appointment data
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



