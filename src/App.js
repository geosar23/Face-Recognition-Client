import React , { useEffect, useState, createContext, useRef} from 'react'
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Logo from './components/Logo/logo.js'
import ImageInputForm from './components/ImageInputForm/ImageInputForm.js'
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

const setupClarifaiAPI_PREDICT_VIA_URL = (imageUrl) => {

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

const setupClarifaiAPI_PREDICT_VIA_FILE = (image_bytes_string) => {
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
    const IMAGE_BYTES_STRING = image_bytes_string;

    console.log("image_bytes_string",image_bytes_string)

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": IMAGE_BYTES_STRING
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

export const PointsEarnedContext = createContext();

function App() {

    //PREDICT VIA URL METHOD
    const [imageUrl,setImageUrl]=useState("");

    //PREDICT VIA FILE METHOD
    const [filepath, setFilepath] = useState(null);

    //IMG SRC TO PROVIDE
    const [imageSrc, setImageSrc] = useState('');

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


    const [pointsEarned, setPointsEarned] = useState(0);

    const ref = useRef(null);

    useEffect(() => {
        // fetch('http://localhost:5000').then(response => {
        //   console.log(`Server respond with status ${response.status}`);
        // });
    });

    const updatePointsEarned = (newValue) => {
        setPointsEarned(newValue);
    };

    const scrollToImage = () => {
        if(ref?.current) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
    }

    const calculateFaceLocation = (data, uploadViaFile = false) => {

        const facesArray = data.outputs[0]?.data?.regions;

        const numberOfFaces = data.outputs[0]?.data?.regions?.length || 0;

        if(!numberOfFaces) {
            toast.info("No faces recognized in the photo");
            return;
        }
        
        return facesArray.map((face, index) => {
            const clarifaiFace=face.region_info.bounding_box;
            const image= document.getElementById('inputImage')
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

    const onURLchange = event => {
        console.log("onURLChange", event.target.value)
        setImageUrl(event.target.value)
    };

    const onFileChange = event => {
        console.log("onFileChange", event.target.files)
        const filepath = event.target.files[0]

        if (filepath) {
            setFilepath(filepath);
        }
    }

    const convertFileToBase64 = (filepath) => {
        return new Promise((resolve, reject) => {
            console.log("convertFileToBase64", filepath)
            const reader = new FileReader();
            reader.readAsDataURL(filepath);
        
            reader.onload = () => {
                console.log("Reader result", reader.result);
                resolve(reader.result)
            };
        
            reader.onerror = (error) => {
              console.error('Error converting file to Base64:', error);
              reject(error)
            };
        });
    };

    const onLinkSubmition=(event)=>{

        console.log(event)
        cleanState("file")

        if(!imageUrl) {
            toast.warning("Please provide a url of an image");
            return;
        }

        setImageSrc(imageUrl)

        // app.models.predict(Clarifai.FACE_DETECT_MODEL,imageUrl)
        // app.models.predict('face-detection', imageUrl)
        setLoading(true);
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setupClarifaiAPI_PREDICT_VIA_URL(imageUrl))
            .then(response => response.json())
            .then(response=>{
                setLoading(false);
                
                //Score how many faces you found
                const facesRecognized = response?.outputs[0]?.data?.regions?.length || 0;

                if(response.status.code!== 10000) {

                    if(response.outputs) {
                        toast.error(`${response.outputs[0].status.description} \n ${response.outputs[0].status.details}`);
                        return;
                    }else {
                        toast.error(`${response.status.description} \n ${response.status.details}`);
                        return;
                    }

                   
                }
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

                        toast.success(`Success, you claimed ${facesRecognized} points !`);

                        setPointsEarned(facesRecognized);

                        setUser({
                            ...user,
                            score: res.score,
                        });
                        
                    })

                    //Draw the boxes
                    displayFaceBox(calculateFaceLocation(response, false));

                    scrollToImage();
                }
            })
            .catch(error=>{
                setLoading(false);
                toast.error(error?.message || "Error when trying to call the Clarifai API");
                console.log('error')
                console.log(error)
                setError(error.message);
                return;
            })
    }

    const onFileUpload = async (event) => {

        cleanState("url")

        if(!filepath) {
            toast.warning("Please upload an image");
            cleanState("url")
            return;
        }

        const base64String = await convertFileToBase64(filepath)
        setImageSrc(base64String)
        const base64Content = base64String.split(',')[1]; // Remove the data URI prefix

        setLoading(true);
        fetch("https://api.clarifai.com/v2/models/face-detection/outputs", setupClarifaiAPI_PREDICT_VIA_FILE(base64Content))
            .then(response => response.json())
            .then(response=>{
                setLoading(false);

                if(response.status.code!== 10000) {

                    if(response.outputs[0]) {
                        toast.error(`${response.outputs[0].status.description} \n ${response.outputs[0].status.details}`);
                        return;
                    }else {
                        toast.error(`${response.status.description} \n ${response.status.details}`);
                        return;
                    }

                   
                }

                //Score how many faces you found
                const facesRecognized = response?.outputs[0]?.data?.regions?.length || 0;
             
                if(response.status.code === 10000) {

                    fetch('http://localhost:5000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user.id,
                            score: facesRecognized*2
                        })
                    }).then(res => res.json())
                    .then((res) => {

                        if(!res.success || !res.score) {
                            console.log(res)
                            toast.error("Error: Server was not able to log your score please try again");
                            return;
                        }

                        toast.success(`Success, you claimed ${facesRecognized * 2} points !`);

                        setPointsEarned(facesRecognized*2);

                        setUser({
                            ...user,
                            score: res.score,
                        });

                        scrollToImage();
                        
                    })

                    //Draw the boxes
                    displayFaceBox(calculateFaceLocation(response, true)) 
                }
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

    const cleanState = (mode) => {

        if(mode === 'all') {
            setImageUrl('');
            setFilepath(null);
            setBoxes([]);
            if(document.getElementById('formFile')?.value) {
                document.getElementById('formFile').value = "";
            }
            return;
        }

        if(mode === "file") {
            setFilepath(null);
            setBoxes([]);
            if(document.getElementById('formFile')?.value) {
                document.getElementById('formFile').value = "";
            }
            return;
        }

        if(mode === "url") {
            setImageUrl('')
            setBoxes([]);
            return;
        }

        if(mode === "boxes") {
            setBoxes([]);
            return;
        }
    }

    const onRouteChange = (route) => {
        
        cleanState('all');

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
            <Navigation onRouteChange={onRouteChange} signIn={signIn} user={user}/>

            {route==='home' ? 
                <div>
                    <Logo />
                    <PointsEarnedContext.Provider value={{ pointsEarned, updatePointsEarned }}>
                        <Rank user={user}/>
                    </PointsEarnedContext.Provider>
                    <ImageInputForm 
                        loading={loading} 
                        imageUrl={imageUrl}
                        onURLchange={onURLchange} 
                        onLinkSubmition={onLinkSubmition} 
                        onFileChange={onFileChange}
                        onFileUpload={onFileUpload}/>
                        <div ref={ref} className='mb-5'>
                            <FaceRecognition imageSrc={imageSrc} boxes={boxes} />
                        </div>             
                    </div>
            : (route === 'signin') ? 
                <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
                : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
                
            }
        </div>
    );
}

export default App;
