import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

function ListenArtikel(props) {
    function deleteArtikel(e) {
        e.preventDefault();
        // Datenbankaufruf
        const bodydata = { artikelName: props.Artikel };

        axios
            .delete(
                `http://${process.env.REACT_APP_IP}:3001/api/v1/listen/${props.ListID}/artikel`,
                {
                    data: bodydata,
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
        <Container className=" m-0 p-0 d-flex flex-row justify-content-between">
            <h4 className="p-1 m-1">{props.Artikel}</h4>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={(e) => deleteArtikel(e)}
            >
                löschen
            </Button>
        </Container>
    );
}

export default ListenArtikel;
