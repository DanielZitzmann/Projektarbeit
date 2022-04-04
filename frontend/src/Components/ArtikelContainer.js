import React, { useState, useEffect } from "react";
import axios from "axios";
import Artikel from "./Artikel";
import { Form, ListGroup, Badge } from "react-bootstrap";
import NewArtikel from "./NewArtikel";


function ArtikelContainer(props) {
    //state Variablen
    const [artikel, setArtikel] = useState([]);
    const [filteredArtikel, setFilteredArtikel] = useState([]);
    const [filteredByTags, setFilteredByTags] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [UpdateList, setUpdateList] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [tagsFilter, setTagsFilter] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [addToList, setaddToList] = useState(false);

    //nachdem die Komponente gemountet wurde, werden von Backend alle Artikel geholt und in der state Variable "artikel" gespeichert
    useEffect(() => {
        axios
            .get(`http://${process.env.REACT_APP_IP}:3001/api/v1/artikel`, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                setArtikel(res.data);
                setFilteredArtikel(res.data);
                setFilteredByTags(res.data);
                props.ListID ? setaddToList(true) : setaddToList(false);
            })
            .catch((err) => {
                setErrMsg(err.response.data);
            });

        axios
            .get(`http://${process.env.REACT_APP_IP}:3001/api/v1/tags`, {
                headers: { "auth-token": localStorage.token },
            })
            .then((res) => {
                setAllTags(res.data);
                /*
                //kommentieren wenn Filter immer aktiv sein soll... initial alles aktivieren
                setTagsFilter(() => {
                    let temp = [];
                    res.data.forEach((Tag) => {
                        temp.push(Tag.Tag);
                    });
                    return temp;
                });
                */
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [UpdateList, props.ListID]);
    //Filterung baut aufeinander auf... artikel -> name filtern -> nach Tags filtern

    useEffect(() => {
        if (searchTerm !== "") {
            console.log(searchTerm);
            setFilteredArtikel(
                artikel.filter((artikel) => {
                    return (
                        artikel.Bezeichnung.toLowerCase().indexOf(
                            searchTerm.toLowerCase()
                        ) > -1
                    );
                })
            );
        } else setFilteredArtikel(artikel);
    }, [searchTerm, artikel]);

    //filter für tags
    useEffect(() => {
        if (tagsFilter.length !== 0) {
            console.log(tagsFilter);
            console.log(filteredArtikel);

            setFilteredByTags(
                filteredArtikel.filter((artikel) => {
                    let match = false;
                    artikel.Tags.forEach((tag) => {
                        if (tagsFilter.includes(tag)) match = true;
                    });
                    return match;
                })
            );
        } else setFilteredByTags(filteredArtikel);
    }, [tagsFilter, filteredArtikel]);

    //für filter badges
    function editSelectedTags(e) {
        e.preventDefault();
        let clickedTagName = e.target.firstChild.data;

        if (tagsFilter.includes(clickedTagName)) {
            //raushauen
            setTagsFilter(tagsFilter.filter((item) => item !== clickedTagName));
        } else setTagsFilter([...tagsFilter, clickedTagName]);
    }
    //für filter badges
    function getTagBadgeColor(tag) {
        if (tagsFilter.includes(tag)) return "primary";
        else return "secondary";
    }

    return (
        <div style={{ border: "5px solid green" }} >
            {!props.ListID && <h1>Meine Artikel</h1>}
            {errMsg && <h2 style={{ color: "red" }}>{errMsg}</h2>}
            {console.log(artikel)}
            {console.log(addToList)}
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Artikel suchen"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    ></Form.Control>
                </Form.Group>
            </Form>

            <Form className="mt-3">
                <Form.Group>
                    <Form.Label className="m-3 mt-1 mb-1">
                        {" "}
                        Nach Tags Filtern:{" "}
                    </Form.Label>
                    <ul>
                        {allTags.map((tag) => (
                            <li key={tag.id} className={"list-inline-item"}>
                                <Badge
                                    bg={getTagBadgeColor(tag.Tag)}
                                    onClick={(e) => editSelectedTags(e)}
                                >
                                    {tag.Tag}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </Form.Group>
            </Form>
            {filteredByTags.map((artikel) => (
                <ListGroup >
                    <ListGroup.Item key={artikel._id} >
                        <Artikel 
                            
                            Artikel={artikel}
                            updateState={setUpdateList}
                            updateState2={props.updateState}
                            addToList={addToList}
                            ListID={props.ListID}
                        ></Artikel>
                    </ListGroup.Item>
                </ListGroup>
            ))}
            <NewArtikel updateState={setUpdateList}></NewArtikel>
        </div>
    );
}

export default ArtikelContainer;
