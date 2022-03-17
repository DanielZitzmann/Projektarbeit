import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function NewArtikel(props) {
    const [ArtikelName, setArtikelName] = useState("");

    function addArtikel(e) {
        e.preventDefault();
        // Datenbankaufruf

        const data = { Bezeichnung: ArtikelName };

        axios
            .post("http://localhost:3001/api/v1/artikel", data, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
                setArtikelName("");
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
                <Form.Group className="mb-1 mt-1 " controlId="ArtikelName">
                    <Form.Control
                        type="text"
                        placeholder="neuen Artikel hinzufügen"
                        value={ArtikelName}
                        onChange={(e) => setArtikelName(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => addArtikel(e)}
                >
                    hinzufügen
                </Button>
            </Form>
        </Container>
    );
}

export default NewArtikel;

// TODO TAGS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
