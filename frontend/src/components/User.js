import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'

const User = ({
    user,
    name, 
    setName, 
    firstName, 
    setFirstName, 
    lastName, 
    setLastName, 
    email, 
    setEmail,
    password, 
    setPassword, 
    updateUser
  }) => {
    const [editMode, setEditMode] = useState(false)
    const [editableUser, setUser] = useState(user)
    const [msg, setMsg] = useState("")
    const [newPassword, setNewPassword] = useInput("")
    const [passwordAgain, setPasswordAgain] = useInput("")

    function useInput(initialValue){
      const [value, setValue] = useState(initialValue);
      function handleChange(e){        
        setValue(e.target.value);    
      }
      return [value,handleChange];
   }

   function checkPassword(word) {
     //must contain at least 1 lowercase, uppercase, number, special character (reserved ones are escaped)
     //at least 8 digits long
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
     return passwordRegex.test(word)
   }
  
   function handleSubmit(e) {
     e.preventDefault();
     console.log("hello from handleSubmit")
     //password checking logic
     let password1 = document.getElementById('newPassword').value.trim();
     console.log(password1)
     let password2 = document.getElementById('passwordAgain').value.trim();
     console.log(password2)
     if (password1 === "" || password2 === "") {
      setMsg("Please enter values to both fields")
     } else if (password1 === password2) {
       if (checkPassword(password1)) {
        setUser({...editableUser,
          password: password1})
        updateUser(editableUser)
        console.log("Password updated")
        setMsg("Password changed")
        } else {
        setMsg("Password must contain uppercase and lowercase letters, 1 number and 1 special character and be at least 8 digits long.")
      }
     } else {
      setMsg("Passwords do not match")
     }
   }

    //console.log(user)
    return (
      <div className='product clearfix'>
        { editMode === false && 
          <div>
           <a href={ '/users/' + user.id }>
              User information for user { user.id }
            </a> 
           <h2>Information</h2> 
            <p>Username: { user.userName }</p>
            <p>First name: { user.firstName }</p>
            <p>Last name: { user.lastName }</p>
            <p>Email: { user.email }</p>
            <br />
            <Button onClick={ () => setEditMode(true) } variant="warning">Edit</Button>
            <h2>Change password:</h2>
            <form onSubmit={handleSubmit}>
              <p> New password:</p>
              <input id="newPassword"type="password"
              value={newPassword} onChange={setNewPassword}/>  
              <br></br>
              <p> Password again:</p>      
              <input id="passwordAgain" type="password"
              value={passwordAgain} onChange={setPasswordAgain}/> 
              <br></br>   
              <p>{msg}</p>      
              <Button variant="success" type="submit">Submit</Button>
           </form>
          </div>
        }
        { editMode === true && 
          <div>
            <a href={ '/users/' + user.id }>
              User information for user { user.id }
            </a>
            <p>Username: 
              <input
                onChange = {
                  event => setUser({...editableUser,
                    name: event.target.value
                  })
                }
                type='text'
                id='name'
                name='name'
                value={ editableUser.name }
              />
            </p>
            <p>First name: 
              <input
                onChange = {
                  event => setUser({...editableUser,
                    firstName: event.target.value
                  })
                }
                type='text'
                id='firstName'
                name='firstName'
                value={ editableUser.firstName }
              />
            </p>
            <p>Last name: 
              <input
                onChange = {
                  event => setUser({...editableUser,
                    lastName: event.target.value
                  })
                }
                type='text'
                id='lastName'
                name='lastName'
                value={ editableUser.lastName }
              />
            </p>
            <p>Email: 
              <input
                onChange = {
                  event => setUser({...editableUser,
                    email: event.target.value
                  })
                }
                type='text'
                id='email'
                name='email'
                value={ editableUser.email }
              />
            </p>
            <br />

            <Button onClick={ () => {
              updateUser(editableUser);
              setEditMode(false);
            }} variant="success">Save</Button>
          </div>
        }
      </div>
    )
  }
  
  export default User