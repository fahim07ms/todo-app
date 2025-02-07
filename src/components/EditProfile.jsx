import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EditProfile({userData}) {

    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);

    const navigate = useNavigate();
    
    const handleClickSave = async () => {

        const body = {
            name: name,
            email: email,
            phone: phone,
            profile_picture: ""
        }

        const response = await fetch(`http://3.109.211.104:8001/profile/${userData.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();

        toast.success(result.message);
        setOpenEditProfile(false);
        setName("");
        setEmail("");
        setPhone("");
        navigate("/profile");
    }
    
    return (
        <div>
            <Button variant="contained" onClick={() => setOpenEditProfile(true)}>Edit</Button>
            <Modal open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
                <div className="modal-box">
                    <h1>Edit Profile</h1>
                    <br />
                    <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <br/>
                    <br/>
                    <TextField label='Email' value={email} onChange={(e) => setEmail(e.target.value)}  />
                    <br/>
                    <br/>
                    <TextField label='Phone' value={phone} onChange={(e) => setPhone(e.target.value)}  />
                    <br/>
                    <br/>
                    <Button variant="outlined" onClick={handleClickSave}>
                        Save
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export { EditProfile };