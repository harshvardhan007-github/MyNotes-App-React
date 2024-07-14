import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // http://localhost:5000/api/auth/login
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        // If request is successful
        if(json.success){
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken); // saving the authtoken in local storage
            navigate("/") // method to redirect to a path

            props.showAlert("Logged in successfully", "success");
        }else{
            // alert("Invalid credentials...");
            props.showAlert("Invalid credentials...", "danger");
        }

    }

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // console.log(note)
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
