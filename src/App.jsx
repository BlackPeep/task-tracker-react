import { CheckCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function App() {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || [])
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Functions
  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputValue, checked: false },
      ]);
      console.log(tasks);
      setInputValue("");
    }
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleCheck(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) {
          return task;
        } else {
          return { ...task, checked: !task.checked };
        }
      })
    );
  }

  return (
    <>
      {/* navbar */}
      <nav className=" bg-indigo-950 relative flex justify-between lg:justify-center items-center px-10  h-20">
        <h1 className="text-3xl text-white font-bold">Task Tracker</h1>
      </nav>

      {/* main content */}
      <main className="p-10 h-[calc(100vh-5rem)]  text-xl flex flex-col-reverse justify-end items-center lg:flex-row lg:items-start ">
        <section className="w-full md:w-3/4 lg:w-1/2 mx-16 my-8">
          <ul>
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.li
                  className="flex justify-between items-center my-5"
                  key={task.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="max-w-3/4 break-words">{task.text}</span>
                  <div className="flex ">
                    <CheckCircleIcon
                      className={`size-5 me-3 cursor-pointer ${
                        task.checked ? "text-green-500" : "text-red-500"
                      }`}
                      onClick={() => handleCheck(task.id)}
                    />

                    <TrashIcon
                      className="size-5 cursor-pointer"
                      onClick={() => handleDelete(task.id)}
                    />
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        <section className="w-full md:w-3/4 lg:w-1/2 mx-16 my-8">
          <form action="/" className="flex flex-col ">
            <input
              placeholder="Enter your Task"
              className=" mb-4 p-1 outline-1 rounded-md"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="cursor-pointer bg-indigo-950 text-white rounded-md w-full sm:w-3/4 mx-auto p-1 hover:opacity-75 transition duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              Add Task
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
