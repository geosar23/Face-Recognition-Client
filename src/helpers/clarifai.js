import { toast } from 'react-toastify';

export let CLARIFAI_PAT = "";
export let CLARIFAI_USER_ID = "";
export let CLARIFAI_APP_ID = "";
export let CLARIFAI_MODEL_ID = "";
export let CLARIFAI_MODEL_VERSION_ID = "";

export const getServerKeys = async () => {
    try {
        const authorizationToken = window.localStorage.getItem('token');
        const headers = {
            'Authorization': authorizationToken,
            'Content-Type': 'application/json',
        }
        const response = await fetch('http://localhost:5000/serverKeys', {headers});
        const res = await response.json();

        CLARIFAI_PAT = res.data.CLARIFAI_PAT;
        CLARIFAI_USER_ID = res.data.CLARIFAI_USER_ID;
        CLARIFAI_APP_ID = res.data.CLARIFAI_APP_ID;
        CLARIFAI_MODEL_ID = res.data.CLARIFAI_MODEL_ID;
        CLARIFAI_MODEL_VERSION_ID = res.data.CLARIFAI_MODEL_VERSION_ID;

    } catch (error) {
        toast.error(`Error ${error.message || '404 Not found'}`);
        return;
    }
};


export const setupClarifaiAPI_PREDICT_VIA_URL = (imageUrl) => {
    console.log(CLARIFAI_PAT, CLARIFAI_APP_ID, CLARIFAI_MODEL_ID, CLARIFAI_USER_ID, CLARIFAI_MODEL_VERSION_ID)

    // https://docs.clarifai.com/api-guide/predict/images
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = CLARIFAI_PAT;

    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = CLARIFAI_USER_ID;       
    const APP_ID = CLARIFAI_APP_ID;

    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = CLARIFAI_MODEL_ID;
    // const MODEL_VERSION_ID = CLARIFAI_MODEL_VERSION_ID;   
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

export  const setupClarifaiAPI_PREDICT_VIA_FILE = (image_bytes_string) => {
    // https://docs.clarifai.com/api-guide/predict/images
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = CLARIFAI_PAT;

    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = CLARIFAI_USER_ID;       
    const APP_ID = CLARIFAI_APP_ID;

    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = CLARIFAI_MODEL_ID;
    // const MODEL_VERSION_ID = CLARIFAI_MODEL_VERSION_ID;   
    
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