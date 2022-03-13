import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import LoginComp from "./Login";
import SignUpComp from "./SignUp";

function Authentication() {
    const [SignUp, setSignup] = useState(false);

    if (SignUp)
        return (
            <SignUpComp toggleSignup={setSignup} SignUp={SignUp}></SignUpComp>
        );
    else
        return <LoginComp toggleSignup={setSignup} SignUp={SignUp}></LoginComp>;
}

export default Authentication;
