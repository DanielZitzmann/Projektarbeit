import axios from "axios";
import React, { useState } from "react";

export function Tags() {
    const [post, setPost] = useState(null);

    React.useEffect(() => {
        axios.get("http://localhost:3001/api/v1/tags").then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    return (
        <div>
            <h1>Alle Tags</h1>
            {post.map((tag) => (
                <div key={tag._id}>
                    <h4>{tag._id}</h4>
                    <p>{tag.Tag}</p>
                </div>
            ))}
        </div>
    );
}
