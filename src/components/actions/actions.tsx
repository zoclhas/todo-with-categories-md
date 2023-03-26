import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSun,
    faMoon,
    faListUl,
} from "@fortawesome/free-solid-svg-icons";

type Theme = "light" | "dark";

export function ActionButtons() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme") as Theme;
        setTheme(currentTheme);

        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };

    const toggleSidebar = () => {
        const sidebar = document.getElementById("default-sidebar")!;
        const backdrop = document.getElementById("drawer-backdrop")!;

        sidebar.classList.toggle("show");

        if (sidebar.classList.contains("show")) {
            backdrop.classList.add("show");
        } else {
            backdrop.classList.remove("show");
        }
    };

    const removeBackdrop = () => {
        document.getElementById("drawer-backdrop")!.classList.remove("show");
        toggleSidebar();
    };

    return (
        <>
            <div className="fixed bottom-10 left-10 flex flex-col gap-4">
                <button
                    type="button"
                    className="bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5  h-[34px] aspect-square flex items-center justify-center transition-all duration-300 ease-in"
                    onClick={toggleSidebar}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <button
                    id="theme-toggle"
                    type="button"
                    className="bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5  h-[34px] aspect-square flex items-center justify-center transition-all duration-300 ease-in"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? (
                        <FontAwesomeIcon icon={faSun} />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} />
                    )}
                </button>
            </div>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-tr-3xl rounded-br-3xl">
                    <h6
                        id="drawer-categories-label"
                        className="flex items-center mb-4 text-lg font-semibold text-gray-500 dark:text-gray-400"
                    >
                        <FontAwesomeIcon
                            icon={faListUl}
                            style={{ transform: "translateY(1px)" }}
                        />
                        &nbsp;Categories
                    </h6>
                    <button
                        id="drawer-hide-button"
                        type="button"
                        aria-controls="drawer-cat"
                        onClick={toggleSidebar}
                        className="text-gray-600 bg-transparent bg-slate-400 opacity-60 hover:text-gray-900 rounded-full text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:text-slate-100 dark:bg-gray-600 dark:hover:text-slate-300 dark:opacity-100 transition-colors duration-150 ease-in"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in"
                            >
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div
                id="drawer-backdrop"
                className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30"
                onClick={removeBackdrop}
            ></div>
        </>
    );
}
