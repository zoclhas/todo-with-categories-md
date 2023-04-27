import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@fluentui/react-components";
import { Delete24Filled } from "@fluentui/react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";

import { deleteAll } from "../utils";

export const Delete = () => {
    const navigate = useNavigate();
    const [deletePrompt, setDeletePrompt] = useState<boolean>(false);

    if (deletePrompt) {
        return (
            <div className="flex gap-4">
                <Button
                    icon={<Delete24Filled />}
                    onClick={() => {
                        deleteAll();
                        setDeletePrompt(false);
                        navigate("/");
                    }}
                />
                <Button
                    icon={<FontAwesomeIcon icon={faCancel} />}
                    appearance="primary"
                    onClick={() => setDeletePrompt(false)}
                />
            </div>
        );
    }

    return (
        <Button icon={<Delete24Filled />} onClick={() => setDeletePrompt(true)}>
            Delete All
        </Button>
    );
};
