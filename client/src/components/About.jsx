import './about.css';
import {Cancel} from '@mui/icons-material';

function About({setShowAbout,myStorage}) {


  return (
    <div className="aboutContainer">
        <div className="logo"><img src='pinTrips.png' className='logoImg'></img></div>
            <h1>Hi {myStorage.getItem('user')}</h1>
            <ul>
            <h2>This is a fun app where you can share your travel experience to different part of world using pins.</h2>
            <h2>Double click to create a new pin on the map and add your review.</h2>
            <h2> Your pins will be shown in red color and other people's pin will be shown in blue color.</h2>
            </ul>
            
            <h2>Created with ❤️ by <a href="https://github.com/snailsgit">Madhukar</a></h2>
        <Cancel className='loginCancel' onClick={()=> setShowAbout(false)}></Cancel>
    </div>
  )
}

export default About