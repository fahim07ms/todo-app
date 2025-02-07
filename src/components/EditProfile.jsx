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
    
    // When user clicks save
    const handleClickSave = async () => {
        // Prepare the body
        const body = {
            name: name,
            email: email,
            phone: phone,
            profile_picture: ""
        }
        // PUT the data to the API
        const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${userData.username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const result = await response.json();

        // Show message
        toast.success(result.message);

        // Closes the Modal
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