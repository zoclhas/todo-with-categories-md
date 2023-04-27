import styles from "../styles/home.module.scss";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { getCategories, getLastOpened } from "../components/utils";

export default function Home() {
    const navigate = useNavigate();
    const categories = getCategories();
    const lastOpened = getLastOpened();

    useEffect(() => {
        const lastOpenedEnabled = localStorage.getItem(
            "lastOpenedEnabled" || "false"
        );
        const isEnabled = lastOpenedEnabled === "true" ? true : false;

        if (categories.length > 0) {
            if (lastOpened && isEnabled) {
                navigate(`/${lastOpened}`);
            } else {
                navigate(`/${categories[0]}`);
            }
        }
    }, [categories]);

    return (
        <section className={styles.container}>
            <svg
                className={styles.arrow}
                fill="#fff"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M25.866 23.2a2.667 2.667 0 1 0-3.733-3.733L8.8 32.8a2.667 2.667 0 0 0 0 3.733l13.334 13.334a2.667 2.667 0 1 0 3.76-3.733l-8.8-8.8h17.573A21.334 21.334 0 0 0 56 16.667V16a2.667 2.667 0 1 0-5.333 0 16 16 0 0 1-15.414 16h-18.16l8.8-8.8Z" />
            </svg>
            <h1 className="text-4xl">
                Click on the <FontAwesomeIcon icon={faBars} /> to get started.
            </h1>
        </section>
    );
}
