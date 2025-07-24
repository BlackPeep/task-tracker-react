import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CTABar from "./components/CTABar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import TaskListModal from "./components/TaskListModal";
import UserBar from "./components/UserBar";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const API_URL = "https://task-tracker-react-426p.onrender.com/";
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const [taskLists, setTaskLists] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("taskLists"));
    return saved || [];
  });

  const [activeListId, setActiveListId] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("activeListId"));
    return saved || null;
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const activeList = taskLists.find((list) => list.id === activeListId);

  //Get lists
  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetch(`${API_URL}api/taskLists/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((listsFromDb) => {
          const normalized = listsFromDb.map((list) => ({
            ...list,
            id: list._id,
            tasks: list.tasks.map((task) => ({
              ...task,
              id: task._id,
            })),
          }));
          setTaskLists(normalized);

          //if no activelistId or current activelistId is not in fetched lists, set default

          if (
            !activeListId ||
            !normalized.some((list) => list.id === activeListId)
          ) {
            setActiveListId(normalized.length > 0 ? normalized[0].id : null);
          }
        })
        .catch((err) => console.error("failed to fetch tasklists", err))
        .finally(() => {
          setLoading(false);
        });
    } else {
      const saved = JSON.parse(localStorage.getItem("taskLists"));
      setTaskLists(saved || []);
      const savedActiveListId = JSON.parse(
        localStorage.getItem("activeListId")
      );
      setActiveListId(savedActiveListId || null);
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }, [taskLists]);

  useEffect(() => {
    localStorage.setItem("activeListId", JSON.stringify(activeListId));
  }, [activeListId]);

  // Functions
  function handleAddTask(text) {
    const tempId = Date.now();
    const newTask = {
      id: tempId, //used for react rendering
      _id: null, //used for db reference and is set on api response
      title: text,
      completed: false,
    };

    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeList.id
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );

    if (isLoggedIn) {
      const { _id, ...taskToSend } = newTask;

      fetch(`${API_URL}api/taskLists/${activeListId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskToSend),
      })
        .then((res) => res.json())
        .then((data) => {
          setTaskLists((prev) =>
            prev.map((list) =>
              list.id === activeListId
                ? {
                    ...list,
                    tasks: list.tasks.map((task) =>
                      task.id === tempId ? { ...task, _id: data._id } : task
                    ),
                  }
                : list
            )
          );
        })
        .catch((err) => {
          console.error("failed to sync to backend", err);
        });
    }
  }

  function handleDeleteTask(taskId) {
    const task = activeList.tasks.find((task) => task.id === taskId);

    setTaskLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeList.id
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );

    if (isLoggedIn) {
      fetch(`${API_URL}api/taskLists/${activeListId}/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error("failed to sync to backend", err);
      });
    }
  }

  function handleToggleCheck(taskId) {
    setTaskLists((prevLists) => {
      let updatedTask = null;

      const newLists = prevLists.map((list) => {
        if (list.id !== activeListId) return list;

        const newTasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            // match by frontend id
            updatedTask = { ...task, completed: !task.completed };
            return updatedTask;
          }
          return task;
        });

        return { ...list, tasks: newTasks };
      });

      if (isLoggedIn && updatedTask && updatedTask._id) {
        // only sync if backend id exists
        const { id, ...taskToSend } = updatedTask;

        fetch(
          `${API_URL}api/taskLists/${activeListId}/tasks/${updatedTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskToSend),
          }
        ).catch((err) => {
          console.error("failed to sync to backend", err);
        });
      }
      return newLists;
    });
  }

  function handleCreateList(name) {
    const tempId = Date.now();
    const newList = {
      id: tempId,
      name,
      tasks: [],
    };

    setTaskLists((prev) => [...prev, newList]);
    setActiveListId(tempId);

    if (isLoggedIn) {
      const { id, ...listToSend } = newList;

      fetch(`${API_URL}api/taskLists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listToSend),
      })
        .then((res) => res.json())
        .then((data) => {
          setTaskLists((prev) =>
            prev.map((list) =>
              list.id === tempId ? { ...list, id: data._id } : list
            )
          );
          setActiveListId(data._id);
        })
        .catch((err) => {
          console.error("failed to sync to backend", err);
        });
    }

    toast.success("Task List created");
  }

  function handleSelectList(id) {
    setActiveListId(id);
  }

  function handleDeleteList(id) {
    const updatedTaskLists = taskLists.filter((list) => list.id !== id);

    setTaskLists(updatedTaskLists);
    toast.success("List deleted");

    if (activeListId === id) {
      if (updatedTaskLists.length > 0) {
        setActiveListId(updatedTaskLists[0].id);
      } else {
        setActiveListId(null);
      }
    }

    if (isLoggedIn) {
      fetch(`${API_URL}api/taskLists/${activeListId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error("failed to sync to backend", err);
      });
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
              {isLoggedIn ? (
                <UserBar setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <CTABar />
              )}

              <Home
                loadingTasks={loading}
                activeList={activeList}
                activeListId={activeListId}
                handleAddTask={handleAddTask}
                handleToggleCheck={handleToggleCheck}
                handleDeleteTask={handleDeleteTask}
                taskLists={taskLists}
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
