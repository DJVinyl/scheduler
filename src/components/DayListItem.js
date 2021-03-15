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

  return (
    <li 
    className={DayListItemClass} 
    onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}