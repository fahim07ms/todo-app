import { useState } from "react";

function Sort({todos, setTodos, updateTodos}) {
  let sortedTodos = [...todos];

  // Function that takes which way to sort
  function handleSort(sortBy) {
    if (sortBy === "none") {
        updateTodos();
    } else if (sortBy === "creation-time") {
        sortedTodos.sort((t1, t2) => new Date(t1.created_at) - new Date(t2.created_at))
    } else if (sortBy === "deadline") {
        sortedTodos.sort((t1, t2) => new Date(t1.deadline) - new Date(t2.deadline))
    } else if (sortBy === "priority1") {
        sortedTodos.sort((t1, t2) => t1.priority - t2.priority)
    } else if (sortBy === "priority2") {
        sortedTodos.sort((t1, t2) => -(t1.priority - t2.priority))
    }
    // Sort the sorted array according to task completion 
    sortedTodos.sort((t1, t2) => t1.is_completed - t2.is_completed);

    // Update the todolist
    setTodos(sortedTodos);
  } 
  return (
    <div className="sort">
        <select className="sort-menu" name="sort" onChange={(e) => {handleSort(e.target.value)}}>
            <option value="none">Sort By</option>
            <option value="creation-time">Creation Time</option>
            <option value="deadline">Deadline</option>
            <option value="priority1">Priority (Low to High)</option>
            <option value="priority2">Priority (High to Low)</option>
        </select>
    </div>
  );
}

export default Sort;
