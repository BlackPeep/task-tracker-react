import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export const TaskForm = ({ onAddTask, taskLists }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskLists || taskLists.length === 0) {
      toast("Create a list first", { id: "no-list" });
      return;
    }

    if (!inputValue.trim()) {
      toast.error("task cannot be empty", { id: "empty-task" });
      return;
    }

    onAddTask(inputValue); // pass up to App
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <input
        placeholder="Enter Task"
        className=" mb-4 p-1 outline-1 rounded-md"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="cursor-pointer bg-indigo-900 text-white rounded-md w-full sm:w-3/4 mx-auto p-1 hover:opacity-75 transition duration-300 ease-in-out">
        Add Task
      </button>
    </form>
  );
};
