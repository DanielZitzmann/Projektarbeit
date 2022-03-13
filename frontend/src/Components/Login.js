import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function LoginComp(props) {
    const [name, setName] = useState("");
    const [password, setPW] = useState("");
    const [token, setToken] = useState("");
    const [id, setID] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    function login(event) {
        event.preventDefault();
        //api aufruf
        console.log("api call");

        const data = {
            Name: name,
            Password: password,
        };
        axios
            .post("http://localhost:3001/api/v1/auth/login", data)
            .then((res) => {
                console.log(res.data._id);
                setID(res.data._id);
                console.log(res.data.token);
                setToken(res.data.token);
                setErrorMsg("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data._id);
                localStorage.setItem("name", name);

                window.location.reload();
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message);
            });
    }

    return (
        <div className="border-primary d-flex justify-content-center align-items-center min-vh-100">
            <div className="border border-2 border-primary rounded-2 p-5">
                <h1>Login</h1>
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Passwort</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Passwort"
                            value={password}
                            onChange={(e) => setPW(e.target.value)}
                        />
                        {errorMsg && (
                            <Form.Text className="text-danger">
                                {errorMsg}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button
                        onClick={(e) => login(e)}
                        variant="primary"
                        type="submit"
                    >
                        Anmelden
                    </Button>
                    <Form.Group>
                        <Form.Label className="mt-3 d-block">
                            noch kein Konto?
                        </Form.Label>
                        <Button
                            onClick={() => props.toggleSignup(!props.SignUp)}
                            variant="secondary"
                            type="submit"
                        >
                            Registrieren
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default LoginComp;