// Material UI Components
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// React Modules
import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import toast from 'react-hot-toast';

function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    async function handleClick() {
        if(pass != cpass) {
            toast.error("Passwords do not match");
            return;
        }
        const body = {
            "name": name,
            "email": email,
            "phone": phone,
            "username": username,
            "password": pass,
            "profile_picture": ""
        };
        const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        toast.success(data.message);
        setName("");
        setEmail("");
        setPass("");
        setPhone("");
        setCpass("");
        setUsername("");
        navigate("/login");
    }

    return <>
        <div className='createPage'>
            <div className='createForm' >
                <div className='formHeading'>Create an Account</div>
                <br/>
                <br/>
                <div>
                    <TextField placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <br/>
                    <br/>
                    <TextField placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)}  />
                    <br/>
                    <br/>
                    <TextField placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}  />
                    <br/>
                    <br/>
                    <TextField type="password" placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField type="password" placeholder='Confirm Password' value={cpass} onChange={(e) => setCpass(e.target.value)} />
                </div>
                <br/>
                <br/>
                <Button variant="outlined" size='large' onClick={handleClick}>Create Account</Button>
            </div>
        </div>
    </>
}

export { Create }