import React, { useState, useEffect } from "react";
import axios from "axios";

function TagsContainer() {
    //state Variable
    const [tags, setTags] = useState([]);

    //nachdem die Komponente gemountet wurde, werden von Backend alle Tags geholt und in der state Variable "tags" gespeichert
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/tags").then((res) => {
            setTags(res.data);
        });
    }, []);

    return (
        <div style={{ border: "5px solid red" }}>
            <h1>TagsContainer</h1>
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
