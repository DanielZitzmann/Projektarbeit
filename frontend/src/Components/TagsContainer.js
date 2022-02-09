import React, { useState, useEffect } from "react";
import axios from "axios";

function TagsContainer() {
    //state Variable
    const [tags, setTags] = useState([]);
    //test was passiert wenn token ungültig ist
    const [errMsg, setErrMsg] = useState("");

    //nachdem die Komponente gemountet wurde, werden von Backend alle Tags geholt und in der state Variable "tags" gespeichert
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/v1/tags", {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                setTags(res.data);
            })
            .catch((err) => {
                setErrMsg(err.response.data);
            });
    }, []);

    return (
        <div style={{ border: "5px solid red" }}>
            <h1>TagsContainer</h1>
            {
                //test was passiert wenn token ungültig ist
                errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>
            }
            {console.log(tags)}
            {tags.map((tag) => (
                <ul key={tag._id}>
                    <li>ID: {tag._id}</li>
                    <li>Tagname: {tag.Tag}</li>
                </ul>
            ))}
        </div>
    );
}

export default TagsContainer;

//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "tags"  bzw. teile davon als prop durchreichen
