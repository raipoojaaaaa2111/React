import React from "react";
import { useContext } from "react";
import userContext from "../context/userContext";

function profile() {
    const {user}= useContext(userContext);
    if(!user){
        return <h3>Please login to view your profile</h3>
    }
    return (
        <>
           < h3>Welcome {user.name} to your profile</h3>
            <p>Name: {user.name}</p>
            <p>Password: {user.password}</p>
        </>
    )}
    export default profile;