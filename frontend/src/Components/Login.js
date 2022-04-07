import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CookieConsent from "react-cookie-consent";
import background from "./Images/BackgroundLogin.jpg";
import axios from "axios";
import "./Login.css";

function LoginComp(props) {
    const [name, setName] = useState("");
    const [password, setPW] = useState("");
    //const [token, setToken] = useState("");
    //const [id, setID] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    //Variable für Hintergrundstyle
    const loginStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "#FFF",
    };

    function login(event) {
        event.preventDefault();
        //api aufruf
        console.log("api call");

        const data = {
            Name: name,
            Password: password,
        };
        axios
            .post(
                `http://${process.env.REACT_APP_IP}:3001/api/v1/auth/login`,
                data
            )
            .then((res) => {
                console.log(res.data._id);
                //setID(res.data._id);
                console.log(res.data.token);
                //setToken(res.data.token);
                setErrorMsg("");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data._id);
                localStorage.setItem("name", name);

                //localStorage.removeItem("id");
                //localStorage.removeItem("token");
                window.location.reload();
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message);
            });
    }

    return (
        <div
            className="border-primary d-flex justify-content-center align-items-center min-vh-100"
            style={loginStyle}
        >
            <div className="border border-2 border-primary rounded-2 p-5">
                <h1 className="login">Login</h1>
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
                            <Form.Text className="text-danger bg-white">
                                {errorMsg}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button
                        className="buttonstyle"
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
                            className="buttonstyle"
                            onClick={() => props.toggleSignup(!props.SignUp)}
                            variant="secondary"
                            type="submit"
                        >
                            Registrieren
                        </Button>
                    </Form.Group>
                </Form>
            </div>
            <div>
                <CookieConsent
                    location="top"
                    style={{ background: "#099DEC" }}
                    buttonStyle={{ color: "#000", background: "#fff" }}
                    buttonText="Ich bin ich mit der Verwendung von Cookies einverstanden"
                    expires={7}
                >
                    Diese Seite verwendet Cookies
                </CookieConsent>
            </div>
        </div>
    );
}

export default LoginComp;
