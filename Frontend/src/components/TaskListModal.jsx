import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const TaskListModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("List name cannot be empty", { id: "list-empty" });
      return;
    }
    onCreate(name.trim());
    setName("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-neutral-50/50 dark:bg-gray-900/50 flex items-center justify-center z-50 ">
      <form
        className="bg-indigo-900 text-neutral-50 p-6 rounded-xl shadow-xl w-full max-w-sm flex justify-center items-center flex-col h-1/4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Create new Task List</h2>
        <input
          ref={inputRef}
          className="outline-1 rounded-md p-2 mb-4 w-3/4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter List Name"
        />

        <div className="w-1/2 flex justify-between">
          <button
            className="me-3 cursor-pointer rounded-md py-2 px-4 hover:opacity-75 transition duration-300 ease-in-out bg-green-500"
            type="submit"
          >
            Create
          </button>
          <button
            className="me-3 cursor-pointer rounded-md  py-2 px-4 hover:opacity-75 transition duration-300 ease-in-out bg-red-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskListModal;
