import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value
        }));
    };

    const postData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`, {
            method: "post", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        }).then((response) => {
            console.log(response.json());
        }
        );
        return response.json();
    };


    const handleSubmit = (event) => {
        event.preventDefault()
        if (credentials.username && credentials.password) {
            postData().then(data => {
                window.localStorage.setItem('token', data.token)
                navigate('/')
            });
        }
    };


    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
        </form >
    );
}

export default LoginForm;