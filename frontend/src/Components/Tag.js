import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

function Tag(props) {
    function deleteTag(e) {
        e.preventDefault();
        // Datenbankaufruf

        axios
            .delete(`http://localhost:3001/api/v1/tags/${props.Tag._id}`, {
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

    return (
        <Container className=" m-0 p-0 d-flex flex-row justify-content-between">
            <h4 className="p-1 m-1">{props.Tag.Tag}</h4>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={(e) => deleteTag(e)}
            >
                löschen
            </Button>
        </Container>
    );
}

export default Tag;
