import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Col } from 'react-bootstrap';

const AddSleepPeriodForm = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  addSleepPeriod
}) => {
  return (
    <div id='new'>
      <h2>
        Add new sleep period
      </h2>
      <Form onSubmit={ addSleepPeriod() }>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridStartTime">
            <Form.Label>Start time</Form.Label>
            <Form.Control type="datetime-local" placeholder="Start time" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEndTime">
            <Form.Label>End time</Form.Label>
            <Form.Control type="datetime-local" placeholder="End time" />
          </Form.Group>
        </Form.Row>
        <Button variant='info' type='submit'>Add new sleep period</Button>
      </Form>
      {/* <form onSubmit={ addSleepPeriod() }>
        <label htmlFor='startTime'>Start time</label>
        <br />
        <DatePicker
          onChange={date => setStartTime(date)}
          showTimeSelect
          timeIntervals={15}
          selected={startTime}
          dateFormat="dd/MM/yyyy h:mm aa"
          type='datetime-local'
          id='startTime'
          name='startTime'
          value={ startTime }
        />
        <br />
        <label htmlFor='endTime'>End time</label>
        <br />
        <DatePicker
          onChange={date => setEndTime(date)}
          showTimeSelect
          timeIntervals={15}
          selected={endTime}
          dateFormat="dd/MM/yyyy h:mm aa"
          type='datetime-local'
          id='endTime'
          name='endTime'
          value={ endTime }
        />
        <br />
        <p></p>
        <Button variant='info' type='submit'>Add new sleep period</Button>
      </form> */}
    </div>
  )
}

export default AddSleepPeriodForm