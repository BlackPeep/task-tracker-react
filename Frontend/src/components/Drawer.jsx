import React from "react";
import { useState } from "react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/16/solid";

const Drawer = ({
  taskLists,
  activeListId,
  isOpen,
  setIsOpen,
  handleSelectList,
  onDeleteList,
}) => {
  return (
    <div
      className={`fixed z-50  top-0 right-0 h-full w-64 sm:w-80 bg-neutral-50 dark:bg-indigo-950 shadow-2xl transform transition-transform durtaion-300 overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="sticky top-0 z-10">
        <div className=" flex items-center justify-between  bg-neutral-50 dark:bg-indigo-950 p-3">
          <header className="text-2xl">Lists:</header>

          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="size-6 cursor-pointer" />
          </button>
        </div>
        <hr />
      </div>

      {taskLists.map((list) => (
        <div
          className={`flex justify-between text-xl cursor-pointer p-3 border-b border-gray-200  shadow-sm 
          ${activeListId === list.id ? "bg-neutral-200 dark:bg-indigo-800" : ""}
          `}
          key={list.id}
          onClick={() => handleSelectList(list.id)}
        >
          <h3 className="max-w-4/5 w-4/5 break-words">{list.name}</h3>

          <TrashIcon
            className="size-6   cursor-pointer hover:opacity-75  transition duration-300 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteList(list.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Drawer;
