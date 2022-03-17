import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

function List(props) {
    const [shareForm, setShareForm] = useState(false);
    const [shareButtonText, setShareButtonText] = useState("teilen mit...");
    const [shareButtonColor, setShareButtonColor] = useState("success");
    const [addUser, setAddUser] = useState("");

    function deleteList(e) {
        e.preventDefault();
        // Datenbankaufruf

        axios
            .delete(`http://localhost:3001/api/v1/listen/${props.List._id}`, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }
    //share List
    function shareList(e) {
        e.preventDefault();
        console.log(props);

        const data = { Username: addUser };

        //api call

        axios
            .patch(
                `http://localhost:3001/api/v1/listen/${props.List._id}/addUser/test`,
                data,
                {
                    headers: { "auth-token": localStorage.token },
                }
            )
            .then((res) => {
                console.log(res);

                //state variablen zurücksetzen

                setShareForm(false);
                setShareButtonText("teilen mit...");
                setAddUser("");
                setShareButtonColor("success");
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    //edit List
    function editList(e) {
        /*

        ANDI ....

        */
    }

    function toggleShareButton(e) {
        e.preventDefault();
        setShareForm(!shareForm);
        shareButtonText === "teilen mit..."
            ? setShareButtonText("zurück")
            : setShareButtonText("teilen mit...");
        shareButtonColor === "success"
            ? setShareButtonColor("secondary")
            : setShareButtonColor("success");
    }
    return (
        <Container className=" m-0 p-0 d-flex flex-row justify-content-between">
            <h4 className="p-1 m-1">{props.List.Name}</h4>
            <div>
                <Button
                    className={"m-1"}
                    variant={shareButtonColor}
                    type="submit"
                    onClick={(e) => toggleShareButton(e)}
                >
                    {shareButtonText}
                </Button>
                {
                    //eingabefeld für nutzer inkl. button
                    shareForm && (
                        <div>
                            <Form className={""}>
                                <Form.Group
                                    className="mb-1 mt-1 "
                                    controlId="ShareName"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Nutzer eingeben"
                                        value={addUser}
                                        onChange={(e) =>
                                            setAddUser(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    type="submit"
                                    onClick={(e) => shareList(e)}
                                >
                                    teilen
                                </Button>
                            </Form>
                        </div>
                    )
                }

                <Button
                    className={"m-1"}
                    variant="primary"
                    type="submit"
                    onClick={(e) => editList(e)}
                >
                    bearbeiten
                </Button>

                <Button
                    className={"m-1"}
                    variant="danger"
                    type="submit"
                    onClick={(e) => deleteList(e)}
                >
                    löschen
                </Button>
            </div>
        </Container>
    );
}

export default List;
