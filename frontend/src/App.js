import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import sleepPeriodService from './services/sleepPeriods'
import commentService from './services/comments'
import externalService from './services/externals'
import userService from './services/users'
import accountService from './services/accounts'

import SleepPeriods from './components/SleepPeriods'
import Settings from './components/Settings'
import Navigation from './components/Navigation'
import Comments from './components/Comments'
import Externals from './components/Externals'
import User from './components/User'
import FilteredView from './components/FilteredView'
import DateSelect from './components/DateSelect'

const App = () => {
  const [sleepPeriods, setSleepPeriods] = useState([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [commentDate, setCommentDate] = useState('')
  const [sleepQuality, setSleepQuality] = useState('MEDIUM')
  const [exts, setExts] = useState([])
  const [externalDate, setExternalDate] = useState('')
  const [externalType, setExternalType] = useState('COFFEE')
  const [quantity, setQuantity] = useState('')
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [noPeriods, setNoPeriods] = useState(1)
  const [dateFilter, setDateFilter] = useState(Date.now())

  useEffect(() => {
    document.title = 'Sleep Diary'
    fetchSleepPeriods()
    fetchComments()
    fetchExternals()
    fetchUsers()
    setCurrentPeriodStart()
  }, [])

  const fetchSleepPeriods = () => {
    sleepPeriodService
      .getAll()
      .then(sleepPeriods => setSleepPeriods(sleepPeriods))
  }

  const fetchComments = () => {
    commentService
      .getAll()
      .then(allComments => setComments(allComments))
  }

  const fetchExternals = () => {
    externalService
      .getAll()
      .then(externals => setExts(externals))
  }

  const fetchUsers = () => {
    userService
    .getAll()
    .then(users => setUser(users[0]))
  }

  const login = () => async (event) => {
    event.preventDefault()

    try {
      const user = await accountService.login({
        userName: "user",
        password: "password"
      })
      console.log(user.data)
      console.log(user.headers)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (e) {
      console.log(e)
    }
  }

  const setCurrentPeriodStart = () => {
    const now = new Date()
    if(now.getHours() < 12) {
      setDateFilter(new Date(now.getTime() - (86400000 * noPeriods)))
    }
  }

  const addSleepPeriod = () => (event) => {
    event.preventDefault()
    if (startTime && endTime) {
      const sleepPeriod = {
        startTime: startTime,
        endTime: endTime,
      }
      sleepPeriodService
        .create(sleepPeriod)
        .then(createdSleepPeriod => {
          setSleepPeriods(sleepPeriods.concat(createdSleepPeriod))
          const date = new Date()
          setStartTime(date)
          setEndTime(date)
        })
        .catch(error => console.log(error))
    }
  }

  const updateSleepPeriod = (sleepPeriod) => {
    sleepPeriodService
      .update(sleepPeriod)
      .then(updatedSleepPeriod => {
        const filteredSleepPeriods = sleepPeriods.filter(sp => sp.id !== sleepPeriod.id)
        setSleepPeriods(filteredSleepPeriods.concat(updatedSleepPeriod))
      })
      .catch(error => console.log(error))
  }

  const removeSleepPeriod = (sleepPeriod) => {
    sleepPeriodService
      .remove(sleepPeriod)
      .then(setSleepPeriods(sleepPeriods.filter(sp => sp.id !== sleepPeriod.id)))
      .catch(error => console.log(error))
  }

  const filteredSleepPeriods = sleepPeriods.filter(sleepPeriod => {
    if (filterStartDate && filterEndDate) {
      const startTimeDate = new Date(sleepPeriod.startTime)
      const endTimeDate = new Date(sleepPeriod.endTime)
      if ((startTimeDate <= filterEndDate && startTimeDate >= filterStartDate) ||
        (endTimeDate >= filterStartDate && endTimeDate <= filterEndDate) ||
        (startTimeDate <= filterStartDate && endTimeDate >= filterEndDate)) {
        return true
      }
      return false
    }
    return true
  })

  const addComment = (event) => {
    event.preventDefault()
      if(comment && commentDate && sleepQuality){
      const newComment = { comment, commentDate, sleepQuality }
      console.log(newComment)
      commentService
        .create(newComment)
        .then(returnedComment => {
          setComments(comments.concat(returnedComment))
          setComment('')
          setCommentDate('')
          setSleepQuality('MEDIUM')
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        if (!comment) console.log('comment null')
        if (!commentDate) console.log('comment date null')
        if (!sleepQuality) console.log('sleep quality null')
      }
  }

  const updateComment = comment => {
    commentService
      .update(comment)
      .then(returnedComment => {
        setComments(comments.filter(c => c.id !== comment.id).concat(returnedComment))
      })
      .catch(error => {
        console.log(error)
        setComments(comments.filter(c => c.id !== comment.id))
      })
  }

  //no confirmation required
  const deleteComment = id => {
    console.log(`delete id ${id}`)
    commentService
      .deletePerson(id)
      .then(() => {
        setComments(comments.filter(c => c.id !== id))
      })
      .catch(error => {
        console.log(error)
        setComments(comments.filter(c => c.id !== id))
      })
  }

  const handleCommentChange = (event) => setComment(event.target.value)
  const handleCommentDateChange = (date) => setCommentDate(date)
  const handleQualityChange = (event) => setSleepQuality(event.target.value)

  const addExt = (event) => {
    event.preventDefault()
    if (externalDate && externalType && quantity) {
    const newExt = { externalDate, externalType, quantity }
    console.log(newExt)
    externalService
      .create(newExt)
      .then(returnedExt => {
        setExts(exts.concat(returnedExt))
        setExternalDate('')
        setExternalType('')
        setQuantity('')
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      console.log("empty values")
    }
  }

  const deleteExternal = id => {
    console.log(`delete id ${id}`)
    externalService
      .deleteExt(id)
      .then(() => {
        setExts(exts.filter(e => e.id !== id))
      })
  }

  const updateExternal = ext => {
    externalService
      .update(ext)
      .then(returnedExternal => {
        setExts(exts.filter(e => e.id !== ext.id).concat(returnedExternal))
      })
      .catch(error => {
        console.log(error)
        setExts(exts.filter(e => e.id !== ext.id))
      })
  }

  const handleExtDateChange = (date) => {
    console.log(typeof(date))
    setExternalDate(date)
  }
  
  const handleExtTypeChange = (event) => setExternalType(event.target.value)
  const handleQuantityChange = (event) => setQuantity(event.target.value)

  const updateUser = (user) => {
    userService
      .update(user)
      .then(updatedUser => {
        setUser(updatedUser)
      })
      .catch(error => console.log(error))
  }
  
  const handleDatePickerChange = (date) => {
    setDateFilter(date.getTime())
    console.log(date)
  }

  const handleLengthChange = (value) => {
    setNoPeriods(Number(value))
  }
  return (
    <div className='container'>
      <Router>
        <Navigation />
        <Switch>
        <Route path="/settings">
            <Settings />
            <User 
            user={user}
            name={name}
            setName={setName}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            updateUser={updateUser}
          />
          </Route>
          <Route exact path="/">
            <>
            <DateSelect 
              startDate={dateFilter}
              handleDateChange={handleDatePickerChange}
              sleepPeriods={sleepPeriods}
              length={noPeriods}
              setLength={handleLengthChange}
            />
            <FilteredView 
              date={dateFilter}
              length={noPeriods}
              sleeps={sleepPeriods}
              comments={comments}
              exts={exts}
              updateSleepPeriod={updateSleepPeriod}
              removeSleepPeriod={removeSleepPeriod}
              deleteComment={deleteComment}
              updateComment={updateComment}
              deleteExternal={deleteExternal}
              updateExternal={updateExternal}
            />
            <SleepPeriods
              sleepPeriods={filteredSleepPeriods}
               addSleepPeriod={addSleepPeriod}
               startTime={startTime}
               setStartTime={setStartTime}
               endTime={endTime}
               setEndTime={setEndTime}
               filterStartDate={filterStartDate}
               setFilterStartDate={setFilterStartDate}
               filterEndDate={filterEndDate}
               setFilterEndDate={setFilterEndDate}
               updateSleepPeriod={updateSleepPeriod}
               removeSleepPeriod={removeSleepPeriod}
             />
             <Comments
               comments={comments}
               comment={comment}
               handleCommentChange={handleCommentChange}
               commentDate={commentDate}
               handleDateChange={handleCommentDateChange}
               sleepQuality={sleepQuality}
               handleQualityChange={handleQualityChange}
               addComment={addComment}
               deleteComment={deleteComment}
               updateComment={updateComment}
              />
              <Externals
              externals={exts}
              addExternal={addExt}
              externalType={externalType}
              handleExternalTypeChange={handleExtTypeChange}
              externalDate={externalDate}
              handleDateChange={handleExtDateChange}
              externalQuantityValue={quantity}
              handleQuantityChange={handleQuantityChange}
              deleteExternal={deleteExternal}
              updateExternal={updateExternal}
              />
            </>
          </Route>
        </Switch>
      </Router>
    </div>
  //   <div className="container">
  //   <Header changeView={changeView} />
  //   <Nav changeView={changeView} />
  //   <Router>
  //     <Navigation />
  //     <Switch>
  //       <Route exact path="/">
  //         <>
  //           <DateSelect
  //             startDate={dateFilter}
  //             handleDateChange={handleDatePickerChange}
  //             sleepPeriods={sleepPeriods}
  //           />
  //           <FilteredView
  //             date={dateFilter}
  //             sleeps={sleepPeriods}
  //             comments={comments}
  //             exts={exts}
  //             updateSleepPeriod={updateSleepPeriod}
  //             removeSleepPeriod={removeSleepPeriod}
  //             deleteComment={deleteComment}
  //             updateComment={updateComment}
  //           />
  //           <SleepPeriods
  //             sleepPeriods={filteredSleepPeriods}
  //             addSleepPeriod={addSleepPeriod}
  //             startTime={startTime}
  //             setStartTime={setStartTime}
  //             endTime={endTime}
  //             setEndTime={setEndTime}
  //             filterStartDate={filterStartDate}
  //             setFilterStartDate={setFilterStartDate}
  //             filterEndDate={filterEndDate}
  //             setFilterEndDate={setFilterEndDate}
  //             updateSleepPeriod={updateSleepPeriod}
  //             removeSleepPeriod={removeSleepPeriod}
  //           />
  //           <Comments
  //             comments={comments}
  //             comment={comment}
  //             handleCommentChange={handleCommentChange}
  //             commentDate={commentDate}
  //             handleDateChange={handleCommentDateChange}
  //             sleepQuality={sleepQuality}
  //             handleQualityChange={handleQualityChange}
  //             addComment={addComment}
  //             deleteComment={deleteComment}
  //             updateComment={updateComment}
  //           />
  //           <Externals
  //             externals={exts}
  //             addExternal={addExt}
  //             externalType={externalType}
  //             handleExternalTypeChange={handleExtTypeChange}
  //             externalDate={externalDate}
  //             handleDateChange={handleExtDateChange}
  //             externalQuantityValue={quantity}
  //             handleQuantityChange={handleQuantityChange}
  //             deleteExternal={deleteExternal}
  //             updateExternal={updateExternal}
  //           />
  //         </>
  //       </Route>
  //       <Route path="/settings">
  //         <User
  //           user={user}
  //           name={name}
  //           setName={setName}
  //           firstName={firstName}
  //           setFirstName={setFirstName}
  //           lastName={lastName}
  //           setLastName={setLastName}
  //           email={email}
  //           setEmail={setEmail}
  //           password={password}
  //           setPassword={setPassword}
  //           updateUser={updateUser}
  //         />
  //         <Settings />
  //       </Route>
  //     </Switch>
  //   </Router>
  // </div>    
  );
}

export default App
