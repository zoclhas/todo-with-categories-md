import styles from "./sidebar.module.scss";

import { createPortal } from "react-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
    Button,
    Switch,
    Card,
    CardHeader,
    Input,
} from "@fluentui/react-components";
import {
    AppsList24Filled,
    ArrowImport24Filled,
    ArrowExportLtr24Filled,
    Delete24Filled,
} from "@fluentui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    exportData,
} from "../utils";

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Action States
    const [isOpen, setIsOpen] = useState(true);
    const [isLastOpenedChecked, setIsLastOpenedChecked] = useState(true);

    // Category States
    const [categories, setCategories] = useState([]);
    const [catName, setCatName] = useState<string>("");
    const [editInput, setEditInput] = useState<number>(-1);
    const [newCatName, setNewCatName] = useState<string>("");

    useEffect(() => {
        setCategories(getCategories());
    }, [location]);

    const createCategoryHandler = () => {
        createCategory(catName);
        setCategories(getCategories());
        setEditInput(-1);

        navigate(`/${catName}`);

        const createInput = document.getElementById(
            "create-input"
        )! as HTMLInputElement;
        createInput.value = "";
        // createInput.blur();
    };

    return (
        <>
            <aside className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.info}>
                        <AppsList24Filled />{" "}
                        <h4 className="text-xl">Categories</h4>
                    </div>

                    <div className={styles.close}>
                        <Button
                            appearance="primary"
                            onClick={() => setIsOpen(false)}
                            icon={<FontAwesomeIcon icon={faXmark} />}
                        />
                    </div>
                </div>

                <div className={styles.categories}>
                    <ul>
                        {categories.map((cat, i) => {
                            if (i !== editInput) {
                                return (
                                    <li key={i}>
                                        <Link to={`/${cat}`}>
                                            <Card
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(`/${cat}`);
                                                }}
                                            >
                                                <CardHeader
                                                    className={
                                                        styles[
                                                            "cat-list-item-header"
                                                        ]
                                                    }
                                                    header={<h1>{cat}</h1>}
                                                />
                                            </Card>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>

                    <form
                        className={styles.add}
                        onSubmit={(e) => {
                            e.preventDefault();
                            createCategoryHandler();
                        }}
                    >
                        <Input
                            id="create-input"
                            placeholder="Add Category"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCatName(e.currentTarget.value)
                            }
                        />
                        <Button
                            type="submit"
                            appearance="primary"
                            size="large"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                        />
                    </form>
                </div>

                <div className={styles.footer}>
                    <Button icon={<ArrowImport24Filled />}>Import Data</Button>
                    <Button icon={<ArrowExportLtr24Filled />}>
                        Export Data
                    </Button>
                    <div className={styles.actions}>
                        <Switch
                            label="Last Opened"
                            checked={isLastOpenedChecked}
                            onChange={() =>
                                setIsLastOpenedChecked(!isLastOpenedChecked)
                            }
                        />
                        <Button icon={<Delete24Filled />}>Delete All</Button>
                    </div>
                </div>
            </aside>

            {createPortal(
                <>
                    {isOpen && (
                        <div
                            className={styles.backdrop}
                            onClick={() => setIsOpen(false)}
                        ></div>
                    )}
                </>,
                document.body
            )}
        </>
    );
};
