// MUI Components
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from '@mui/material/Avatar';

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {

  const navigate = useNavigate();

  // For MUI Dropdown Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logoutClick() {
    localStorage.removeItem("username");
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar style={{ backgroundColor: "rgba(50, 101, 240, 0.92)" }}>{localStorage.getItem("username")[0]}</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => {navigate("/dashboard")}}>Dashboard</MenuItem>
        <MenuItem onClick={() => {navigate("/profile")}}>Profile</MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
