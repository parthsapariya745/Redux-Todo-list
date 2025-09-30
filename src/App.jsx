import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos);

  const handleAdd = (e) => {
    e.preventDefault();
    if (input !== "") {
      dispatch({ type: "AddTodo", payload: input });
      setInput("");
    } else {
      alert("Please Enter your task");
    }
  };
  const handleClearAll = () => {
    dispatch({ type: "ClearTodo" });
  };
  const handleEdit = (i) => {
    setEditInput(todos[i]);
    setIndex(i);
  };
  const handleSave = () => {
    dispatch({ type: "saveTodo", index: index, editValue: editInput });
    setIndex(null);
  };
  const handleDelete = (i) => {
    dispatch({ type: "DeleteTodo", payload: i });
  };

  return (
    <div className="todo-box mx-auto px-6 pt-6 pb-8 bg-[#101727] rounded-[15px] shadow-md">
      <h1 className="text-2xl font-bold my-4 text-gray-100">Todo List</h1>
      <form className="flex space-x-2 mb-4">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter task..."
          className="py-2 px-3 w-[250px] border border-gray-700 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          Add
        </button>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
        >
          Clear All
        </button>
      </form>

      <ul className="space-y-3">
        {todos.map((e, i) => {
          return (
            <div
              key={i}
              className="list-show gap-[15px] flex items-center justify-between p-2.5 bg-gray-800 rounded-md"
            >
              {index === i ? (
                <input
                  type="text"
                  onChange={(p) => setEditInput(p.target.value)}
                  value={editInput}
                  className="py-2 px-3 w-[240px] border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <li className="flex-1 text-gray-100">{e}</li>
              )}
              <div className="btn">
                <button
                  onClick={() => (index === i ? handleSave() : handleEdit(i))}
                  className="ml-2 py-2 px-3 cursor-pointer text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
                  aria-label="Edit"
                >
                  {index === i ? 
                    <i class="ri-save-fill text-[20px]"></i>
                  : 
                    <i class="ri-edit-fill text-[20px]"></i>
                  }
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="ml-2 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                  aria-label="Remove"
                >
                  <i class="ri-delete-bin-fill text-[20px]"></i>
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default App;