// React modules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import { PieChart } from "@mui/x-charts/PieChart";
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";

// Components
import Navbar from "./Navbar";
import { EditProfile } from "./EditProfile";

function Profile() {
  // Navigation function
  const navigate = useNavigate();

  // Get username stored in local storage
  const username = localStorage.getItem("username");

  // Use states variables
  const [userData, setUserData] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [taskEfficiency, setTaskEfficiency] = useState(0);
  const [taskIncompleted, setTaskIncompleted] = useState(0);

  // Gets User Profile data
  const getProfileData = async () => {
    const response = await fetch(`http://3.109.211.104:8001/profile/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setUserData(result);
  };

  // Gets task related data
  const getTaskData = async () => {
    const tasksResponse = await fetch("http://3.109.211.104:8001/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Total tasks
    const tasks = await tasksResponse.json();
    setTotalTasks(tasks.length);

    // Completed tasks
    const totalCompletedTasks = tasks.filter((task) => task.is_completed === true);
    setTaskCompleted(totalCompletedTasks.length);

    // Efficiency and incompleted tasks
    setTaskEfficiency((totalCompletedTasks.length / tasks.length) * 100);
    setTaskIncompleted((tasks.length - totalCompletedTasks.length));
  };

  // Load data on every mount
  useEffect(() => {
    if (!username) navigate("/login");
    getProfileData();
    getTaskData();
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-navbar">
          <p>Profile</p>
          <Navbar />
        </div>
        <div className="profile-card">
          <div className="profile-header">
            {!userData.profile && <Avatar style={{ backgroundColor: "rgba(50, 101, 240, 0.92)" }} className="profile-avatar">{localStorage.getItem("username")[0].toUpperCase()}</Avatar>}
            {/* {userData.profile && <FaceIcon className="profile-avatar" />} */}
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-username">@{userData.username}</p>
          </div>
          <div className="profile-details">
            <p>
              <strong>Email:</strong>
              {userData.email}
            </p>
            <p>
              <strong>Phone:</strong>
              {userData.phone}
            </p>
          </div>

          {userData && <EditProfile userData={userData} />}
        </div>
      </div>
      
      <div className="task-charts">
        <p style={{ fontSize: "36px", fontWeight: "600" }}>Task Details</p>
        <div className="profile-tasks">
            <p>
            <strong>Total Tasks:</strong> {totalTasks}
            </p>
            <p>
            <strong>Completed Tasks:</strong> {taskCompleted}
            </p>
            <p>
            <strong>Efficiency:</strong> {taskEfficiency.toFixed(2)}%
            </p>
        </div>
        <PieChart
        className="pie-chart"
        series={[
          {
            data: [
              { value: taskCompleted, label: "Completed" , color: 'rgb(26, 106, 26)'},
              { value: taskIncompleted, label: "Incompleted", color: 'rgba(255, 63, 63, 1)' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      </div>
    </div>
  );
}

export { Profile };
