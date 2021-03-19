import React from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import useVisualMode from "hooks/useVisualMode";
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview);
    transition(SHOW);
  }

  function delAppt() {
    transition(DELETE)
    props.onDelete(props.id)
    transition(EMPTY)
  }
  function edit() {


    //props.editAppt(id, interview) 
    //which is book interview in a nutshell
  }
  console.log('appt props', props)

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
      />}
      {mode === CREATE &&
        <Form 
        interviewers={props.interviewers}
        onCancel={()=>back()}
        onSave={save}
      />}
      {mode === SAVING &&
      <Status message={'Saving Private Appt'}/>
      }
      {mode === DELETE && 
      <Status message={'Deleting Appt'}/>
      }
      {mode === CONFIRM &&
      <Confirm
      message={'Are you sure?'}
      onCancel={()=>back()}
      onConfirm={delAppt}
      // onConfrim
      />}
      {mode === EDIT && 
        <Form
        name = {props.interview.student}
        interviewers = {props.interviewers}
        interviewer = {props.interview.interviewer.id}
        onSave= {save}
        onCancel= {()=> back()}
      />}
    </article>
  );
};


