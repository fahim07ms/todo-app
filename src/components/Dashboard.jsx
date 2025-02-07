// Material UI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Components
import { Todo } from "./Todo";
import { CreateTodoModal } from "./CreateTodoModal";
import Navbar from "./Navbar";
import Filter from "./Filter";
import Sort from "./Sort";

// React Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [todolist, setTodoList] = useState([]);
  const [filtered, setFilteredList] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [search, setSearch] = useState("");

  async function getTodos() {
    const r = await fetch(
      "https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos"
    );
    const j = await r.json();
    j.sort((t1, t2) => t1.is_completed - t2.is_completed);
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
              <Navbar />
            </div>
          </div>

          <div className="sort-filter-div">
            {todolist != [] && <Sort todos={todolist} setTodos={setTodoList} updateTodos={getTodos} />}
            {todolist != [] && <Filter todos={todolist} setFiltering={setFiltering} setFilteredList={setFilteredList} />}
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
            {!filtering && todolist.map((value, index) => {
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

            {filtering && filtered.map((value, index) => {
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
