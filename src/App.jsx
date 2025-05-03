import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { Section } from "./components/Section";
import { Tasklist } from "./components/Tasklist";
import { TaskForm } from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Functions
  function handleAddTask(text) {
    setTasks([...tasks, { id: Date.now(), text, checked: false }]);
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleCheck(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  }

  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main className="p-10 h-[calc(100vh-5rem)]  text-3xl  flex flex-col-reverse justify-end items-center lg:flex-row lg:items-start ">
        <Section>
          <Tasklist
            tasks={tasks}
            onDelete={handleDelete}
            onCheck={handleToggleCheck}
          />
        </Section>

        <Section className="w-full md:w-3/4 lg:w-1/2 mx-16 my-8">
          <TaskForm onAddTask={handleAddTask} />
        </Section>
      </main>
    </>
  );
}

export default App;
