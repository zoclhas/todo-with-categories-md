import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getTodos, createTodo, deleteTodo } from "../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faTrash,
    faCheck,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function CategoryScreen() {
    const category = useParams();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(getTodos(category.name as string));
    }, []);

    // Todo functions
    const [title, setTitle] = useState<string>("");

    const handleCreateTodo = (cat: string, title: string) => {
        createTodo(cat, title);
        setTodos(getTodos(cat));
    };

    return (
        <section className="max-w-3xl px-4 pt-10" style={{ margin: "0 auto" }}>
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl w-full shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
                <h5>{category.name}</h5>
            </div>

            <form
                className="flex items-center my-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTodo(category.name as string, title);
                }}
            >
                <label htmlFor="add-todo" className="sr-only">
                    Add
                </label>
                <div className="relative w-full">
                    <input
                        type="text"
                        id="add-todo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                        placeholder="Add todo item"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ml-2 w-[41.6px] text-sm font-medium text-white bg-blue-700 rounded-2xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 opacity-90 transition-all duration-150 ease-in"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="sr-only">Add</span>
                </button>
            </form>

            {todos.length > 0 && (
                <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl w-full shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
                    <ul>
                        {todos.map((todo: any, index) => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
