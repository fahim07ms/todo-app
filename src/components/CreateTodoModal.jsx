// Material UI Components
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// React Modules
import { useState } from "react";
import toast from "react-hot-toast";

export function CreateTodoModal({ updateTodos }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("0");
  const [deadline, setDeadline] = useState(new Date());

  async function createTodoClick() {
    const body = {
      title: title,
      description: description,
      deadline: new Date(deadline).toISOString(),
      priority: parseInt(priority),
    };
    const r = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    toast.success("Todo created");

    setTitle("");
    setDescription("");
    setPriority("");
    setDeadline(new Date());

    setIsOpen(false);

    updateTodos();
  }
  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="contained" size="large">
        Create
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="modal-box">
          <div style={{ backgroundColor: "white", padding: "20px" }}>
            <h1>Add a Todo</h1>
            <br />
            <br />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <br />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <br />
            <TextField
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            <br />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Deadline"
                orientation="landscape"
                onChange={(newDeadline) => setDeadline(newDeadline)}
              />
            </LocalizationProvider>
            <br />
            <br />
            <Button
              onClick={createTodoClick}
              fullWidth
              variant="contained"
              size="large"
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
