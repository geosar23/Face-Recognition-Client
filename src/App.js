import React , {useState} from 'react'
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particle from './components/Particles/Particle.js'
import './App.css'

const app = new Clarifai.App({
  apiKey: '9c7d04bafee74c2e852554c07749af15'
  });

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
    app.models
    .predict("45fb9a671625463fa646c3523a3087d5","https://samples.clarifai.com/face-det.jpg")
    .then(
      function(response){
        console.log(response)
      },
      function(err){
        //there was an error
      }
    )
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
        <FaceRecognition/>
    </div>
  );
}

export default App;
