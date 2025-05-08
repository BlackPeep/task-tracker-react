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

      <div className="flex items-center justify-centerc gap-3">
        <button>
          <PlusIcon
            className="size-7 text-white cursor-pointer "
            onClick={onAddListClick}
          />
        </button>

        {taskLists.length > 0 && (
          <select
            value={activeListId || ""}
            className="p-2 text-neutral-50 text-xl focus:outline-0 "
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
