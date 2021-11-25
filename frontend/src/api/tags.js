import axios from "axios";

//getAllTags
function getAllTags() {
    return axios.get("http://localhost:3001/api/v1/tags");
}

//getTagByID

//deleteTagByID
function deleteTagByID(id) {
    return axios.delete(`http://localhost:3001/api/v1/tags/${id}`);
}
//addTag

const func = { getAllTags, deleteTagByID };
export default func;
