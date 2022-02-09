import TagsContainer from "./Components/TagsContainer";
import ArtikelContainer from "./Components/ArtikelContainer";
import ListenContainer from "./Components/ListenContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Components/Navbar/NavbarComp";
import Login from "./Components/Login";

function App() {
    return <div>{localStorage.token ? <NavbarComp /> : <Login />}</div>;
}

export default App;
