import React , { useEffect, useState} from 'react'
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = new Clarifai.App({
    // apiKey: '9c7d04bafee74c2e852554c07749af15'
    apiKey: '46ef13ce5b9142009d1a09e67843bc1b'
    // apiKey: '0dcc5597fb924e6c9d77683241494f63'
});

const setupClarifaiAPI = (imageUrl) => {

    // https://docs.clarifai.com/api-guide/predict/images
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '0dcc5597fb924e6c9d77683241494f63';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'george_sarama';       
    const APP_ID = '46ef13ce5b9142009d1a09e67843bc1b';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';   
    // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
    const IMAGE_URL = imageUrl;

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;

}

function App() {

    const [inputValue,setInputValue]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [error,setError]=useState(null);
    const [boxes,setBoxes]=useState([]);
    const [route,setRoute]=useState('signin');
    const [signIn,setSignIn]=useState(false);
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        score: 0,
        joined: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // fetch('http://localhost:5000').then(response => {
        //   console.log(`Server respond with status ${response.status}`);
        // });
    });

    const loadUser = (data) => {
        setUser({
            id: data.id,
            name: data.name,
            emai: data.email,
            password: data.password,
            entries: data.entries,
            score: data.score,
            joined: data.joined
        });

        setTimeout(() => {
            console.log("1",user)
        }, 1000);

        setTimeout(() => {
            console.log("2",user)
        }, 5000);

    }

    const calculateFaceLocation = (data) => {
        console.log("data", data)

        const facesArray = data.outputs[0]?.data?.regions;


        console.log("facesArray",facesArray)

        const numberOfFaces = data.outputs[0]?.data?.regions?.length || 0;

        if(!numberOfFaces) {
            toast.info("No faces recognized in the photo");
            return;
        }
        
        return facesArray.map((face, index) => {
            const clarifaiFace=face.region_info.bounding_box;
            console.log(index,clarifaiFace)
            const image=document.getElementById('inputImage')
            const width=Number(image.width)
            const height=Number(image.height)
            return {
                leftCol:clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col*width),
                bottomRow:height - (clarifaiFace.bottom_row*height)
            }
        })
    }

    const displayFaceBox = (boxes) => {
        console.log(boxes)
        setBoxes(boxes);
    }

    const onInputChange = event => {
        setInputValue(event.target.value)
    };

    const onSubmitButton=(event)=>{

        if(!inputValue) {
            toast.warning("Please provide a url of an image");
            return;
        }

        
        setImageUrl(inputValue)

        console.log("onSubmitButton")
        console.log("inputValue",inputValue)
        console.log("userId", user.id)

        // app.models.predict(Clarifai.FACE_DETECT_MODEL,inputValue)
        // app.models.predict('face-detection', inputValue)
        setLoading(true);
        fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupClarifaiAPI(inputValue))
            .then(response => response.json())
            .then(response=>{
                setLoading(false);
                console.log("response",response)
                console.log("userId", user.id)
                
                //Score how many faces you found
                const facesRecognized = response?.outputs[0]?.data?.regions?.length || 0;
                console.log("facesRecognized", facesRecognized)
                if(response.status.code === 10000) {

                    fetch('http://localhost:5000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user.id,
                            score: facesRecognized
                        })
                    }).then(res => res.json())
                    .then((res) => {

                        if(!res.success || !res.score) {
                            console.log(res)
                            toast.error("Error: Server was not able to log your score please try again");
                            return;
                        }

                        setUser({
                            ...user,
                            score: res.score,
                        });
                        
                    })
                }
                displayFaceBox(calculateFaceLocation(response)) 
            })
            .catch(error=>{
                setLoading(false);
                toast.error(error?.message || "Error when trying to call the Clarifai API");
                console.log('error')
                console.log({error})
                setError(error.message);
                return;
            })
    }

    const onRouteChange = (route) => {

        //clean state
        setInputValue('')
        setImageUrl('')
        setBoxes([])

        if(route === 'signout'){
            setSignIn(false);
        }else if(route === 'home'){
            setSignIn(true);
        }

        route = (route === 'signout') ? 'signin' : route;
        setRoute(route);
    }

    return (
        <div className="App">    
            <ParticlesBg type="circle" bg={true} />
                <ToastContainer theme="colored"/>
            <Navigation onRouteChange={onRouteChange} signIn={signIn}/>
            {route==='home' ? 
                <div>
                    <Logo />
                    <Rank user={user}/>
                    <ImageLinkForm loading={loading} onChange={onInputChange} value={inputValue} onSubmitButton={onSubmitButton}/>
                    <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
                    </div>
            : (route === 'signin') ? 
                <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
                : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
                
            }
        </div>
    );
}

export default App;
