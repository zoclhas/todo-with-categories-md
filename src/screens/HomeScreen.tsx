import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Sidebar } from "../components/actions/sidebar";
import { getCategories } from "../utils";

export default function HomeScreen() {
    const navigate = useNavigate();
    const categories = getCategories();

    useEffect(() => {
        if (categories.length > 0) {
            navigate(`/${categories[0]}`);
        }
    }, [categories]);

    return (
        <section className="min-h-screen grid place-items-center px-4">
            <h4 className="flex items-center gap-3 max-md:flex-col max-md:text-center">
                Click on the
                <Sidebar /> to create a new category.
            </h4>
        </section>
    );
}
