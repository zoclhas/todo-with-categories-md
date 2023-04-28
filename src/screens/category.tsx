import styles from "../styles/category.module.scss";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Markdown } from "../components/markdown/markdown";
import { Fade } from "react-reveal";
import { Button, Input, Textarea } from "@fluentui/react-components";
import {
    Add24Filled,
    Edit16Filled,
    Checkmark16Filled,
    Search24Filled,
} from "@fluentui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";

import {
    updateCategory,
    updateLastOpened,
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
} from "../components/utils";
import { Edit24Filled } from "@fluentui/react-icons/lib/fonts";

export default function Category() {
    const navigate = useNavigate();
    const category = useParams();
    const cat: string = String(category.cat);

    const [todos, setTodos] = useState([]);
    const [filterKeywords, setFilterKeywords] = useState("");
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [addTitle, setAddTitle] = useState<string>("");
    const [titleEditIndex, setTitleEditIndex] = useState<number>(-1);
    const [newTitle, setNewTitle] = useState<string>("");

    useEffect(() => {
        const todos = getTodos(cat);
        if (todos === "Category does not exist") {
            navigate("/");
        } else {
            setTodos(todos);
            setFilterKeywords("");
            setFilteredTodos(todos);
            updateLastOpened(cat);
        }
    }, [cat]);

    // Todo Functions
    const createTodoHandler = () => {
        createTodo(cat, addTitle);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);
        setAddTitle("");
    };

    const deleteTodoHandler = (id: string) => {
        deleteTodo(cat, id);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);
    };

    const editTodoInitHandler = (index: number, title: string) => {
        setTitleEditIndex(index);
        setNewTitle(title);

        setTimeout(() => {
            const ta = document.getElementById(`edit-ta-${index}`)!;
            ta.focus();
            ta.style.height = ta.scrollHeight + "px";
        }, 1);
    };

    const updateTodoHandler = (id: string) => {
        console.log(id);
        updateTodo(cat, id, newTitle);
        setTodos(getTodos(cat));
        setTitleEditIndex(-1);
    };

    // Textarea Stuff

    const setTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    const handleKeyDown = (e: any, type: string, id?: string) => {
        if (e.keyCode === 9) {
            e.preventDefault();

            e.target.setRangeText(
                "\t",
                e.target.selectionStart,
                e.target.selectionStart,
                "end"
            );
        }

        if (e.key === "Enter") {
            if (e.shiftKey) {
                e.preventDefault();

                if (type === "add") {
                    if (addTitle.length > 0) {
                        createTodoHandler();
                    }
                } else if (type === "edit") {
                    updateTodoHandler(id as string);
                }
            }
        }
    };

    // Editing Category
    const [isEditing, setIsEditing] = useState(false);
    const [newCatName, setNewCatName] = useState<string>("");

    const editCatInitHandler = () => {
        setIsEditing(true);
        setNewCatName(cat);

        setTimeout(() => {
            const input = document.getElementById("edit-cat-input")!;
            input.focus();
        }, 1);
    };

    const editCatHandler = () => {
        updateCategory(cat, newCatName);
        setIsEditing(false);
        navigate(`/${newCatName}`);
    };

    // Filtering Todos
    useEffect(() => {
        if (todos.length > 0) {
            const keywords = filterKeywords.split(" ");
            const filteredTodo = todos.filter((item: any) => {
                return keywords.every((keyword) => {
                    return item.title
                        .toLowerCase()
                        .includes(keyword.toLowerCase());
                });
            });

            setFilteredTodos(filteredTodo);
        }
    }, [filterKeywords, todos]);

    const isNotEmpty = addTitle.length > 0 || filteredTodos.length > 0;

    return (
        <>
            <Helmet>
                <title>{cat}</title>
            </Helmet>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    {isEditing ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                editCatHandler();
                            }}
                        >
                            <Input
                                className="grow"
                                id="edit-cat-input"
                                size="large"
                                value={newCatName}
                                onChange={(e: any) =>
                                    setNewCatName(e.target.value)
                                }
                                onKeyDown={(e: any) => {
                                    if (e.key === "Enter") {
                                        if (e.shiftKey) {
                                            e.preventDefault();
                                            editCatHandler();
                                        }
                                    }
                                }}
                            />
                            <div className={styles.actions}>
                                <Button
                                    appearance="primary"
                                    type="submit"
                                    icon={<Edit16Filled />}
                                >
                                    Edit
                                </Button>
                                <Button
                                    appearance="outline"
                                    icon={<FontAwesomeIcon icon={faCancel} />}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1 className="font-bold text-4xl">{cat}</h1>
                            <Button
                                appearance="transparent"
                                icon={<Edit24Filled />}
                                onClick={editCatInitHandler}
                            />
                        </>
                    )}
                </div>

                <div className={styles.search}>
                    <Input
                        size="large"
                        placeholder="Search"
                        value={filterKeywords}
                        onChange={(e: any) => {
                            setFilterKeywords(e.target.value);
                        }}
                        contentBefore={<Search24Filled />}
                    />
                </div>

                <div className="h-16"></div>
                <form
                    className={styles["add-wrapper"]}
                    onSubmit={(e) => {
                        e.preventDefault();
                        createTodoHandler();
                    }}
                >
                    <Textarea
                        className="w-full"
                        value={addTitle}
                        onKeyDown={(e: any) => handleKeyDown(e, "add")}
                        onKeyUp={(e: any) => setTextareaHeight(e)}
                        onChange={(e: any) => {
                            setAddTitle(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        appearance="primary"
                        size="large"
                        icon={<Add24Filled />}
                    >
                        Add (Shift + Enter)
                    </Button>
                </form>
                <div className="h-16"></div>

                <Fade bottom cascade duration={500}>
                    {isNotEmpty && (
                        <ul className={styles.todos}>
                            {addTitle.length > 0 && (
                                <li>
                                    <article className="prose prose-lg prose-invert w-full max-w-none prose-p:m-0">
                                        <Markdown>{addTitle}</Markdown>
                                    </article>
                                </li>
                            )}
                            {filteredTodos.map((todo: any, i) => {
                                if (titleEditIndex === i) {
                                    return (
                                        <li key={todo.id}>
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    updateTodoHandler(todo.id);
                                                }}
                                            >
                                                <div
                                                    className={`${styles.actions} !mt-0`}
                                                >
                                                    <Button
                                                        size="small"
                                                        appearance="primary"
                                                        type="submit"
                                                        icon={<Edit16Filled />}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        appearance="outline"
                                                        icon={
                                                            <FontAwesomeIcon
                                                                icon={faCancel}
                                                            />
                                                        }
                                                        onClick={() =>
                                                            setTitleEditIndex(
                                                                -1
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                                <div className="p-4">
                                                    <Textarea
                                                        id={`edit-ta-${i}`}
                                                        className="w-full"
                                                        value={newTitle}
                                                        onKeyDown={(e: any) =>
                                                            handleKeyDown(
                                                                e,
                                                                "edit",
                                                                todo.id
                                                            )
                                                        }
                                                        onChange={(e: any) => {
                                                            setTextareaHeight(
                                                                e
                                                            );
                                                            setNewTitle(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </form>
                                            <div className="h-4"></div>
                                            <article className="prose prose-lg prose-invert w-full max-w-none prose-p:m-0">
                                                <Markdown>{newTitle}</Markdown>
                                            </article>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={todo.id}>
                                        <article className="prose prose-lg prose-invert w-full max-w-none prose-p:m-0">
                                            <Markdown>{todo.title}</Markdown>
                                        </article>

                                        <div className={styles.actions}>
                                            <Button
                                                size="small"
                                                appearance="outline"
                                                icon={<Edit16Filled />}
                                                onClick={() =>
                                                    editTodoInitHandler(
                                                        i,
                                                        todo.title
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="small"
                                                appearance="primary"
                                                icon={<Checkmark16Filled />}
                                                onClick={() =>
                                                    deleteTodoHandler(todo.id)
                                                }
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Fade>
            </div>
        </>
    );
}
