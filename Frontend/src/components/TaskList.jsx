import { AnimatePresence } from "motion/react";

import React from "react";
import { TaskItem } from "./TaskItem";
import TaskListHeader from "./TaskListHeader";

export const Tasklist = ({ tasks, onDelete, onCheck, activeList }) => {
  return (
    <div className="w-full">
      <AnimatePresence>
        {activeList && (
          <TaskListHeader key={activeList.id} activeList={activeList} />
        )}
      </AnimatePresence>
      <ul>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onDelete={() => onDelete(task.id)}
              onCheck={() => onCheck(task.id)}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
