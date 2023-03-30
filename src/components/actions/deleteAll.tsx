import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAll } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCancel } from "@fortawesome/free-solid-svg-icons";

export const DeleteAllButton = () => {
    const navigate = useNavigate();
    const [confirmPrompt, setConfirmPrompt] = useState<boolean>(false);

    const handleDelete = () => {
        deleteAll();
        navigate("/");
        setConfirmPrompt(false);
    };

    return (
        <div className="mt-6">
            {!confirmPrompt ? (
                <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full transition-all duration-300 ease-in"
                    onClick={() => setConfirmPrompt(true)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp;Delete All
                </button>
            ) : (
                <div
                    className="inline-flex rounded-lg shadow-sm w-full"
                    role="group"
                >
                    <button
                        type="button"
                        className="inline-flex items-center justify-center font-medium bg-red-700 hover:bg-red-800 border border-red-200 rounded-l-lg text-white focus:z-10 focus:ring-2 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:border-red-900 dark:text-white dark:hover:text-white dark:focus:text-white transition-all duration-300 ease-in w-1/2 text-sm px-5 py-2.5 h-[40px]"
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center font-medium bg-yellow-700 hover:bg-yellow-800 border border-yellow-200 rounded-r-lg text-white focus:z-10 focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900 dark:border-yellow-900 dark:text-white dark:hover:text-white dark:focus:text-white transition-all duration-300 ease-in w-1/2 text-sm px-5 py-2.5 h-[40px]"
                        onClick={() => setConfirmPrompt(false)}
                    >
                        <FontAwesomeIcon icon={faCancel} />
                    </button>
                </div>
            )}
        </div>
    );
};
