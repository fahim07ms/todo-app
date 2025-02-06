// Material UI Components
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

// React Modules
import toast from "react-hot-toast";

export function Todo({ todo, updateTodos }) {

  const { title, priority, is_completed, id, deadline } = todo;  
  async function deleteClick() {
    const r = await fetch("http://3.109.211.104:8001/todo/" + id, {
      method: "DELETE",
    });
    const j = await r.json();
    toast.success(j.message);
    updateTodos();
  }

  async function doneClick() {
    const response = await fetch("http://3.109.211.104:8001/todo/" + id, {
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
    console.log(result);
    toast.success(is_completed ? "Task undone!" : "Task done!");
    updateTodos();
  }

  return (
    <div className="todo" style={{ 
        borderColor:  priority > 8 ? "rgba(255, 0, 0, 0.43)" : "rgba(79, 214, 79, 0.45)",
        backgroundColor:  priority > 8 ? "rgba(246, 144, 144, 0.16)" : "rgba(157, 228, 157, 0.16)",
        opacity: is_completed ? 0.7 : 1 
      }}>
      <div className="todo-title" style={{ textDecoration: is_completed ? "line-through" : "" }}>
        {is_completed ? <CheckCircleOutlinedIcon style={{ fontSize: "larger", color: "green" }} /> : <PendingActionsOutlinedIcon style={{ fontSize: "32px", color: "rgba(233, 152, 30, 0.89)" }} /> }
        {title}
      </div>
      <div className="todo-btns-box">
        <div onClick={deleteClick} style={{ cursor: "pointer" }}>
            <DeleteIcon className="del-icon" style={{ fontSize: "32px" }} />
        </div>
        <div className="completion-box">
            <Button onClick={doneClick} variant="outlined">
                {is_completed ? "Undone" : "Done"}
            </Button>
        </div>
      </div>
    </div>
  );
}
