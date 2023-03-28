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

    return category.todo.reverse();
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

export const updateTodo = (cat: string, id: string, newTitle: string) => {
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
                {
                    ...todoList[todoIndex],
                    title: newTitle,
                },
                ...todoList.slice(todoIndex + 1),
            ],
        },
        ...categoryList.slice(categoryIndex + 1),
    ];

    localStorage.setItem("todo", JSON.stringify(updatedList));
};

export const exportData = () => {
    const data = JSON.parse(localStorage.getItem("todo") || "[]");
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.style.display = "none";
    downloadLink.download = "todo-app-export.json";
    downloadLink.href = url;
    downloadLink.click();
};

function checkUploadedData(data: any): boolean {
    if (!Array.isArray(data)) {
        console.log("Data must be an array.");
        return false;
    }
    for (const item of data) {
        if (!item || typeof item !== "object") {
            console.log("Invalid data item:", item);
            return false;
        }
        if (!("cat" in item) || typeof item["cat"] !== "string") {
            console.log("Invalid category:", item.cat);
            return false;
        }
        if (!("todo" in item) || !Array.isArray(item["todo"])) {
            console.log("Invalid todo list for category:", item.cat);
            return false;
        }
        for (const todoItem of item["todo"]) {
            if (!todoItem || typeof todoItem !== "object") {
                console.log(
                    "Invalid todo item for category:",
                    item.cat,
                    todoItem
                );
                return false;
            }
            if (!("id" in todoItem) || typeof todoItem["id"] !== "string") {
                console.log(
                    "Invalid todo item ID for category:",
                    item.cat,
                    todoItem.id
                );
                return false;
            }
            if (
                !("title" in todoItem) ||
                typeof todoItem["title"] !== "string"
            ) {
                console.log(
                    "Invalid todo item title for category:",
                    item.cat,
                    todoItem.title
                );
                return false;
            }
        }
    }
    return true;
}

export const importData = (
    file: File,
    callback: (success: boolean) => void
): void => {
    const reader = new FileReader();
    reader.onload = () => {
        const data = JSON.parse(reader.result as string);
        if (checkUploadedData(data)) {
            localStorage.setItem("todo", JSON.stringify(data));
            callback(true);
        } else {
            callback(false);
        }
    };
    reader.readAsText(file);
};
