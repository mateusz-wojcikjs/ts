import { ThreadItem } from "./ThreadItem";
import { User } from "./User";
import { Thread } from "./Thread";
import {QueryArrayResults} from "../types/QueryArrayResults";
import {isThreadBodyValid} from "../common/threadValidator";

export const createThreadItem = async (
    userId: string | undefined | null,
    threadId: string,
    body: string
): Promise<QueryArrayResults<ThreadItem>> => {
    const bodyMsg = isThreadBodyValid(body);
    if (bodyMsg) {
        return {
            messages: [bodyMsg],
        };
    }

    if (!userId) {
        return {
            messages: ["Użytkownik nie jest zalogowany."],
        };
    }
    const user = await User.findOne({
        where: {id: userId},
    });

    const thread = await Thread.findOne({
        where: {id: threadId},
    });
    if (!thread) {
        return {
            messages: ["Nie znaleziono wątku."],
        };
    }
    // @ts-ignore
    const threadItem = await ThreadItem.create({
        body,
        user,
        thread,
    // @ts-ignore
    }).save();
    if (!threadItem) {
        return {
            messages: ["Nie udało się utworzyć odpowiedzi (ThreadItem)."],
        };
    }

    return {
        messages: ["Odpowiedź została pomyślnie zapisana w bazie."],
    };
};

export const getThreadItemsByThreadId = async (
    threadId: string
): Promise<QueryArrayResults<ThreadItem>> => {
    const threadItems = await ThreadItem.createQueryBuilder("ti")
        .where(`ti."threadId" = :threadId`, { threadId })
        .leftJoinAndSelect("ti.thread", "thread")
        .orderBy("ti.createdOn", "DESC")
        .getMany();

    if (!threadItems) {
        return {
            messages: ["Nie znaleziono odpowiedzi (ThreadItem) do wątku."],
        };
    }
    console.log(threadItems);
    return {
        entities: threadItems,
    };
};
