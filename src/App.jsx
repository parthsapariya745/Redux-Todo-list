import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import 'remixicon/fonts/remixicon.css'

const App = () => {
  let [input, setInput] = useState("")
  let [index, setIndex] = useState(null)
  let [editInput, setEditInput] = useState("")

  let dispatch = useDispatch()
  let todos = useSelector(store => store.todos)

  let handleAdd = (e) => {
    e.preventDefault()
    if (input !== '') {
      dispatch({ type: 'AddTodo', payload: input })
      setInput("")
    } else {
      alert("Please Enter your task")
    }
  }

  let handleClearAll = () => {
    dispatch({ type: 'ClearTodo' })
  }

  let handleEdit = (i) => {
    setEditInput(todos[i])
    setIndex(i)
  }

  let handleSave = (i) => {
    setIndex(null)
    dispatch({ type: 'saveTodo', payload: {editValue: editInput, index: i} })
  }

  let handleDelete = (i) => {
    dispatch({ type: 'DeleteTodo', payload: i })
  }

  return (
    <div className="mx-auto px-6 pt-6 pb-8 bg-[#101727] rounded-[15px] shadow-md">
      <h1 className="text-2xl font-bold my-4 text-gray-100">Todo List</h1>
      <form className="flex space-x-2 mb-4">
        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Enter task..." className="py-2 px-3 w-[250px] border border-gray-700 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">Add</button>
        <button onClick={handleClearAll} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer">Clear All</button>
      </form>

      <ul className="space-y-3">
        {todos.map((e, i) => {
          return (
            <div key={i} className="flex items-center justify-between p-2.5 bg-gray-800 rounded-md">
              {index === i ? <input className="py-2 px-3 w-[240px] border border-gray-600 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(p) => setEditInput(p.target.value)} value={editInput} /> : <li className="flex-1 text-gray-100">{e}</li>}
              <div className="btn">
                <button className="ml-2 py-2 px-3 cursor-pointer text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400" aria-label="Edit" onClick={() => index === i ? handleSave(i) : handleEdit(i)}>
                  {index === i ? <i class="ri-save-fill text-[20px]"></i> : <i class="ri-edit-fill text-[20px]"></i>}
                </button>
                <button className="ml-2 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer" aria-label="Remove" onClick={() => handleDelete(i)}>
                  <i class="ri-delete-bin-fill text-[20px]"></i>
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  )
}
export default App