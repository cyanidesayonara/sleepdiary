import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const SleepPeriodTimeline = ({ sleepPeriods, comments, externals, startDate }) => {
  let start = new Date(startDate)
  start.setHours(12,0,0,0)
  const end = moment(start).add(24, 'hours')
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  console.log(start)
  console.log(startTime)
  console.log(end)
  console.log(endTime)

  let groups = [
    {
      id: 0,
      title: 'sleepPeriods',
    },
    {
      id: 1,
      title: 'comments',
    },
    {
      id: 2,
      title: 'externals'
    }
  ]
  let items = []
  
  items = items.concat(
    sleepPeriods.map((sleepPeriod, index) => {
      return {
        id: index + '',
        group: 0,
        title: sleepPeriod.duration,
        start: moment(sleepPeriod.startTime),
        end: moment(sleepPeriod.endTime)
      }
    })
  )

  items.concat(
    comments.map((comment, index) => {
      return {
        id: index + '',
        group: 1,
        title: comment.comment,
        start: moment(comment.commentDate),
        end: moment(comment.commentDate + 2)
      }
    })
  )

  items.concat(
    externals.map((external, index) => {
      return {
        id: index + '',
        group: 2,
        title: external.type,
        start: moment(external.externalDate),
        end: moment(external.externalDate + 2)
      }
    })
  )

  return (
    <Timeline
      items={items}
      groups={groups}
      itemsSorted
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      showCursorLine
      canMove={false}
      canResize={false}
      defaultTimeStart={startTime}
      defaultTimeEnd={endTime}
    />
  )
}

export default SleepPeriodTimeline