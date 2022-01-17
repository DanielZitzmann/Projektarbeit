import TagsContainer from "./Components/TagsContainer";
import ArtikelContainer from "./Components/ArtikelContainer";
import ListenContainer from "./Components/ListenContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Components/Navbar/NavbarComp";

function App() {
    //TODO: React-Routes Navbar für Container-Komponenten nicht alles auf einmal anzeigen, auswählen über navbar
    return (
        <div>
            <NavbarComp />
        </div>
    );
}

export default App;
