import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credential, setCredential] = useState({email:"", password:""});
    let navigate = useNavigate();
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch("https://inotebookbackendapi.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credential.email, password:credential.password}),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authToken);
            //redirect
            props.showAlert("Logged in Successfully","success");
            navigate("/");

          } else {
            props.showAlert("Invalid Details","danger");
          }
    }
    const onChange = (e)=> {
        setCredential({...credential, [e.target.name]: e.target.value});
    }

    return (
        <div className="my-3">
        <h2>Login to access your notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange}  />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
