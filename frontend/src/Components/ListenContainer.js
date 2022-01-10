import React, { useState, useEffect } from "react";
import axios from "axios";

function ListenContainer() {
    //state Variable
    const [listen, setListen] = useState([]);

    //nachdem die Komponente gemountet wurde, werden von Backend alle Listen geholt und in der state Variable "listen" gespeichert
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/listen").then((res) => {
            setListen(res.data);
        });
    }, []);

    return (
        <div style={{ border: "5px solid orange" }}>
            <h1>ListenContainer</h1>
            {console.log(listen)}
            {listen.map((liste) => (
                <ul key={liste._id}>
                    <li>ID: {liste._id}</li>
                    <li>Name: {liste.Name}</li>
                    <li>
                        {liste.Artikel.map((artikel) => (
                            <ul key={artikel}>
                                <li>{artikel}</li>
                            </ul>
                        ))}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default ListenContainer;
//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "listen" bzw. teile davon als prop durchreichen"
