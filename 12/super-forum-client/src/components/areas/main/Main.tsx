import React, {useEffect, useState} from 'react';
import {getThreadsByCategory} from "../../../services/DataService";
import {useParams} from "react-router-dom";
import Category from "../../../models/Category";
import ThreadCard from "./ThreadCard";
import MainHeader from "./MainHeader";
import {gql, useLazyQuery} from "@apollo/client";

const GetThreadsByCategoryId = gql`
    query GetThreadsByCategoryId($categoryId: ID!) {
        getThreadsByCategoryId(categoryId: $categoryId) {
            ...on EntityResult {
                messages
            }
            ...on ThreadArray {
                threads {
                    id,
                    title
                    body
                    views
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const GetThreadsLatest = gql`
    query GetThreadsLatest {
        getThreadsLatest {
            ...on EntityResult {
                messages
            }
            ...on ThreadArray {
                threads {
                    id,
                    title
                    body
                    views
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`;

const Main = () => {
    const [execGetThreadsByCat, {
            data: threadsByCatData,
        },
    ] = useLazyQuery(GetThreadsByCategoryId);

    const [execGetThreadsLatest, {
        data: threadsLatestData,
    },
    ] = useLazyQuery(GetThreadsLatest);
    const { categoryId } = useParams();
    const [category, setCategory] = useState<Category | undefined>();
    const [threadCards, setThreadCards] = useState<Array<JSX.Element> | null>(
        null
    );

    useEffect(() => {
        if (categoryId && Number(categoryId) > 0) {
            execGetThreadsByCat({
                variables: {
                    categoryId,
                },
            });
        } else {
            execGetThreadsLatest();
        }
    }, [categoryId]);


    useEffect(() => {
        console.log("Komponent Main, threadsByCatData", threadsByCatData);
        if (
            threadsByCatData &&
            threadsByCatData.getThreadsByCategoryId &&
            threadsByCatData.getThreadsByCategoryId.threads
        ) {
            const threads = threadsByCatData.getThreadsByCategoryId.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });

            setCategory(threads[0].category);

            setThreadCards(cards);
        } else {
            setCategory(undefined);
            setThreadCards(null);
        }
    }, [threadsByCatData]);

    useEffect(() => {
        if (
            threadsLatestData &&
            threadsLatestData.getThreadsLatest &&
            threadsLatestData.getThreadsLatest.threads
        ) {
            const threads = threadsLatestData.getThreadsLatest.threads;
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th} />;
            });

            setCategory(new Category("0", "Najnowsze"));

            setThreadCards(cards);
        }
    }, [threadsLatestData]);

    return (
        <main className="content">
            <MainHeader category={category} />
            <div>{threadCards}</div>
        </main>
    );
};

export default Main;
