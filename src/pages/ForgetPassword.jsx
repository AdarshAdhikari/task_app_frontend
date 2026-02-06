import { useState } from "react";
import API from "../api/api";


function Forgetpassword() {

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const resetPassword = async () => {

        try {
            await API.post("/auth/forgot-password", { email, newPassword });
            alert("Password Reset Successful");
            window.location.href = "/";
        } catch (err) {
            alert("user not found");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>

            <input
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="New Password"
                onChange={e => setNewPassword(e.target.value)}
            />

            <button onClick={resetPassword}>Reset Password</button>

        </div>
    );
}

export default Forgetpassword;