import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function NewList(props) {
    const [listName, setListName] = useState("");

    function addList(e) {
        e.preventDefault();
        // Datenbankaufruf

        const data = { Name: listName };

        axios
            .post("http://localhost:3001/api/v1/listen", data, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
                setListName("");
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    return (
        <Container
            className={"m-0 p-0 d-flex flex-row justify-content-between"}
        >
            <Form className={""}>
                <Form.Group className="mb-1 mt-1 " controlId="ListName">
                    <Form.Control
                        type="text"
                        placeholder="neue Liste hinzufügen"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => addList(e)}
                >
                    hinzufügen
                </Button>
            </Form>
        </Container>
    );
}

export default NewList;
