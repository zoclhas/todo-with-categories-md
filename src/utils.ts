// Categories

export const getCategories = () => {
    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");
    return currentTodo.map((e: any) => e.cat);
};

export const createCategory = (name: string) => {
    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");
    const categoryExists = currentTodo.some(
        (e: any) => e.cat.toLowerCase() === name.toLowerCase()
    );

    if (categoryExists) {
        return "Category already exists";
    }

    const newTodo = [...currentTodo, { cat: name, todo: [] }];
    localStorage.setItem("todo", JSON.stringify(newTodo));
};

export const deleteCategory = (name: string) => {
    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");
    const newTodo = currentTodo.filter(
        (e: any) => e.cat.toLowerCase() !== name.toLowerCase()
    );
    localStorage.setItem("todo", JSON.stringify(newTodo));
};

export const updateCategory = (oldName: string, newName: string) => {
    console.log(oldName, newName);
    const currentTodo = JSON.parse(localStorage.getItem("todo") || "[]");
    const updatedTodo = currentTodo.map((e: any) => {
        if (e.cat.toLowerCase() === oldName.toLowerCase()) {
            return { ...e, cat: newName };
        }
        return e;
    });
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
};

// Todo in Category

export const getTodos = (cat: string) => {
    const categoryList = JSON.parse(localStorage.getItem("todo") || "[]");
    return (
        categoryList.filter(
            (e: any) => e.cat.toLowerCase() === cat.toLowerCase()
        )[0].todos || []
    );
};
