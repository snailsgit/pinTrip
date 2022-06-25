import './login.css';
import {useState,useRef} from 'react';
import axios from 'axios';
import {Cancel} from '@mui/icons-material';

function Login({setShowLogin,myStorage,setCurrentUser}) {
const [error,setError] =useState(false);
const nameRef=useRef();
const passwordRef=useRef();

const handleSubmit= async(e) =>{
    e.preventDefault();
    const user={
        user:nameRef.current.value,
        password:passwordRef.current.value
    };

    try {
        const res=await axios.post("http://localhost:5005/api/users/login",user)
        myStorage.setItem("user",nameRef.current.value);
        setCurrentUser(nameRef.current.value);
        setShowLogin(false);
        window.location.reload(false);
    } catch (error) {
        setError(true);
    }
 
};

  return (
    <div className="loginContainer">
        <div className="logo"><img src='pinTrips.png' className='logoImg'></img></div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username"  ref={nameRef}/>
            <input type="password" placeholder="password"  ref={passwordRef}/>
            <button className="loginButton">Login</button>
            {error &&  <span className="failure">Something went wrong!</span>}
           
           
        </form>
        <Cancel className='loginCancel' onClick={()=> setShowLogin(false)}></Cancel>
    </div>
  )
}

export default Login