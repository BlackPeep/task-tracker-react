import { PlusIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Drawer from "./Drawer";

const Navbar = ({
  onAddListClick,
  taskLists,
  handleSelectList,
  activeListId,
  onDeleteList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (taskLists.length === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [taskLists, isOpen]);

  return (
    <nav className=" bg-indigo-900  flex justify-between items-center  px-5 sm:px-10 h-20">
      <h1 className="text-md md:text-3xl text-white font-bold">Task Tracker</h1>

      <div className="flex  items-center justify-between gap-5">
        <div className="flex  justify-between items-center gap-3 ">
          {/* {!taskLists.length && <span>Create Task List</span>} */}
          <div
            onClick={onAddListClick}
            className="flex items-center gap-2 cursor-pointer text-white "
          >
            Add List <PlusIcon className="size-7  " />
          </div>
        </div>

        {taskLists.length > 0 && (
          <div>
            <button
              className="flex items-center justify-between gap-2 cursor-pointer text-neutral-50 "
              onClick={() => setIsOpen(true)}
            >
              Lists
              <Bars3Icon className="size-6" />
            </button>

            {/* Drawer */}
            <Drawer
              taskLists={taskLists}
              activeListId={activeListId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleSelectList={handleSelectList}
              onDeleteList={onDeleteList}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
