import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function SignUpComp(props) {
    const [name, setName] = useState("");
    const [password1, setPW1] = useState("");
    const [password2, setPW2] = useState("");
    //const [token, setToken] = useState("");
    //const [id, setID] = useState("");
    const [userErrorMsg, setUserErrorMsg] = useState("");

    function signUp(event) {
        event.preventDefault();
        if (password1 === "") {
            setUserErrorMsg("Passwort darf nicht leer sein");
            return;
        }
        //passwörter passen?
        if (password1 !== password2) {
            setUserErrorMsg("Passwörter stimmen nicht überein");
            return;
        }

        console.log("passt alles");

        const data = {
            Name: name,
            Password: password1,
        };
        axios
            .post("http://localhost:3001/api/v1/auth/register", data)
            .then((res) => {
                console.log(res.data);
                setUserErrorMsg("");

                //automatischer login
                axios
                    .post("http://localhost:3001/api/v1/auth/login", data)
                    .then((res) => {
                        console.log(res.data._id);
                        //setID(res.data._id);
                        console.log(res.data.token);
                        //setToken(res.data.token);
                        setUserErrorMsg("");
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("id", res.data._id);
                        localStorage.setItem("name", name);

                        window.location.reload();
                    })
                    .catch((err) => {
                        setUserErrorMsg(err.response.data.message);
                    });
            })
            .catch((err) => {
                setUserErrorMsg(err.response.data.message);
                return;
            });
    }

    return (
        <div className="border-primary d-flex justify-content-center align-items-center min-vh-100">
            <div className="border border-2 border-primary rounded-2 p-5">
                <h1>Registrieren</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUser">
                        <Form.Label>Benutzername</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Benutzer eingeben"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Passwort"
                            value={password1}
                            onChange={(e) => setPW1(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Passwort wiederholen</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Passwort"
                            value={password2}
                            onChange={(e) => setPW2(e.target.value)}
                        />
                        {userErrorMsg && (
                            <Form.Text className="text-danger">
                                {userErrorMsg}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button
                        onClick={(e) => signUp(e)}
                        variant="primary"
                        type="submit"
                    >
                        Registrieren
                    </Button>

                    <Button
                        onClick={() => props.toggleSignup(!props.SignUp)}
                        variant="secondary"
                        type="submit"
                    >
                        zurück
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUpComp;
