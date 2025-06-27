import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CTABar from "./components/CTABar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import TaskListModal from "./components/TaskListModal";

function App() {
  const [taskLists, setTaskLists] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("taskLists"));

    return saved || [];
  });

  const [activeListId, setActiveListId] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("activeListId"));
    return saved || null;
  });

  const [showModal, setShowModal] = useState(false);

  // probably temporary
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!isLoggedIn && <CTABar />}

              <Home
                activeList={activeList}
                activeListId={activeListId}
                handleAddTask={handleAddTask}
                handleToggleCheck={handleToggleCheck}
                handleDeleteTask={handleDeleteTask}
              />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </>
  );
}

export default App;
