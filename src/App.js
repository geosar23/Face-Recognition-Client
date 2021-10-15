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
    event.preventDefault() //Thanks Nik man
    console.log(event.target.value);
    setInputValue(event.target.value);
  };

  const onSubmitButton=(event)=>{
    event.preventDefault()
    console.log('click')
  }


  return (
    <div className="App">
        <Particle/>         
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onChange={onInputChange} value={inputValue}
          onSubmitButton={onSubmitButton} 
          />
        {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
