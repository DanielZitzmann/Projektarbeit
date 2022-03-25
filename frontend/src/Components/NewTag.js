import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function NewTag(props) {
    const [tagName, setTagName] = useState("");

    function addTag(e) {
        e.preventDefault();
        // Datenbankaufruf

        const data = { TagName: tagName };

        axios
            .post(`http://${process.env.REACT_APP_IP}:3001/api/v1/tags`, data, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
                setTagName("");
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
                <Form.Group className="mb-1 mt-1 " controlId="TagName">
                    <Form.Control
                        type="text"
                        placeholder="neuen Tag hinzufügen"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => addTag(e)}
                >
                    hinzufügen
                </Button>
            </Form>
        </Container>
    );
}

export default NewTag;
