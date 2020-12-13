import React , {useState} from 'react'
import Navigation from './components/Navigation/navigation.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particle from './components/Particles/Particle.js'
import './App.css'

function App() {

  const [inputValue,setInputValue]=useState("");

  const onInputChange = event => {
    event.preventDefault() //nikos stuff
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
        <Particle/>         
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onChange={onInputChange} value={inputValue}/>
        {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
