import React , {Component} from 'react'
import Navigation from './components/Navigation/navigation.js'
import Logo from './components/Logo/logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particle from './components/Particles/Particle.js'
import './App.css'

function App() {
  return (
    <div className="App">
        <Particle/>         
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
