import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./Register.css";
function Register({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    function onSwitchToLogin(){
        navigate("/login");
    }
    async function handleRegister(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("https://messagehub-ys5t.onrender.com/api/register",{ username, password });
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            navigate("/chat");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>

            <p>
                Already have an account?{" "}
                <button type="button" onClick={onSwitchToLogin}>
                    Login
                </button>
            </p>
        </form>
    );
}

export default Register;
