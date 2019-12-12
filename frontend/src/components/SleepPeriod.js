import React, { useState } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

const SleepPeriod = ({
  sleepPeriod,
  updateSleepPeriod,
  removeSleepPeriod
}) => {
  const [editMode, setEditMode] = useState(false)
  const [editableSleepPeriod, setSleepPeriod] = useState(sleepPeriod)

  const convertToTimeZone = (date) => {
    const timeDiff = new Date(date).getTimezoneOffset()
    const oldMinutes = new Date(date).getMinutes()
    const newDate = new Date(date).setMinutes(oldMinutes + (-1 * timeDiff))
    return new Date(newDate).toLocaleString()
  }

  return (
    <ListGroupItem>
      { editMode === false && 
        <div>
          <a href={ '/sleepPeriods/' + sleepPeriod.id }>
            Sleep period { sleepPeriod.id }
          </a>
          <p>Start time: {convertToTimeZone(sleepPeriod.startTime)}</p>
          <p>End time: {convertToTimeZone(sleepPeriod.endTime)}</p>
          <p>Duration: { sleepPeriod.duration }h</p>
          <br />
          <Button onClick={ () => removeSleepPeriod(sleepPeriod) } variant="danger" size="sm">Delete</Button>
          <Button onClick={ () => setEditMode(true) } variant="warning" size="sm">Edit</Button>
        </div>
      }
      { editMode === true && 
        <div>
          <a href={ '/sleepPeriods/' + sleepPeriod.id }>
            Sleep period { sleepPeriod.id }
          </a>
          <p>Start time: 
            <input
              onChange = {
                event => setSleepPeriod({...editableSleepPeriod,
                  startTime: event.target.value
                })
              }
              type='datetime-local'
              id='startTime'
              name='startTime'
              value={ editableSleepPeriod.startTime }
            />
          </p>
          <p>End time: 
            <input
              onChange = {
                event => setSleepPeriod({...editableSleepPeriod,
                  endTime: event.target.value
                })
              }
              type='datetime-local'
              id='endTime'
              name='endTime'
              value={ editableSleepPeriod.endTime }
            />
          </p>
          <p>Duration: { sleepPeriod.duration }h</p>
          <br />
          <Button onClick={ () => removeSleepPeriod(sleepPeriod) } variant="danger" size="sm">Delete</Button>
          <Button onClick={ () => {
            updateSleepPeriod(editableSleepPeriod);
            setEditMode(false);
          }} variant="success" size="sm">Save</Button>
        </div>
      }
    </ListGroupItem>
  )
}

export default SleepPeriod