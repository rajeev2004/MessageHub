import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
function Login({setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    function onSwitchToRegister(){
        navigate("/register");
    }
    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/login", { username, password });
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
        <form onSubmit={handleLogin}>
            <h2>Login</h2>

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
                {loading ? "Logging in..." : "Login"}
            </button>
            <p>
                Create an Account?{" "}
                <button type="button" onClick={onSwitchToRegister}>
                    Register
                </button>
            </p>
        </form>
    );
}

export default Login;
