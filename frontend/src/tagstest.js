import React, { useState } from "react";
import tagsAPI from "./api/tags";

export function Tags() {
    const [post, setPost] = useState(null);

    React.useEffect(() => {
        tagsAPI.getAllTags().then((res) => {
            setPost(res.data);
        });
    }, []);

    if (!post) return null;

    function deleteTag(event) {
        event.preventDefault();
        console.log(event.target.value);
        tagsAPI.deleteTagByID(event.target.value).then((res) => {
            console.log(res);
        });
        setPost(post.filter((item) => item._id !== event.target.value));
    }

    return (
        <div>
            <h1>Alle Tags</h1>
            {post.map((tag) => (
                <ul key={tag._id}>
                    <li>ID: {tag._id}</li>
                    <li>Tagname: {tag.Tag}</li>
                    <li>
                        <button value={tag._id} onClick={deleteTag}>
                            löschen
                        </button>
                    </li>
                </ul>
            ))}
        </div>
    );
}
