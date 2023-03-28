import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getTodos } from "../utils";

export default function CategoryScreen() {
    const category = useParams();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(getTodos(category.name as string));
    }, []);

    console.log(todos);

    return (
        <section className="max-w-3xl px-4 pt-10" style={{ margin: "0 auto" }}>
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl w-full shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
                <h4>{category.name}</h4>
            </div>
        </section>
    );
}
