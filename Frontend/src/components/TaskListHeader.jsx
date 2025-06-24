import React from "react";
import { motion } from "motion/react";

const TaskListHeader = ({ activeList, handleDeleteList }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-5 w-full">
        <h2 className="text-3xl font-bold tracking-wide break-words whitespace-normal overflow-hidden max-w-xl">
          {activeList.name}
        </h2>

        {/* <button
          className=" text-xs text-neutral-50 cursor-pointer rounded-md  py-2 px-4 hover:opacity-75 transition duration-300 ease-in-out bg-red-500 "
          onClick={() => handleDeleteList(activeList.id)}
        >
          Delete List
        </button> */}
      </div>
      <hr className="my-4 " />
    </motion.div>
  );
};

export default TaskListHeader;
