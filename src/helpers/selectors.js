export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let result = [];
  let tempAppts = [];
  for (const element of state.days) {
    if (element.name === day) {
      tempAppts = [...element.appointments];
    }
  }
  for (const element1 of tempAppts)
  {
    for (const element2 in state.appointments) {
      if (element1 == element2){
        result.push(state.appointments[element2]);
      }
    }
  }
  return result;
}