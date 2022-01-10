import React, { useState, useEffect } from "react";
import axios from "axios";

function ArtikelContainer() {
    //state Variable
    const [artikel, setArtikel] = useState([]);

    //nachdem die Komponente gemountet wurde, werden von Backend alle Artikel geholt und in der state Variable "artikel" gespeichert
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/artikel").then((res) => {
            setArtikel(res.data);
        });
    }, []);

    return (
        <div style={{ border: "5px solid green" }}>
            <h1>ArtikelContainer</h1>
            {console.log(artikel)}
            {artikel.map((artikel) => (
                <ul key={artikel._id}>
                    <li>ID: {artikel._id}</li>
                    <li>Artikelname: {artikel.Bezeichnung}</li>
                    <li>
                        {artikel.Tags.map((tag) => (
                            <ul key={tag}>
                                <li>{tag}</li>
                            </ul>
                        ))}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default ArtikelContainer;

//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "artikel"  bzw. teile davon als prop durchreichen
