import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {

    let navigate = useNavigate();
    let [passMatch, setPassmatch ]= useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(credentials.password !== credentials.cpassword){
            console.log("Passwords do not match...");
            setPassmatch(false);
            return;
        }

        // http://localhost:5000/api/auth/login
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name , email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        // If request is successful
        if(json.success){
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken); // saving the authtoken in local storage
            navigate("/login") // method to redirect to a path
            
            // alert:
            props.showAlert("Account created successfully", "success");
        }else{
            // alert("Invalid credentials...");
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // console.log(note)
    }

    return (
        <div className="cintainer">
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} id="name" name="name" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="text" className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <div id="cpassword_submit" className="form-text" style={{ display: !passMatch ? 'block' : 'none' }} >Passwords do not match.</div>
            </form>
        </div>
    )
}

export default SignUp
