import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            isLoading: false
        }
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    validateEmail = (email) => {
        // A simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword = (password) => {

        const MIN_LENGTH = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

        if(password.length < MIN_LENGTH) {
            console.log("Length not OK")
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

    validateRegisterInput = () => {     
        // Validate email
        if (!this.validateEmail(this.state.email)) {
            toast.error("Invalid email address");
            return false;
        }

        // Validate name (assuming at least 2 characters)
        if (this.state.name.length < 2) {
            toast.error("Name should be at least 2 characters long");
            return false;
        }

        // Validate password (assuming at least 6 characters)
        if (!this.validatePassword(this.state.password)) {
            return false;
        }

        return true;
    }

    onRegister = () => {

        // if(!this.validateRegisterInput()) {
        //     return;
        // }

        this.setState({ isLoading: true });
        fetch('http://localhost:5000/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ isLoading: false });
            console.log("data",data)
            
           if(!data.success) {
                let msg = data.message || "Error while trying to register, please try again";
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

        const { isLoading } = this.state;

        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <button
                                onClick={this.onRegister}
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
}

export default Register