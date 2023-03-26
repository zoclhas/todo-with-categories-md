import { useState, useEffect } from "react";
import { Drawer } from "flowbite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faSun,
    faMoon,
    faListUl,
} from "@fortawesome/free-solid-svg-icons";

export function ActionButtons() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
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

    const $targetEl = document.getElementById("drawer-categories");
    var drawer;
    if ($targetEl !== null) {
        var drawer = new Drawer($targetEl);
        drawer.hide();
    }

    return (
        <>
            <div className="fixed bottom-10 left-10 flex flex-col gap-4">
                <button
                    type="button"
                    onClick={() => drawer.toggle()}
                    className="bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5  h-[34px] aspect-square flex items-center justify-center transition-all duration-300 ease-in"
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

            <div
                id="drawer-categories"
                className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800"
                tabindex="-1"
                aria-labelledby="drawer-categories-label"
            >
                <h5
                    id="drawer-categories-label"
                    className="flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                >
                    <FontAwesomeIcon
                        icon={faListUl}
                        style={{ transform: "translateY(1px)" }}
                    />
                    &nbsp;Categories
                </h5>
                <button
                    id="drawer-hide-button"
                    type="button"
                    aria-controls="drawer-cat"
                    onClick={() => drawer.toggle()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            </div>
        </>
    );
}
