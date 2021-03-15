import React from "react";
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {  

  let DayListItemClass = classNames(
    {
      'day-list__item': true,
      '--selected': props.selected,
      '--full': props.spots === 0
    });

  const formatSpots = () => {
    if (props.spots === 0) 
    {
      return 'no spots remaining'
    } else if (props.spots === 1) {
      return `${props.spots} spot remaining`
    } else {
      return `${props.spots} spots remaining`
    }
  }  

  return (
    <li 
      className={DayListItemClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}