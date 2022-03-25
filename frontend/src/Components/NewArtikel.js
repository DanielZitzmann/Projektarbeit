import React, { useState, useEffect } from "react";
import { Form, Button, Container, Badge } from "react-bootstrap";
import axios from "axios";

function NewArtikel(props) {
    const [ArtikelName, setArtikelName] = useState("");
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagName, setTagName] = useState("");
    const [tagAdded, setTagAdded] = useState({});

    function addArtikel(e) {
        e.preventDefault();
        // Datenbankaufruf

        const data = { Bezeichnung: ArtikelName, Tags: selectedTags };

        axios
            .post("http://localhost:3001/api/v1/artikel", data, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
                setArtikelName("");
                setSelectedTags([]);
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/v1/tags", {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res.data);
                setAvailableTags(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [tagAdded]);

    function addTag(e) {
        e.preventDefault();
        // Datenbankaufruf

        const data = { TagName: tagName };

        axios
            .post("http://localhost:3001/api/v1/tags", data, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
                setTagName("");
                setTagAdded(res);
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    function editSelectedTags(e) {
        e.preventDefault();
        let clickedTagName = e.target.firstChild.data;
        console.log(clickedTagName);
        // if !find in array
        if (selectedTags.includes(clickedTagName)) {
            //raushauen
            setSelectedTags(
                selectedTags.filter((item) => item !== clickedTagName)
            );
        } else setSelectedTags([...selectedTags, clickedTagName]);
    }

    function getTagBadgeColor(tag) {
        if (selectedTags.includes(tag)) return "info";
        else return "secondary";
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
                {ArtikelName && (
                    <Form.Group className="border">
                        <Form.Label className="mt-2 mb-0 m-2">
                            Tags auswählen
                        </Form.Label>
                        <ul className={"list-inline p-1 m-1"}>
                            {availableTags.map((tag) => (
                                <li key={tag.id} className={"list-inline-item"}>
                                    <Badge
                                        bg={getTagBadgeColor(tag.Tag)}
                                        onClick={(e) => editSelectedTags(e)}
                                    >
                                        {tag.Tag}
                                    </Badge>
                                </li>
                            ))}
                            <li className={"list-inline-item"}>
                                <Form className={""}>
                                    <Form.Group
                                        className="mb-1 mt-1 list-inline-item"
                                        controlId="TagName"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="neuen Tag hinzufügen"
                                            value={tagName}
                                            onChange={(e) =>
                                                setTagName(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="info"
                                        type="submit"
                                        onClick={(e) => addTag(e)}
                                    >
                                        hinzufügen
                                    </Button>
                                </Form>
                            </li>
                        </ul>
                    </Form.Group>
                )}
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
