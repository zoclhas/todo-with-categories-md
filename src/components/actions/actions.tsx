import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

type Theme = "light" | "dark";

export function ActionButtons() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme") as Theme;
        setTheme(currentTheme);

        if (currentTheme === theme) {
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

    return (
        <>
            <div className="fixed bottom-10 left-10 flex flex-col gap-4">
                <Sidebar />

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
        </>
    );
}
