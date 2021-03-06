import React, { useState } from 'react';
// need useNavigate in order to send a logged in person to personalPlace
//  once they have registered
import { Link, useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export const Signup = () => {


  const [error_state, setError] = useState('');
 
  const [formData_state, setFormData] = useState({
    email: "",
    password: ""
  })

  let navigate = useNavigate();


  function submitForm(event){
    event.preventDefault();   

    Accounts.createUser({email: formData_state.email, password: formData_state.password}, (errorCallbackObject) => {
      console.log('signup callback error', errorCallbackObject);
      // check if there is an error. If not, send the user on
      if (!!errorCallbackObject){ // if errorCallbackObject is null
        console.log('Signup callback error', errorCallbackObject);
        // console.log('Signup callback error', errorCallbackObject.reason);
        setError(errorCallbackObject.reason);
      } else {
        navigate("/personalPlace");
      }
    }); 

                                  
  }

  return (
    <>
      <h1>Signup here!</h1>
      {error_state ? <p>{error_state}</p> : undefined}
      <form onSubmit={submitForm}>
        <input 
          type='email' 
          value={formData_state.email}
          onChange={(e) => setFormData({...formData_state, email: e.target.value})}
          placeholder='Email' />

        <input  type='password' 
                value={formData_state.password} 
                onChange={(e) => setFormData({...formData_state, password: e.target.value})}
                placeholder='Password' />
        <button>Create Account</button>
      </form>
      <br /><br />
      <Link to="/">Already have an account?</Link>
  </>
)

}