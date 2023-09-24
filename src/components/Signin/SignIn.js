import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn({onRouteChange, loadUser}) {

    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [isLoading, setLoading] = useState(false);


    const onEmailChange = (event) => {
        setSignInEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    }

    const onSubmitSignIn = () => {

        setLoading(true);
        fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);

            if(!data.success) {
                let msg = data.message || "Credentials are not correct";
                toast.error(msg)
                return; 
            }
            
          loadUser(data.user);
          onRouteChange('home');
        })
        .catch(error=>{
            setLoading(false);
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <button
                            onClick={onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib button-100"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm pl-5 pr-5" role="status" aria-hidden="true"></span>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} href="#0" className="f4 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>

    )
}

export default SignIn