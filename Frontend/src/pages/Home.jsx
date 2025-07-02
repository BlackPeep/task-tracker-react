import { Section } from "../components/Section";
import { Tasklist } from "../components/Tasklist";
import { TaskForm } from "../components/TaskForm";
import { useEffect, useState } from "react";

const Home = ({
  activeList,
  activeListId,
  handleAddTask,
  handleToggleCheck,
  handleDeleteTask,
  taskLists,
  loadingTasks,
}) => {
  return (
    <>
      {/* main content */}
      <main className="px-10 h-[calc(100vh-7.75rem)]  text-3xl  flex flex-col-reverse justify-end items-center lg:flex-row lg:items-start ">
        <Section>
          {loadingTasks ? (
            <p className="text-xl text-gray-400 animate-pulse">
              Loading tasks...
            </p>
          ) : activeList ? (
            <Tasklist
              key={activeListId}
              tasks={activeList.tasks}
              activeList={activeList}
              onDelete={(id) => handleDeleteTask(id, activeListId)}
              onCheck={(id) => handleToggleCheck(id, activeListId)}
            />
          ) : (
            <p className="text-xl">No Task List Added yet.</p>
          )}
        </Section>

        <Section>
          <TaskForm
            onAddTask={(text) => handleAddTask(text, activeListId)}
            taskLists={taskLists}
          />
        </Section>
      </main>
    </>
  );
};

export default Home;
