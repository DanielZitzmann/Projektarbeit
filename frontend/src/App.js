import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Components/Navbar/NavbarComp";
import Authentication from "./Components/Authentication";

/*

function App() {
    return <div>{localStorage.token ? <NavbarComp /> : <Login />}</div>;
}

*/

function App() {
    return (
        <div>{localStorage.token ? <NavbarComp /> : <Authentication />}</div>
    );
}

/*
function App() {
    return (
        <div>
            <SignUp />
        </div>
    );
}
*/

export default App;
