import {useEffect,useState,useRef} from 'react';
import Map,{Marker,Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js';
import {Star} from '@mui/icons-material';
import './app.css';
import axios from 'axios';
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";

function App() {
  const myStorage=window.localStorage;
  const [currentUser,setCurrentUser]=useState(myStorage.getItem("user"));
  const [pins,setPins]=useState([]);
  const [currentPlaceId,setcurrentPlaceId]=useState(null);
  const [newPlace,setNewPlace]=useState(null);
  const [title,setTitle]=useState(null);
  const [rating,setRating]=useState(0);
  const [desc,setDesc]=useState(null);
  const [showRegister,setShowRegister]=useState(false);
  const [showLogin,setShowLogin]=useState(false);

  const [showAbout,setShowAbout]=useState(false);

  useEffect(()=>{
    const getPins= async ()=>{
      try {
        const res=await axios.get("http://localhost:5005/api/pins").then(response => { 
          setPins(response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPins();

  },[]);

  const handleMarkerClick=(id,lat,long)=>{
    setcurrentPlaceId(id);
  }

  const handleAddClick=(e)=>{
    const long=e.lngLat.lng;
    const lat=e.lngLat.lat;
    setNewPlace({
      lat,long,
    });
   

  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    const newPin={
      user:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long,
    }

    try {
      const res=await axios.post("http://localhost:5005/api/pins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log( error );
    }
  }


  const handleLogout=()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload(false);
  }

  return (
    <div>
        

    <Map
    
    initialViewState={{
      latitude: 23,
      longitude: 78,
      zoom: 4
    }}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    onDblClick={handleAddClick}
    className='map'
  >

    {pins.map((p)=>(
    <>
   
    <Marker longitude={p.long} latitude={p.lat} color={p.user===currentUser?"red":"blue"} 
    offsetLeft={-20} offsetRight={-10} 
    onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}>
    </Marker>
    {p._id === currentPlaceId && (
      <Popup longitude={p.long} latitude={p.lat}
        anchor="left"
        closeOnClick={false}
        closeButton={true}
        onClose={()=>setcurrentPlaceId(null)}
        >
        <div className="card"> 
           <label>Place</label>
           <h1>{p.title}</h1>
           <label>Review</label>
           <p className='desc'>{p.desc}</p>
           <label>Rating</label>
            <div className='stars'>
              {Array(Number(p.rating)).fill(<Star className="star"></Star>)}
            </div>
           <label>Information</label>
           <span className='username'> Created By  <b>{p.user}</b></span>
           <span className='date'>{format(p.createdAt)}</span>

        </div>
      </Popup>
    )}
      </>
         ))}
        {newPlace && (
        <Popup longitude={newPlace.long} latitude={newPlace.lat}
        anchor="left"
        closeOnClick={false}
        closeButton={true}
        onClose={()=>setNewPlace(null)}
        >
        <div>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input placeholder="enter a title" type="text" onChange={(e)=>setTitle(e.target.value)} ></input>
            <label>Review</label>
            <textarea placeholder="say something about this place." onChange={(e)=>setDesc(e.target.value)} ></textarea>
            <label>Rating</label>
            <select onChange={(e)=>setRating(e.target.value)} >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="submitButton" type="submit">Add Pin</button>
          </form>
        </div>
        </Popup>
        )}; 
        <button className='button about' onClick={()=>setShowAbout(true)}>About</button>
        {currentUser ?(<button className='button logout' onClick={handleLogout}>Logout</button>):(
          <>
          <div className='buttons'>
          <button className='button login' onClick={()=>setShowLogin(true)}>Login</button>
          <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
          </div>
          
          </>
        )};

        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
        {showAbout && <About setShowAbout={setShowAbout} myStorage={myStorage} />}
  </Map>
  
  </div>
  );
}

export default App;
