"use client";

import { useEffect, useState } from "react";

type Todo = {
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");



  // Add todo with Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // Toggle completed
  const toggleTodo = (index: number) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear completed
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-widest text-gray-800 dark:text-white">
            TODO
          </h1>
        </div>

        {/* Input */}
        <div className="mb-4 flex items-center rounded-lg bg-gray-100 p-3 shadow-sm dark:bg-gray-700">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Create a new TODO..."
            className="w-full bg-transparent text-gray-800 outline-none dark:text-gray-200"
          />
        </div>

        {/* Todo List */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-600">
          {filteredTodos.length === 0 ? (
            <p className="py-4 text-center text-gray-400 italic">
              No todos yet...
            </p>
          ) : (
            filteredTodos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center gap-3 py-3 text-gray-700 dark:text-gray-200"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="h-5 w-5 cursor-pointer rounded-full border-2 border-gray-400 checked:bg-gradient-to-r checked:from-blue-400 checked:to-purple-500"
                />
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(index)}
                  className="text-red-500 hover:scale-110"
                >
                  ✖
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-300">
          <span>{todos.filter((t) => !t.completed).length} items left</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`hover:text-blue-500 ${
                filter === "all" ? "font-semibold text-blue-500" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`hover:text-blue-500 ${
                filter === "active" ? "font-semibold text-blue-500" : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`hover:text-blue-500 ${
                filter === "completed" ? "font-semibold text-blue-500" : ""
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="hover:text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}