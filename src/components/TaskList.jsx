import { AnimatePresence } from "motion/react";

import React from "react";
import { TaskItem } from "./TaskItem";

export const Tasklist = ({ tasks, onDelete, onCheck }) => {
  return (
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
  );
};
