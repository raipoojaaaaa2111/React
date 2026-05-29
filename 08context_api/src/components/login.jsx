import React from "react";
import { useContext, useState } from "react";
import userContext from "../context/userContext";
function login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(userContext);
    const handleSubmit=(e)=>{
        e.preventDefault();
        setUser({ name, password });
    }
    return (
        <>
            <h1>Login</h1>
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </>
    )
}
export default login;