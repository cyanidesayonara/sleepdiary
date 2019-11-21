import React from 'react'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
//import interact from 'interactjs'

const Diary = ({
    date,
    sleepPeriods, 
    comments,
    exts
}) => {
    //TODO fix: date follows the value of dateselect
    //const startDate = moment(date).startOf("day").toDate();
    const startDate = moment('2019-09-01T12:00:00').startOf("day").toDate();


    const dates = []	
    //TODO make an input to set the state of the value for repeats, currently 14 days
		for (let i = 0; i<14; i++) {
			dates.push({
        id: i,
        start: moment(startDate).add(i, "day").startOf("day").toDate(),
        end: moment(startDate).add(i, "day").endOf("day").toDate()
      })
		}
    //console.log(dates)

    const groups = [{ id: 1, title: 'entries' }]
    //console.log(sleepPeriods)
    let array, array1, array2 = []
    const items = []
    
    array = sleepPeriods.map( s => s.id)
    array1 = sleepPeriods.map( s => Math.floor(moment(s.startTime).valueOf() / 10000000) * 10000000)
    array2 = sleepPeriods.map( s => Math.floor(moment(s.endTime).valueOf() / 10000000) * 10000000)
    let length = array.length
   // console.log(array)
  
    for (let i = 0; i<length; i++) {
      items.push({
        id: array[i],
        group: 1,
        title: 'sleep',
        start_time: array1[i],
        end_time: array2[i]
      })
      //console.log(items[i])
    }
    

    let extArray1, extArray2, extArray3 = []
    
    extArray1 = exts.map( e => e.id)
    extArray2 = exts.map( e => Math.floor(moment(e.externalDate).valueOf() / 10000000) * 10000000)
    extArray3 = exts.map( e => e.externalType + " " + e.quantity)
    let length2 = extArray1.length
   // console.log(extArray1)
    
   for (let i = 0; i<length2; i++) {
    items.push({
      id: extArray1[i] + length, //needs to be unique id 
      group: 1,
      title: extArray3[i],
      start_time: extArray2[i],
      end_time: extArray2[i],
      itemProps: {
        style: {
          color: 'black',
          background: 'red'
        }
      }
    })
    //console.log(items[i])
  }
  console.log(items)

    return (
        <div>
             <h6><b>{moment(startDate).format('DD.MM.YYYY')}</b></h6>
            { dates.map(d =>
            <Timeline
              key={d.id}
              groups={groups}
              items={items}
              defaultTimeStart={d.start}
              defaultTimeEnd={d.end}
            />
             )}
        </div>
    )
}

export default Diary