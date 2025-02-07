import { useState } from "react";

function Filter({setFilteredList, setFiltering , todos}) {
  function handleFilterChange(priority) {
    let sortedTodos = [];
    if (priority == "none") setFiltering(false);
    else setFiltering(true);

    if (priority == "low") {
        sortedTodos = todos.filter(todo => (todo.priority <= 5));
    } else if (priority == "medium") {
        sortedTodos = todos.filter(todo => (todo.priority > 5 && todo.priority <= 10));
    } else if (priority == "high") {
        sortedTodos = todos.filter(todo => (todo.priority > 10));
    }
    setFilteredList(sortedTodos);
  } 
  return (
    <div className="filter">
        <select className="filter-menu" name="filter" onChange={(e) => {handleFilterChange(e.target.value)}}>
            <option value="none">Filter</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
    </div>
  );
}

export default Filter;
