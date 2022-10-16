import {QueryArrayResults, QueryOneResult} from "../types/QueryArrayResults";
import {Thread} from "./Thread";
import {User} from "./User";
import {isThreadBodyValid, isThreadTitleValid} from "../common/threadValidator";
import {ThreadCategory} from "./ThreadCategory";

export const createThread = async (
    userId: string | undefined | null,
    categoryId: string,
    title: string,
    body: string,
): Promise<QueryOneResult<Thread>> => {
    const titleMsg = isThreadTitleValid(title);
    if (titleMsg) {
        return {
            messages: [titleMsg],
        };
    }
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
        where: {
            id: userId,
        }
    });

    const category = await ThreadCategory.findOne({
        where: {
            id: categoryId,
        },
    });
    if (!category) {
        return {
            messages: ["Nie znaleziono kateogrii."],
        };
    }

    // @ts-ignore
    const thread = await Thread.create({
        title,
        body,
        user,
        category,
    // @ts-ignore
    }).save();

    if (!thread) {
        return {
            messages: ["Nie udało się utworzyć wątku."],
        };
    }

    return {
        messages: ["Wątek został pomyślnie utworzony."],
    };
}

export const getThreadById = async (id: string): Promise<QueryOneResult<Thread>> => {
    const thread = await Thread.findOne({ where: { id } });
    if (!thread) {
        return {
            messages: ["Nie udało się znaleźć wątku."],
        };
    }

    return {
        entity: thread,
    }
}

export const getThreadsByCategoryId = async (
    categoryId: string
): Promise<QueryArrayResults<Thread>> => {
    const threads = await Thread.createQueryBuilder("thread")
        .where(`thread."categoryId" = :categoryId`, { categoryId })
        .leftJoinAndSelect("thread.category", "category")
        .leftJoinAndSelect("thread.threadItems", "threadItems")
        .orderBy("thread.createdOn", "DESC")
        .getMany();

    if (!threads || threads.length === 0) return {
        messages: ["Nie udało się znaleźć wątków w podanej kategorii."],
    };
    console.log(threads);
    return {
        entities: threads,
    };
};


export const getThreadsLatest = async (): Promise<QueryArrayResults<Thread>> => {
    const threads = await Thread.createQueryBuilder("thread")
        .leftJoinAndSelect("thread.category", "category")
        .leftJoinAndSelect("thread.user", "user")
        .leftJoinAndSelect("thread.threadItems", "threadItems")
        .orderBy("thread.createdOn", "DESC")
        .take(10)
        .getMany();

    if (!threads || threads.length === 0) {
        return {
            messages: ["Nie znaleziono żadnych wątków."],
        };
    }
    console.log(threads);
    return {
        entities: threads,
    };
};
