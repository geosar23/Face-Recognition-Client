import React , {useState} from 'react'
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import ParticlesBg from 'particles-bg'
import './App.css'
import SignIn from './components/Signin/SignIn.js';
import Register from './components/Register/Register'

const app = new Clarifai.App({
  apiKey: '9c7d04bafee74c2e852554c07749af15'
});

function App() {

  const [inputValue,setInputValue]=useState("");
  const [imageUrl,setImageUrl]=useState("")
  const [error,setError]=useState(null)
  const [box,setBox]=useState({})
  const [route,setRoute]=useState('signin')
  const [signIn,setSignIn]=useState(false)

  const calculateFaceLocation = (data) => {
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage')
    const width=Number(image.width)
    const height=Number(image.height)
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow:height - (clarifaiFace.bottom_row*height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
    console.log(box)
  }

  const onInputChange = event => {
    setInputValue(event.target.value)
  };


  const onSubmitButton=(event)=>{
    setImageUrl(inputValue)
    console.log(inputValue)
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,inputValue)
    .then(response=>{
      displayFaceBox(calculateFaceLocation(response)) 
      })
    .catch(error=>{
      console.log('error')
      console.log({error})
      setError(error.message)
      
    })
  }

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setSignIn(false)
    }else if(route === 'home'){
      setSignIn(true)
    }
    setRoute(route)
  }


  return (
    <div className="App">
        <ParticlesBg type="circle" bg={true} />     
        <Navigation onRouteChange={onRouteChange} signIn={signIn}/>
        {route==='home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onChange={onInputChange} value={inputValue} onSubmitButton={onSubmitButton}/>
              <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
          : (route === 'signin') 
          ? <SignIn onRouteChange={onRouteChange}/>
          : <Register onRouteChange={onRouteChange}/>
          
         }
       
         
        
    </div>
  );
}

export default App;
