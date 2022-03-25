import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import NewList from "./NewList";
import List from "./List";

function ListenContainer() {
    //state Variable
    const [listen, setListen] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [updateList, setUpdateList] = useState({});

    //nachdem die Komponente gemountet wurde, werden von Backend alle Listen geholt und in der state Variable "listen" gespeichert
    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_IP}:3001/api/v1/listen`, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                setListen(res.data);
            })
            .catch((err) => {
                setErrMsg(err.response.data);
            });
    }, [updateList]);

    return (
        <div style={{ border: "5px solid orange" }}>
            <h1>Meine Listen</h1>
            {
                //test was passiert wenn token ungültig ist
                errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>
            }
            {console.log(listen)}
            {listen.map((liste) => (
                <ListGroup key={liste._id}>
                    <ListGroup.Item>
                        <List List={liste} updateState={setUpdateList}></List>
                    </ListGroup.Item>
                </ListGroup>
            ))}
            <NewList updateState={setUpdateList}></NewList>
        </div>
    );
}

export default ListenContainer;
//Anzeige bzw. Auflistung nur als Beispiel zur orientierung... Eigene Komponenten / Unterkomponenten notwendig state variable "listen" bzw. teile davon als prop durchreichen"
