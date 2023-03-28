import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTodos, createTodo, deleteTodo, updateTodo } from "../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPenToSquare,
    faCheck,
    faXmark,
    faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function CategoryScreen() {
    const category = useParams();
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const todos = getTodos(category.name as string);
        if (todos === "Category does not exist") {
            navigate("/");
        } else {
            setTodos(todos);
        }
    }, [category]);

    // Todo functions
    const [title, setTitle] = useState<string>("");
    const [titleEditIndex, setTitleEditIndex] = useState<number>(-1);
    const [newTitle, setNewTitle] = useState<string>("");

    const handleCreateTodo = (cat: string, title: string) => {
        createTodo(cat, title);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);

        (document.getElementById("add-todo")! as HTMLInputElement).value = "";
    };

    const handleDeleteTodo = (cat: string, id: string) => {
        deleteTodo(cat, id);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);
    };

    const editTodo = (index: number, title: string) => {
        setTitleEditIndex(index);

        setTimeout(() => {
            (
                document.getElementById(
                    `edit-todo-${index}`
                )! as HTMLInputElement
            ).value = title;
            (
                document.getElementById(
                    `edit-todo-${index}`
                )! as HTMLInputElement
            ).focus();
            setNewTitle(title);
        }, 1);
    };

    const handleUpdateTodo = (cat: string, id: string, newTitle: string) => {
        updateTodo(cat, id, newTitle);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);
    };

    return (
        <section className="max-w-3xl px-4 pt-10" style={{ margin: "0 auto" }}>
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl w-full shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
                <h5>{category.name}</h5>
            </div>

            <form
                className="flex items-center my-8 relative z-[1]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateTodo(category.name as string, title);
                }}
            >
                <label htmlFor="add-todo" className="sr-only">
                    Add
                </label>
                <div className="relative w-full z-0">
                    <input
                        type="text"
                        id="add-todo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none z-0"
                        placeholder="Add todo item"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ml-2 w-[41.6px] text-sm font-medium text-white bg-blue-700 rounded-2xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 opacity-90 transition-all duration-150 ease-in z-0"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="sr-only">Add</span>
                </button>
            </form>

            {todos && todos.length > 0 && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl w-full shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
                    <ul>
                        {todos.map((todo: any, index) => (
                            <li
                                key={todo.id}
                                className="m-4 p-3 bg-blue-200 dark:bg-slate-700 rounded-xl flex gap-4 justify-between"
                            >
                                {titleEditIndex === index ? (
                                    <form
                                        className="grow flex gap-4 justify-between"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleUpdateTodo(
                                                category.name as string,
                                                todo.id,
                                                newTitle
                                            );
                                        }}
                                    >
                                        <input
                                            id={`edit-todo-${index}`}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none z-0"
                                            placeholder={todo.title}
                                            onChange={(e) =>
                                                setNewTitle(e.target.value)
                                            }
                                        />
                                        <span className="ml-10 mr-3 flex justify-end gap-6 text-slate-400">
                                            <button type="submit">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="hover:text-black dark:hover:text-white transition-colors duration-150 ease-in"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setTitleEditIndex(-1)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="hover:text-black dark:hover:text-white transition-colors duration-150 ease-in"
                                                />
                                            </button>
                                        </span>
                                    </form>
                                ) : (
                                    <>
                                        {todo.title}
                                        <span className="ml-10 mr-3 flex justify-end gap-6 text-slate-400">
                                            <button
                                                onClick={() =>
                                                    editTodo(index, todo.title)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    className="hover:text-black dark:hover:text-white transition-colors duration-150 ease-in"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteTodo(
                                                        category.name as string,
                                                        todo.id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSquareCheck}
                                                    className="hover:text-black dark:hover:text-white transition-colors duration-150 ease-in"
                                                />
                                            </button>
                                        </span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
