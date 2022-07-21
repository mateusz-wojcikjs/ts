import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {AppState} from "./store/AppState";

const PostDisplay = React.memo(() => {
    const renderCount = useRef(0);
    console.log("wyświetlanie komponentu Post Display", renderCount.current++);
    const post = useSelector((state: AppState) => state.post);
    if (post) {
        return (
            <>
                <div>
                    <label htmlFor="">Tytuł</label>
                    &nbsp;{post?.title}
                </div>
                <div>
                    <label htmlFor="">Treść</label>
                    &nbps;{post?.body}
                </div>
            </>
        );
    } else {
        return null;
    }
});

export default PostDisplay;
