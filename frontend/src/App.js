import TagsContainer from "./Components/TagsContainer";
import ArtikelContainer from "./Components/ArtikelContainer";
import ListenContainer from "./Components/ListenContainer";

function App() {
    //TODO: React-Routes Navbar für Container-Komponenten nicht alles auf einmal anzeigen, auswählen über navbar
    return (
        <div>
            <TagsContainer />
            <ArtikelContainer />
            <ListenContainer />
        </div>
    );
}

export default App;
