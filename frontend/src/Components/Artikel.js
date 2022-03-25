import React from "react";
import { Button, Container, Badge } from "react-bootstrap";
import axios from "axios";

function Artikel(props) {
    function deleteArtikel(e) {
        e.preventDefault();
        // Datenbankaufruf

        axios
            .delete(
                `http://${process.env.REACT_APP_IP}:3001/api/v1/artikel/${props.Artikel._id}`,
                {
                    headers: { "auth-token": localStorage.token },
                }
            )
            .then((res) => {
                console.log(res);
                props.updateState(res.data);
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }
    return (
        <div>
            <Container className=" m-0 p-0 d-flex flex-row justify-content-between">
                <h4 className="p-1 m-1">{props.Artikel.Bezeichnung}</h4>
                <div>
                    <Button
                        className={"m-1"}
                        variant="danger"
                        type="submit"
                        onClick={(e) => deleteArtikel(e)}
                    >
                        löschen
                    </Button>
                </div>
            </Container>
            <ul className={"list-inline p-1 m-1"}>
                {props.Artikel.Tags.map((tag) => (
                    <li key={tag} className={"list-inline-item"}>
                        <Badge bg="info">{tag}</Badge>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Artikel;
