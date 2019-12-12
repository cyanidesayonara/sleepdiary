import React from 'react';
import SleepPeriod from './SleepPeriod'
import AddSleepPeriodForm from './AddSleepPeriodForm'
import { ListGroup } from 'react-bootstrap';
import Filter from './Filter'

const SleepPeriods = ({
    sleepPeriods,
    addSleepPeriod,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    updateSleepPeriod,
    removeSleepPeriod
  }) => {
  return (
    <div id='products'>
      <AddSleepPeriodForm
        addSleepPeriod={ addSleepPeriod }
        startTime={ startTime }
        setStartTime={ setStartTime }
        endTime={ endTime }
        setEndTime={ setEndTime }
      />
      {/* <Filter
        filterStartDate={filterStartDate}
        setFilterStartDate={setFilterStartDate}
        filterEndDate={filterEndDate}
        setFilterEndDate={setFilterEndDate}
      /> */}
      <h2>
        Sleep periods
      </h2>
      <ListGroup>
        { sleepPeriods.map((sleepPeriod) => 
          <SleepPeriod
            key={ sleepPeriod.id }
            sleepPeriod={ sleepPeriod }
            updateSleepPeriod={ updateSleepPeriod }
            removeSleepPeriod={ removeSleepPeriod }
          />
        ) }
      </ListGroup>
    </div>
  )
}

export default SleepPeriods