import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // GET REQUEST
  const getTasks = async () => {
    try {
      const response = await axios.get(
        "https://sql-todo-84vk.onrender.com/api/tasks"
      );
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      return error;
    }
  };

  // POST REQUEST
  const addTodo = async () => {
    try {
      if (value.trim() === "") {
        return;
      }
      const response = await axios.post(
        "https://sql-todo-84vk.onrender.com/api/tasks",
        {
          task: value,
          completed: completed,
        }
      );
      setTodos([...todos, response.data]);
      setValue("");
      setCompleted(false);
    } catch (error) {
      return error;
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (todo) => {
    try {
      const taskId = todo.id;
      await axios.delete(
        `https://sql-todo-84vk.onrender.com/api/tasks/${taskId}`
      );
      const todosWithId = todos.filter((task) => task.id !== taskId);
      setTodos(todosWithId);
    } catch (error) {
      return error;
    }
  };

  // CLEAR COMPLETED TASKS
  const deleteCompletedTasks = async () => {
    try {
      await axios.delete("https://sql-todo-84vk.onrender.com/api/tasks");

      await getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const countTasks = () => {
    const tasksLeft = todos.filter((todo) => !todo.length);
    return tasksLeft.length;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkMode");
      document.body.classList.remove("lightMode");
    } else {
      document.body.classList.remove("darkMode");
      document.body.classList.add("lightMode");
    }
  }, [isDarkMode]);

  const filteredTodos =
    activeTab === "All"
      ? todos
      : activeTab === "Active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);
  return (
    <>
      <div>
        <header>
          <div className="headerContent">
            <svg
              className="todoImage"
              width="109"
              height="20"
              viewBox="0 0 109 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="TODO 2">
                <path
                  id="TODO"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.0266 10.0266C25.0266 8.25354 25.4743 6.59575 26.3697 5.05319C27.2651 3.51063 28.4796 2.28281 30.0133 1.36968C31.547 0.456556 33.2092 0 35 0C36.7908 0 38.453 0.456556 39.9867 1.36968C41.5204 2.28281 42.7438 3.51063 43.6569 5.05319C44.57 6.59575 45.0266 8.25354 45.0266 10.0266C45.0266 11.8351 44.57 13.5018 43.6569 15.0266C42.7438 16.5514 41.5204 17.7615 39.9867 18.6569C38.453 19.5523 36.7908 20 35 20C33.1915 20 31.5248 19.5523 30 18.6569C28.4752 17.7615 27.2651 16.5514 26.3697 15.0266C25.4743 13.5018 25.0266 11.8351 25.0266 10.0266ZM13.1915 0.212766V3.93617H8.43085V19.7872H4.57447V3.93617H0V0.212766H13.1915ZM29.8271 13.1649C29.2863 12.2074 29.016 11.1614 29.016 10.0266C29.016 8.85638 29.2819 7.79256 29.8138 6.83511C30.3457 5.87766 31.0683 5.11968 31.9814 4.56117C32.8945 4.00266 33.9096 3.7234 35.0266 3.7234C36.1436 3.7234 37.1587 4.00266 38.0718 4.56117C38.9849 5.11968 39.7074 5.87766 40.2394 6.83511C40.7713 7.79256 41.0372 8.85638 41.0372 10.0266C41.0372 11.1791 40.7801 12.2296 40.266 13.1782C39.7518 14.1268 39.0426 14.8803 38.1383 15.4388C37.234 15.9973 36.2323 16.2766 35.133 16.2766C33.9982 16.2766 32.9654 15.9973 32.0346 15.4388C31.1037 14.8803 30.3679 14.1223 29.8271 13.1649ZM58.8564 0.212766H64.7075C67.2075 0.212766 69.2642 0.695917 70.8777 1.66223C72.4911 2.62855 73.6658 3.87854 74.4016 5.41223C75.1374 6.94593 75.5053 8.59042 75.5053 10.3457C75.5053 12.2252 75.0621 13.883 74.1755 15.3191C73.289 16.7553 72.0966 17.859 70.5984 18.6303C69.1002 19.4016 67.4557 19.7872 65.6649 19.7872H58.8564V0.212766ZM69.7606 14.5213C68.5904 15.5497 67.0036 16.0638 65 16.0638H62.7128V3.90957H65.8511C66.6135 3.90957 67.4246 4.08688 68.2846 4.44149C69.1445 4.7961 69.898 5.43439 70.5452 6.35638C71.1924 7.27837 71.516 8.5195 71.516 10.0798C71.516 12.0124 70.9309 13.4929 69.7606 14.5213ZM88.1383 10.0266C88.1383 8.25354 88.586 6.59575 89.4814 5.05319C90.3768 3.51063 91.5913 2.28281 93.125 1.36968C94.6587 0.456556 96.3209 0 98.1117 0C99.9025 0 101.565 0.456556 103.098 1.36968C104.632 2.28281 105.855 3.51063 106.769 5.05319C107.682 6.59575 108.138 8.25354 108.138 10.0266C108.138 11.8351 107.682 13.5018 106.769 15.0266C105.855 16.5514 104.632 17.7615 103.098 18.6569C101.565 19.5523 99.9025 20 98.1117 20C96.3032 20 94.6365 19.5523 93.1117 18.6569C91.5869 17.7615 90.3768 16.5514 89.4814 15.0266C88.586 13.5018 88.1383 11.8351 88.1383 10.0266ZM92.9255 6.83511C92.3936 7.79256 92.1277 8.85638 92.1277 10.0266C92.1277 11.1614 92.398 12.2074 92.9388 13.1649C93.4796 14.1223 94.2154 14.8803 95.1463 15.4388C96.0771 15.9973 97.1099 16.2766 98.2447 16.2766C99.344 16.2766 100.346 15.9973 101.25 15.4388C102.154 14.8803 102.863 14.1268 103.378 13.1782C103.892 12.2296 104.149 11.1791 104.149 10.0266C104.149 8.85638 103.883 7.79256 103.351 6.83511C102.819 5.87766 102.097 5.11968 101.184 4.56117C100.27 4.00266 99.2553 3.7234 98.1383 3.7234C97.0213 3.7234 96.0062 4.00266 95.0931 4.56117C94.18 5.11968 93.4575 5.87766 92.9255 6.83511Z"
                  fill="white"
                />
              </g>
            </svg>
            <button onClick={toggleDarkMode} className="iconMoon">
              <svg
                style={{ display: isDarkMode ? "none" : "block" }}
                className="iconMoon"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
              <svg
                style={{ display: isDarkMode ? "block" : "none" }}
                className="iconSun"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              background: isDarkMode ? "#25273D" : "",
              color: isDarkMode ? "#C8CBE7" : "",
            }}
            className="addTodo">
            <button
              onClick={() => {
                setCompleted(!completed);
              }}
              style={{
                background: completed
                  ? "linear-gradient(135deg, #5df 0%, #c058f3 100%)"
                  : "",
                border: isDarkMode ? "1px solid #393A4B" : "",
              }}
              className="checkButton">
              <svg
                style={{ display: completed ? "block" : "none" }}
                className="iconCheck"
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="9">
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  d="M1 4.304L3.696 7l6-6"
                />
              </svg>
            </button>
            <input
              style={{
                background: isDarkMode ? "#25273D" : "",
                color: isDarkMode ? "#C8CBE7" : "",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                  setValue("");
                  setCompleted(false);
                }
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Create a new todo…"
              className="todoInput"
              type="text"
            />
          </div>
        </header>
        <section
          style={{ background: isDarkMode ? "#25273D" : "" }}
          className="todoContainer">
          <div className="taskContainer">
            {filteredTodos &&
              filteredTodos.map((todo) => (
                <div
                  style={{
                    color: isDarkMode ? "#C8CBE7" : "",
                    border: isDarkMode ? "1px solid #393A4B" : "",
                  }}
                  key={todo.id}
                  className="task">
                  <div className="taskLeft">
                    <button
                      style={{ border: isDarkMode ? "1px solid #393A4B" : "" }}
                      onClick={async () => {
                        const updatedTodos = todos.map((task) => {
                          if (task.id === todo.id) {
                            return {
                              ...task,
                              completed: !task.completed,
                            };
                          }
                          return task;
                        });
                        setTodos(updatedTodos);
                        try {
                          await axios.put(
                            `https://sql-todo-84vk.onrender.com/api/tasks/${todo.id}`,
                            {
                              completed: !todo.completed,
                            }
                          );
                        } catch (error) {
                          console.error(
                            "Error updating task completion on the server:",
                            error
                          );
                        }
                      }}
                      className={`checkButton ${
                        todo.completed ? "toggled" : ""
                      }`}>
                      <svg
                        style={{ display: todo.completed ? "block" : "none" }}
                        className="iconCheck"
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9">
                        <path
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    </button>
                    <div
                      style={{
                        textDecoration: todo.completed ? "line-through" : "",
                        textDecorationColor: todo.completed
                          ? isDarkMode
                            ? "#4D5067"
                            : "#D1D2DA"
                          : "",
                        color: todo.completed
                          ? isDarkMode
                            ? "#4D5067"
                            : "#D1D2DA"
                          : "",
                      }}
                      className="text">
                      {todo.task}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleDeleteTask(todo);
                      console.log("Task ID:", todo.id);
                    }}
                    className="deleteButton">
                    <svg
                      className="iconCross"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18">
                      <path
                        fill="#494C6B"
                        fillRule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          <div className="tool-container">
            <div
              style={{ background: isDarkMode ? "#25273D" : "" }}
              className="tools">
              <p
                style={{ color: isDarkMode ? "#5B5E7E" : "" }}
                className="taskCounter">
                {countTasks()} items left
              </p>
              <button
                onClick={() => {
                  deleteCompletedTasks();
                }}
                className="clearTasks"
                style={{
                  color: isDarkMode ? "#5B5E7E" : "",
                }}>
                Clear Completed
              </button>
            </div>
            <div
              style={{
                background: isDarkMode ? "#25273D" : "",
                color: isDarkMode ? "#5B5E7E" : "",
              }}
              className="tabs">
              <button
                className={activeTab === "All" ? "active" : ""}
                onClick={() => {
                  setActiveTab("All");
                }}>
                All
              </button>
              <button
                className={activeTab === "Active" ? "active" : ""}
                onClick={() => setActiveTab("Active")}>
                Active
              </button>
              <button
                className={activeTab === "Completed" ? "active" : ""}
                onClick={() => setActiveTab("Completed")}>
                Completed
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
