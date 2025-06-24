import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { Section } from "./components/Section";
import { Tasklist } from "./components/Tasklist";
import { TaskForm } from "./components/TaskForm";
import TaskListModal from "./components/TaskListModal";

function App() {
  const [taskLists, setTaskLists] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("taskLists"));

    return saved || [];
  });

  const [showModal, setShowModal] = useState(false);

  const [activeListId, setActiveListId] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("activeListId"));
    return saved || null;
  });

  const activeList = taskLists.find((list) => list.id === activeListId);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  useEffect(() => {
    localStorage.setItem("activeListId", JSON.stringify(activeListId));
  }, [activeListId]);

  // Functions
  function handleAddTask(text) {
    const newTask = { id: Date.now(), text, checked: false };

    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeList.id
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  }

  function handleDeleteTask(id) {
    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeList.id
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
          : list
      )
    );
  }

  function handleToggleCheck(id) {
    setTaskLists((prevList) =>
      prevList.map((list) =>
        list.id === activeList.id
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === id ? { ...task, checked: !task.checked } : task
              ),
            }
          : list
      )
    );
  }

  function handleCreateList(name) {
    const newList = {
      id: Date.now(),
      name,
      tasks: [],
    };

    setTaskLists([...taskLists, newList]);
    setActiveListId(newList.id);
  }

  function handleSelectList(id) {
    setActiveListId(id);
  }

  function handleDeleteList(id) {
    const updatedTaskLists = taskLists.filter((list) => list.id !== id);

    setTaskLists(updatedTaskLists);

    if (activeListId === id) {
      if (updatedTaskLists.length > 0) {
        setActiveListId(updatedTaskLists[0].id);
      } else {
        setActiveListId(null);
      }
    }
  }

  return (
    <>
      {/* navbar */}
      <Navbar
        taskLists={taskLists}
        handleSelectList={handleSelectList}
        onAddListClick={() => setShowModal(true)}
        activeListId={activeListId}
        onDeleteList={handleDeleteList}
      />

      {showModal && (
        <TaskListModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateList}
        />
      )}

      {/* main content */}
      <main className="p-10 h-[calc(100vh-5rem)]  text-3xl  flex flex-col-reverse justify-end items-center lg:flex-row lg:items-start ">
        <Section>
          {activeList ? (
            <Tasklist
              key={activeListId}
              tasks={activeList.tasks}
              activeList={activeList}
              handleDeleteList={handleDeleteList}
              onDelete={(id) => handleDeleteTask(id, activeListId)}
              onCheck={(id) => handleToggleCheck(id, activeListId)}
            />
          ) : (
            <p className="text-xl">No Task List Added yet.</p>
          )}
        </Section>

        <Section>
          <TaskForm onAddTask={(text) => handleAddTask(text, activeListId)} />
        </Section>
      </main>
    </>
  );
}

export default App;
