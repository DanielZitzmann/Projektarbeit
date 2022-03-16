import React, { useState, useEffect } from "react";
import axios from "axios";
import NewTag from "./NewTag";
import { ListGroup } from "react-bootstrap";
import Tag from "./Tag";

function TagsContainer() {
    //state Variable
    const [tags, setTags] = useState([]);
    //inhalt uninteressant, wird nur gebraucht um neu zu rendern
    const [newTag, setNewTag] = useState({});
    //inhalt uninteressant, wird nur gebraucht um neu zu rendern
    const [tagChange, setTagChange] = useState({});
    //test was passiert wenn token ungültig ist
    const [errMsg, setErrMsg] = useState("");

    //nachdem die Komponente gemountet wurde, werden von Backend alle Tags geholt und in der state Variable "tags" gespeichert
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/v1/tags", {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                //console.log(res.data);
                setTags(res.data);
            })
            .catch((err) => {
                setErrMsg(err.response.data);
            });
    }, [newTag, tagChange]);

    return (
        <div style={{ border: "5px solid red" }}>
            <h1>Meine Tags</h1>
            {
                //test was passiert wenn token ungültig ist
                errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>
            }
            {tags.map((tag) => (
                <ListGroup key={tag._id}>
                    <ListGroup.Item>
                        <Tag Tag={tag} updateState={setTagChange}></Tag>
                    </ListGroup.Item>
                </ListGroup>
            ))}
            <NewTag updateState={setNewTag}></NewTag>
        </div>
    );
}

export default TagsContainer;

//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "tags"  bzw. teile davon als prop durchreichen
