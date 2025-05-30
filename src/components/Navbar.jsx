import { PlusIcon } from "@heroicons/react/16/solid";

import React from "react";

const Navbar = ({
  onAddListClick,
  taskLists,
  handleSelectList,
  activeListId,
}) => {
  return (
    <nav className=" bg-indigo-950  flex justify-between items-center px-10 h-20">
      <h1 className="text-3xl text-white font-bold">Task Tracker</h1>

      <div className="flex  items-center justify-between gap-3">
        <div className="flex  justify-between items-center gap-3">
          {!taskLists.length && <span>Create Task List</span>}
          <PlusIcon
            className="size-7 text-white cursor-pointer "
            onClick={onAddListClick}
          />
        </div>

        {taskLists.length > 0 && (
          <select
            value={activeListId || ""}
            className="max-w-xs  w-full p-2 text-neutral-50 text-sm sm:text-base bg-indigo-800 rounded focus:outline-0 truncate"
            onChange={(e) => handleSelectList(Number(e.target.value))}
          >
            <option disabled value="">
              Select a List
            </option>
            {taskLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
