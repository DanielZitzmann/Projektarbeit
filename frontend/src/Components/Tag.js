import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

function Tag(props) {
    const [show,setShow]=useState(false)
    const [newName, setNewName] = useState("");
    function deleteTag(e) {
        e.preventDefault();
        // Datenbankaufruf

        axios
            .delete(
                `http://${process.env.REACT_APP_ID}:3001/api/v1/tags/${props.Tag._id}`,
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
    function editTag(e) {
        e.preventDefault();
        setNewName(props.Tag.Tag);
        setShow(true);
    }
    function saveTag(e) {
        e.preventDefault();
        setNewName(props.Tag.Tag);
        // todo DB Update
        // Geänderter Artikelname wird im State NewName gespeichert
        setShow(false);
    }

    return (
        <Container className=" m-0 p-0 d-flex flex-row justify-content-between">
        {show == false && (
            <div>
            <h4 className="p-1 m-1">{props.Tag.Tag}</h4>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={(e) => editTag(e)}
            >
                bearbeiten
            </Button>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={(e) => deleteTag(e)}
            >
                löschen
            </Button>
            </div>
        )}
        {show == true && (
            <div>
            <form>
                <input 
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                />
            </form>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={()=>setShow(false)}
            >
                speichern
            </Button>
            <Button
                className={"m-1"}
                variant="danger"
                type="submit"
                onClick={()=>setShow(false)}
            >
                abbrechen
            </Button>
            </div>
        )}
            
        </Container>
    );
}

export default Tag;
