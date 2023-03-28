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
    const category = categoryList.find(
        (e: any) => e.cat.toLowerCase() === cat.toLowerCase()
    );

    if (!category) {
        return "Category does not exist";
    }

    return category.todo;
};

export const createTodo = (cat: string, title: string) => {
    const categoryList = JSON.parse(localStorage.getItem("todo") || "[]");
    const categoryIndex = categoryList.findIndex(
        (e: any) => e.cat.toLowerCase() === cat.toLowerCase()
    );

    if (categoryIndex === -1) {
        return "Category does not exist";
    }

    const todoList = categoryList[categoryIndex].todo;
    const newTodo = { id: Date.now().toString(), title };
    const updatedCategory = {
        ...categoryList[categoryIndex],
        todo: [...todoList, newTodo],
    };
    const updatedList = [
        ...categoryList.slice(0, categoryIndex),
        updatedCategory,
        ...categoryList.slice(categoryIndex + 1),
    ];

    localStorage.setItem("todo", JSON.stringify(updatedList));
};

export const deleteTodo = (cat: string, id: string) => {
    const categoryList = JSON.parse(localStorage.getItem("todo") || "[]");
    const categoryIndex = categoryList.findIndex(
        (e: any) => e.cat.toLowerCase() === cat.toLowerCase()
    );

    if (categoryIndex === -1) {
        return "Category does not exist";
    }

    const todoList = categoryList[categoryIndex].todo;
    const todoIndex = todoList.findIndex((e: any) => e.id === id);

    if (todoIndex === -1) {
        return "Todo item does not exist";
    }

    const updatedList = [
        ...categoryList.slice(0, categoryIndex),
        {
            ...categoryList[categoryIndex],
            todo: [
                ...todoList.slice(0, todoIndex),
                ...todoList.slice(todoIndex + 1),
            ],
        },
        ...categoryList.slice(categoryIndex + 1),
    ];

    localStorage.setItem("todo", JSON.stringify(updatedList));
};
