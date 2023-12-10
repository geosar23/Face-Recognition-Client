import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import { getServerKeys } from '../../helpers/clarifai.js';
import { saveAuthTokenInSession } from "../../helpers/auth.js";

function Register({loadUser, onRouteChange}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const validateEmail = (email) => {
        // A simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {

        const MIN_LENGTH = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        // const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

        if(password.length < MIN_LENGTH) {
            toast.error("Password should be at least 8 characters long");
            return false;
        }

        if(!hasUpperCase) {
            toast.error("Password should have at least 1 upper case character");
            return false;
        }
        
        if(!hasLowerCase) {
            toast.error("Password should have at least 1 lower case character");
            return false;
        }
        
        if(!hasNumber) {
            toast.error("Password should be at least 1 number");
            return false;
        }

        return true;
    };

    const validateRegisterInput = () => {     
        // Validate email
        if (!validateEmail(email)) {
            toast.error("Invalid email address");
            return false;
        }

        // Validate name (assuming at least 2 characters)
        if (name.length < 2) {
            toast.error("Name should be at least 2 characters long");
            return false;
        }

        // Validate password (assuming at least 6 characters)
        if (!validatePassword(password)) {
            return false;
        }

        return true;
    }

    const onRegister = () => {

        //Comment out for testing
        if(!validateRegisterInput()) {
            return;
        }

        setIsLoading(true);
        fetch('/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(res => res.json())
        .then(async data => {
            setIsLoading(false);
            
           if(!data.success) {
                let msg = data.message || "Error while trying to register, please try again";
                toast.error(msg)
                return; 
            }
            saveAuthTokenInSession(data.token);
            loadUser(data.user);
            await getServerKeys();
            onRouteChange('home');
        })
        .catch(error=>{
            setIsLoading(false);
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input 
                                aria-label="name input"
                                className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                                aria-label="email input"
                                className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                                aria-label="password input"
                                className="b pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <button
                            onClick={onRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib button-120"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm pl-5 pr-5" role="status" aria-hidden="true"></span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </article>

    )
}

export default Register