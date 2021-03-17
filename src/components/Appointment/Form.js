import React, {useState}  from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'

export default function Form(props) {

  const [personName, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {  
    reset();
    props.onCancel();
  }

  const reset = () => {
    setName('');
    setInterviewer(null);
  }

  //edit will have:
  // name:String
  // interviewers:Array
  // interviewer:Number
  // onSave:Function
  // onCancel:Function

  //create will have:
  // interviewers:Array
  // onSave:Function
  // onCancel:Function

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name='name'
            type="text"
            placeholder="Enter Student Name"
            value={personName}
            onChange={(event) => {setName(event.target.value)}}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={(event) => {
            setInterviewer(event)
            }
          }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm
          onClick={(event) => {
            props.onSave(personName,interviewer)}}
          onSubmit={event => event.preventDefault()}
          >Save</Button>
        </section>
      </section>
    </main>
  );
};