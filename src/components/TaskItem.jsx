import React from "react";
import { motion } from "motion/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/16/solid";

export const TaskItem = ({ task, onDelete, onCheck }) => {
  return (
    <motion.li
      className="flex justify-between items-center my-5"
      key={task.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <span className="max-w-3/4 text-2xl break-words">{task.text}</span>
      <div className="flex ">
        <CheckCircleIcon
          className={`size-7  me-5 cursor-pointer hover:opacity-75 transition duration-300 ease-in-out ${
            task.checked ? "text-green-500" : "text-red-500"
          }`}
          onClick={onCheck}
        />

        <TrashIcon
          className="size-7  cursor-pointer hover:opacity-75 transition duration-300 ease-in-out"
          onClick={onDelete}
        />
      </div>
    </motion.li>
  );
};
