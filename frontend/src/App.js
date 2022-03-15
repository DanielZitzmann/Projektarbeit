import TagsContainer from "./Components/TagsContainer";
import ArtikelContainer from "./Components/ArtikelContainer";
import ListenContainer from "./Components/ListenContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Components/Navbar/NavbarComp";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
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
