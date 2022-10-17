import React, {useEffect, useReducer, useState} from "react";
import { useParams } from "react-router-dom";
import "./Thread.css";
import ThreadHeader from "./ThreadHeader";
import ThreadModel from "../../../models/Thread";
import { getThreadById } from "../../../services/DataService";
import Navigation from "../../areas/Navigation";
import ThreadTitle from "./ThreadTitle";
import ThreadCategory from "./ThreadCategory";
import ThreadBody from "./ThreadBody";
import ThreadResponsesBuilder from "./ThreadResponsesBuilder";
import ThreadPointsBar from "../../ThreadPointsBar";
import Category from "../../../models/Category";
import {threadReducer} from "../../../reducers/ThreadReducer";

const Thread = () => {
    const [thread, setThread] = useState<ThreadModel | undefined>();
    const { id } : any = useParams();
    const [{ userId, category, title, bodyNode },threadReducerDispatch] = useReducer(threadReducer, {
        userId: "0",
        category: undefined,
        title: "",
        body: "",
        bodyNode: undefined,
    })

    useEffect(() => {
        console.log("Id wątku", id);
        if (id && id > 0) {
            getThreadById(id).then((th) => {
                setThread(th);
            });
        }
    }, [id]);

    const receiveSelectedCategory = (cat: Category) => {
        threadReducerDispatch({
            type: "category",
            payload: cat,
        });
    };

    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Navigation />
            </div>
            <div className="thread-content-container">
                <div className="thread-content-post-container">
                    <ThreadHeader
                        userName={thread?.userName}
                        lastModifiedOn={thread ? thread.lastModifiedOn : new Date().getDate()}
                        title={thread?.title}
                    />
                    <ThreadCategory category={thread ? thread.category : category}
                                    sendOutSelectedCategory={receiveSelectedCategory} />
                    <ThreadTitle title={thread?.title} />
                    <ThreadBody body={thread?.body} />
                </div>
                <div className="thread-content-points-container">
                    <ThreadPointsBar
                        points={thread?.points || 0}
                        responseCount={
                            thread && thread.threadItems && thread.threadItems.length
                        }
                    />
                </div>
            </div>
            <div className="thread-content-response-container">
                <hr className="thread-section-divider" />
                <ThreadResponsesBuilder threadItems={thread?.threadItems} />
            </div>
        </div>
    );
};

export default Thread;
