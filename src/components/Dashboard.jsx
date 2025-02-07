// Material UI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Components
import { Todo } from "./Todo";
import { CreateTodoModal } from "./CreateTodoModal";
import Navbar from "./Navbar";

// React Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [todolist, setTodoList] = useState([]);
  const [search, setSearch] = useState("");

  async function getTodos() {
    const r = await fetch(
      "http://3.109.211.104:8001/todos"
    );
    const j = await r.json();
    setTodoList(j);
  }

  useEffect(() => {
    if (!username) navigate("/login");
    getTodos();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div style={{ width: "500px" }}>
          <div className="dashboard-navbar">
            <h1>Welcome, {username}!</h1>
            <div>
              {/* <Button
                variant="outlined"
                size="large"
                color="error"
                onClick={logoutClick}
              >
                Logout
              </Button> */}
              <Navbar />
            </div>
          </div>
          <div className="search-box" style={{ padding: "10px" }}>
            <TextField
              fullWidth
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="todolists">
            {todolist.map((value, index) => {
              if (value.title.toLowerCase().includes(search.toLowerCase()))
                return (
                  <Todo 
                    key={value.id}
                    todo={value}
                    updateTodos={getTodos}
                  />
                );
              return <></>;
            })}
          </div>
          <br />
          <br />
          <CreateTodoModal updateTodos={getTodos} />
        </div>
      </div>
    </>
  );
}
