import React, { useState, useEffect } from "react";
import axios from "axios";
import Artikel from "./Artikel";
import { ListGroup } from "react-bootstrap";
import NewArtikel from "./NewArtikel";

function ArtikelContainer() {
    //state Variable
    const [artikel, setArtikel] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [UpdateList, setUpdateList] = useState({});

    //nachdem die Komponente gemountet wurde, werden von Backend alle Artikel geholt und in der state Variable "artikel" gespeichert
    useEffect(() => {
        axios
            .get("http://localhost:3001/api/v1/artikel", {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                setArtikel(res.data);
            })
            .catch((err) => {
                setErrMsg(err.response.data);
            });
    }, [UpdateList]);

    return (
        <div style={{ border: "5px solid green" }}>
            <h1>Meine Artikel</h1>
            {
                //test was passiert wenn token ungültig ist
                errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>
            }
            {console.log(artikel)}
            {artikel.map((artikel) => (
                <ListGroup key={artikel._id}>
                    <ListGroup.Item>
                        <Artikel
                            Artikel={artikel}
                            updateState={setUpdateList}
                        ></Artikel>
                    </ListGroup.Item>
                </ListGroup>
            ))}
            <NewArtikel updateState={setUpdateList}></NewArtikel>
        </div>
    );
}

export default ArtikelContainer;

//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "artikel"  bzw. teile davon als prop durchreichen
