import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../Logo/logo.js";

function About({ onRouteChange }) {

    const onRegister = () => {
        onRouteChange('register')
    }

    return (
        <div>
            <Logo />
            <div className="ba b--black-10 shadow-5 center">
                <div className="m-1 w-100">
                    <div id="about" className="ba b--transparent">
                        <div className="">
                            <div className="">
                                <h1 className="">Welcome to Face Recognition!</h1>
                                <p className="">
                                    👋 Welcome to Face Recognition, my exciting project inspired by the renowned online course "The Complete Web Developer in 2024: Zero to Mastery." I've taken the core concepts and expanded the functionality, creating an interactive space for you to explore and have fun.

                                    In this unique experience, we leverage the power of the CLARIFAI API for face recognition. To get started, simply register as a user, and then dive into the world of points and face detection!

                                    Earn 1 point for each face detected when you provide a URL to an image. Take it up a notch by uploading your own image file, and score 2 points for every face recognized. The more faces, the more points—challenge yourself and see how high you can go!

                                    Ready to embark on this facial recognition journey? Sign up, upload, and watch your points stack up as you explore the fascinating capabilities of this innovative technology. Let the face recognition adventure begin! 🚀</p>
                                <p>Register your user and start earning points by providing a URL or uploading your own image file.</p>
                                <p className="">
                                    <button className="btn btn-primary btn-lg" onClick={onRegister}>Get Started</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About