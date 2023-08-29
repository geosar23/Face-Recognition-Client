import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isLoading: false
        }
    }


    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {

        console.log({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
        this.setState({ isLoading: true });
        fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ isLoading: false });
            console.log("s",data)
            if(!data.success) {
                let msg = data.message || "Credentials are not correct";
                toast.error(msg)
                return; 
            }
            
            this.props.loadUser(data.user);
            this.props.onRouteChange('home');
        })
        .catch(error=>{
            this.setState({ isLoading: false });
            toast.error(error?.message || "Server is unable to connect");
            return;
        });
    }

    render() {

        const { onRouteChange } = this.props;
        const { isLoading } = this.state;

        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input 
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                                onClick={this.onSubmitSignIn}
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
}

export default SignIn