export const sampleTodo = [
    {
        cat: "SubtlePBR",
        todo: [
            {
                id: "123213",
                title: "rocks",
            },
            {
                id: "12482233",
                title: "bulsdl",
            },
        ],
    },

    {
        cat: "Amulet",
        todo: [
            {
                id: "1232ddd13",
                title: "sadsd",
            },
            {
                id: "1248ggg2233",
                title: "gsdgd",
            },
        ],
    },
];

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
        console.log("created");
        return "Category already exists";
    }

    const newTodo = [...currentTodo, { cat: name, todo: [] }];
    localStorage.setItem("todo", JSON.stringify(newTodo));

    console.log("created");
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
