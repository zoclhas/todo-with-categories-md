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
    Add24Filled,
    Edit24Filled,
    Checkmark24Filled,
} from "@fluentui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faXmark } from "@fortawesome/free-solid-svg-icons";

import {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    // exportData,
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
    const [addCatValue, setAddCatValue] = useState<string>("");
    const [editInput, setEditInput] = useState<number>(-1);
    const [newCatName, setNewCatName] = useState<string>("");

    useEffect(() => {
        setCategories(getCategories());
    }, [location]);

    const navigateToPage = (target: string, cat: string) => {
        const ignoredTags = new Set(["BUTTON", "svg", "path"]);

        if (!ignoredTags.has(target)) {
            navigate(`/${cat}`);
        }
    };

    const createCategoryHandler = () => {
        if (catName.length > 0) {
            createCategory(catName);
            setCategories(getCategories());
            setEditInput(-1);

            navigate(`/${catName}`);

            setCatName("");
            setAddCatValue("");
            (
                document.getElementById("create-input")! as HTMLInputElement
            ).blur();
        }
    };

    const deleteCatHandler = (cat: string) => {
        deleteCategory(cat);
        setCategories(getCategories());
        setEditInput(-1);

        navigate("/");
    };

    const editCatInitHandler = (cat: string, index: number) => {
        setEditInput(index);
        setNewCatName(cat);

        setTimeout(() => {
            (
                document.getElementById(`${cat}-input`)! as HTMLInputElement
            ).focus();
        }, 1);
    };

    const updateCatHandler = (oldName: string) => {
        updateCategory(oldName, newCatName);
        setCategories(getCategories());
        setCatName("");
        setEditInput(-1);

        navigate(`/${newCatName}`);
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
                            if (i === editInput) {
                                return (
                                    <li key={i}>
                                        <Card id={cat}>
                                            <CardHeader
                                                header={
                                                    <form
                                                        className={
                                                            styles["edit-cat"]
                                                        }
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            updateCatHandler(
                                                                cat
                                                            );
                                                        }}
                                                    >
                                                        <Input
                                                            size="small"
                                                            style={{
                                                                flexGrow: "1",
                                                            }}
                                                            id={`${cat}-input`}
                                                            value={newCatName}
                                                            onChange={(e) =>
                                                                setNewCatName(
                                                                    e
                                                                        .currentTarget
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                styles.actions
                                                            }
                                                        >
                                                            <Button
                                                                appearance="subtle"
                                                                type="submit"
                                                                icon={
                                                                    <Checkmark24Filled />
                                                                }
                                                            />
                                                            <Button
                                                                appearance="subtle"
                                                                onClick={() => {
                                                                    setEditInput(
                                                                        -1
                                                                    );
                                                                    setCatName(
                                                                        ""
                                                                    );
                                                                }}
                                                                icon={
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faCancel
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        </div>
                                                    </form>
                                                }
                                            />
                                        </Card>
                                    </li>
                                );
                            }

                            return (
                                <li key={i}>
                                    <Link to={`/${cat}`}>
                                        <Card
                                            id={cat}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const { tagName } =
                                                    e.target as HTMLElement;

                                                navigateToPage(tagName, cat);
                                            }}
                                        >
                                            <CardHeader
                                                header={
                                                    <div className={styles.cat}>
                                                        <h1>{cat}</h1>

                                                        <div
                                                            className={
                                                                styles.actions
                                                            }
                                                        >
                                                            <Button
                                                                appearance="subtle"
                                                                onClick={() => {
                                                                    editCatInitHandler(
                                                                        cat,
                                                                        i
                                                                    );
                                                                }}
                                                                icon={
                                                                    <Edit24Filled />
                                                                }
                                                            />
                                                            <Button
                                                                appearance="subtle"
                                                                onClick={() =>
                                                                    deleteCatHandler(
                                                                        cat
                                                                    )
                                                                }
                                                                icon={
                                                                    <Delete24Filled />
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Link>
                                </li>
                            );
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
                            value={addCatValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setCatName(e.currentTarget.value);
                                setAddCatValue(e.currentTarget.value);
                            }}
                        />
                        <Button
                            type="submit"
                            appearance="primary"
                            size="large"
                            icon={<Add24Filled />}
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
