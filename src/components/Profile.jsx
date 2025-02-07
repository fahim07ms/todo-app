import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import Avatar from '@mui/material/Avatar';
import { Button } from "@mui/material";

import Navbar from "./Navbar";

function Profile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [userData, setUserData] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [taskEfficiency, setTaskEfficiency] = useState(0);
  const [taskIncompleted, setTaskIncompleted] = useState(0);

  const getProfileData = async () => {
    const response = await fetch(
      `http://3.109.211.104:8001/profile/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    setUserData(result);
  };

  const getTaskData = async () => {
    const tasksResponse = await fetch("http://3.109.211.104:8001/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tasks = await tasksResponse.json();
    setTotalTasks(tasks.length);

    const totalCompletedTasks = tasks.filter(
      (task) => task.is_completed === true
    );
    setTaskCompleted(totalCompletedTasks.length);
    setTaskEfficiency((totalCompletedTasks.length / tasks.length) * 100);
    setTaskIncompleted((tasks.length - totalCompletedTasks.length));
  };

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

          <Button variant="contained" onClick={() => {navigate("/edit-profile")}}>Edit</Button>
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
