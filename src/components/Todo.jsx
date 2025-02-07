// Material UI Components
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

// Components
import Timer from "./Timer";

// React Modules
import toast from "react-hot-toast";

export function Todo({ todo, updateTodos }) {

  const { title, description,priority, is_completed, id, deadline } = todo;  

  // If the task is deleted
  async function deleteClick() {
    const r = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/" + id, {
      method: "DELETE",
    });
    const j = await r.json();
    toast.success(j.message);
    updateTodos();
  }

  // If `Done` or `Undone` was clicked
  // Then change it in API according to the action
  async function doneClick() {
    const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...todo,
            is_completed: !is_completed
        })
    });
    const result = await response.json();
    toast.success(is_completed ? "Task undone!" : "Task done!");

    updateTodos();
  }

  return (
    <div className="todo" style={{ 
        borderColor:  priority > 5 ? (priority > 10 ? "rgba(255, 0, 0, 0.6)" : "rgba(217, 223, 97, 0.78)") : "rgba(79, 214, 79, 0.6)",
        backgroundColor:  priority > 5 ? (priority > 10 ? "rgba(249, 115, 115, 0.2)" : "rgba(235, 247, 10, 0.2)") : "rgba(139, 245, 139, 0.2)",
        opacity: is_completed ? 0.7 : 1 ,
        textDecoration: is_completed ? "line-through" : ""
      }}>

      <div className="todo-title" >
        {/* If completed then show the green tick, otherwise pending symbol */}
        {is_completed ? <CheckCircleOutlinedIcon style={{ fontSize: "larger", color: "green" }} /> : <PendingActionsOutlinedIcon style={{ fontSize: "32px", color: "rgba(233, 152, 30, 0.89)" }} /> }
        {title}
      </div>

      {/* If there is a description show that, otherwise don't */}
      {description && <div className="todo-description">
                        <span><b>Description:</b></span> {description}
                      </div>}

      {/* Remaining Time */}
      <div className="todo-remaining">
        <span><b>Remaining Time:</b></span> <Timer deadline={deadline} />
      </div>

      {/* Delete button */}
      <div className="todo-btns-box">
        <div onClick={deleteClick} style={{ cursor: "pointer" }}>
            <DeleteIcon className="del-icon" style={{ fontSize: "32px" }} />
        </div>
        {/* Complete button */}
        <div className="completion-box">
            <Button onClick={doneClick} variant="outlined">
                {is_completed ? "Undone" : "Done"}
            </Button>
        </div>

      </div>
    </div>
  );
}
