import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";

import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username")

    return (
        <div>
            <center style={{ fontSize: "32px", marginTop: "100px" }}>
                Welcome to our Todo App! 🚀
            </center>
            {username && 
            <div className="homepage-nav">
            
                <Button variant="contained" size="large" onClick={() => {navigate("/dashboard")}}><DashboardIcon style={{ marginRight: "10px" }} />Dashbord</Button>
                <Button variant="contained" size="large" onClick={() => {navigate("/profile")}}><AccountBoxIcon style={{ marginRight: "10px" }} />Profile</Button>
                <Button variant="contained" size="large" onClick={() => {navigate("/logout")}}><LogoutIcon style={{ marginRight: "10px" }} />Logout</Button>
            
            </div>}
            {!username && 
            <div className="homepage-nav">
            
                <Button variant="contained" size="large" onClick={() => {navigate("/login")}}><LoginIcon style={{ marginRight: "10px" }} />Login</Button>
                <Button variant="contained" size="large" onClick={() => {navigate("/signup")}}><CreateIcon style={{ marginRight: "10px" }} />Create Account</Button>
                
            </div>}
        </div>
    )
}

export { Home }