import './register.css';
import {useState,useRef} from 'react';
import axios from 'axios';
import {Cancel} from '@mui/icons-material';

function Register({setShowRegister}) {
const [success,setSuccess] =useState(false);
const [error,setError] =useState(false);
const nameRef=useRef();
const emailRef=useRef();
const passwordRef=useRef();

const handleSubmit= async(e) =>{
    e.preventDefault();
    const newUser={
        user:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
    };

    try {
        await axios.post("http://localhost:5005/api/users/register",newUser);
        setError(false);
        setSuccess(true);
    } catch (error) {
        console.log(error);
        setError(true);
    }
};

  return (
    <div className="registerContainer">
        <div className="logo"><img src='pinTrips.png' className='logoImg'></img></div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username"  ref={nameRef}/>
            <input type="email" placeholder="email"  ref={emailRef}/>
            <input type="password" placeholder="password"  ref={passwordRef}/>
            <button className="registerButton">Register</button>
            {success &&  <span className="success">Successfull.You can login now!</span>}
            {error &&  <span className="failure">Something went wrong!</span>}
           
           
        </form>
        <Cancel className='registerCancel' onClick={()=> setShowRegister(false)}></Cancel>
    </div>
  )
}

export default Register