import {createThread, getThreadById, getThreadsByCategoryId, getThreadsLatest} from "../repo/ThreadRepo";
import {Thread} from "../repo/Thread";
import {QueryArrayResults, QueryOneResult} from "../types/QueryArrayResults";
import {GqlContext} from "./GqlContext";
import {ThreadItem} from "../repo/ThreadItem";
import {createThreadItem, getThreadItemsByThreadId} from "../repo/ThreadItemRepo";
import {updateThreadPoint} from "../repo/ThreadPointRepo";
import {updateThreadItemPoint} from "../repo/ThreadItemPointRepo";
import {login, logout, me, register, UserResult} from "../repo/UserRepo";
import {User} from "../repo/User";
import {ThreadCategory} from "../repo/ThreadCategory";
import {getAllCategories} from "../repo/ThreadCategoryRepo";

const STANDARD_ERROR = "An error has occurred";

interface EntityResult {
    messages: Array<string>;
}

const resolvers = {
    UserResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) return "EntityResult";
            return "User";
        },
    },
    ThreadResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) return "EntityResult";
            return "Thread";
        },
    },
    ThreadArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) return "EntityResult";
            return "ThreadArray";
        },
    },
    ThreadItemResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) return "EntityResult";
            return "ThreadItem";
        },
    },
    ThreadItemArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) return "EntityResult";
            return "ThreadItemArray";
        },
    },

    Query: {
        getThreadById: async (
            obj: any,
            args: { id: string },
            ctx: GqlContext,
            info: any
        ): Promise<Thread | EntityResult> => {
            let thread: QueryOneResult<Thread>;
            try {
                thread = await getThreadById(args.id);

                if (thread.entity) {
                    return thread.entity;
                }
                return {
                    messages: thread.messages ? thread.messages : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },
        getThreadsByCategoryId: async (
            obj: any,
            args: { categoryId: string },
            ctx: GqlContext,
            info: any
        ): Promise<{ threads: Array<Thread> } | EntityResult> => {
            let threads: QueryArrayResults<Thread>;
            try {
                threads = await getThreadsByCategoryId(args.categoryId);
                if (threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : [STANDARD_ERROR],
                }
            } catch (ex) {
                throw ex;
            }
        },
        getThreadsLatest: async (
            obj: any,
            args: null,
            ctx: GqlContext,
            info: any
        ): Promise<{ threads: Array<Thread> } | EntityResult> => {
            let threads: QueryArrayResults<Thread>;
            try {
                threads = await getThreadsLatest();
                if (threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },
        getThreadItemsByThreadId: async (
            obj: any,
            args: { threadId: string },
            ctx: GqlContext,
            info: any
        ): Promise<{ threadItems: Array<ThreadItem> } | EntityResult> => {
            let threadItems: QueryArrayResults<ThreadItem>;
            try {
                threadItems = await getThreadItemsByThreadId(args.threadId);
                if (threadItems.entities) {
                    return {
                        threadItems: threadItems.entities,
                    };
                }
                return {
                    messages: threadItems.messages ? threadItems.messages : [STANDARD_ERROR],
                }
            } catch (ex) {
                throw ex;
            }
        },

        me: async (
            obj: any,
            args: null,
            ctx: GqlContext,
            info: any
        ):  Promise<User | EntityResult> => {
            let user: UserResult;

            try {
                if (!ctx.req.session?.userId) {
                    return {
                        messages: ["Użytkownik nie jest zalogowany."],
                    };
                }
                user = await me(ctx.req.session.userId);
                if (user && user.user) {
                    return user.user;
                }
                return {
                    messages: user.messages ? user.messages : [STANDARD_ERROR],
                };

            } catch (ex) {
                throw ex;
            }
        },

        getAllCategories: async (
            obj: any,
            args: null,
            ctx: GqlContext,
            info: any
        ): Promise<Array<ThreadCategory> | EntityResult> => {
            let categories: QueryArrayResults<ThreadCategory>;
            try {
                categories = await getAllCategories();
                if (categories.entities) {
                    return categories.entities;
                }
                return {
                    messages: categories.messages
                        ? categories.messages
                        : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },
    },

    Mutation: {
        createThread: async (
            obj: any,
            args: { userId: string; categoryId: string; title: string; body: string},
            ctx: GqlContext,
            info: any,
        ): Promise<EntityResult> => {
            let result: QueryOneResult<Thread>;
            try {
                result = await createThread(
                    args.userId,
                    args.categoryId,
                    args.title,
                    args.body
                );

                return {
                    messages: result.messages ? result.messages : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },

        createThreadItem: async (
            obj: any,
            args: { userId: string; threadId: string; body: string},
            ctx: GqlContext,
            info: any,
        ): Promise<EntityResult> => {
            let result: QueryOneResult<ThreadItem>;
            try {
                result = await createThreadItem(
                    args.userId,
                    args.threadId,
                    args.body,
                );

                return {
                    messages: result.messages ? result.messages : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },

        updateThreadPoint: async (
            obj: any,
            args: { userId: string; threadId: string; increment: boolean},
            ctx: GqlContext,
            info: any,
        ): Promise<string> => {
            let result = "";
            try {
                result = await updateThreadPoint(
                    args.userId,
                    args.threadId,
                    args.increment
                );
                return result;
            } catch (ex) {
                throw ex;
            }
        },

        updateThreadItemPoint: async (
            obj: any,
            args: { userId: string; threadItemId: string; increment: boolean},
            ctx: GqlContext,
            info: any,
        ): Promise<string> => {
            let result = "";
            try {
                result = await updateThreadItemPoint(
                    args.userId,
                    args.threadItemId,
                    args.increment
                );
                return result;
            } catch (ex) {
                throw ex;
            }
        },

        register: async (
            obj: any,
            args: { userName: string, password: string, email: string },
            ctx: GqlContext,
            info: any
        ): Promise<string> => {
            let user: UserResult;
            try {
                user = await register(args.email, args.userName, args.password);
                if (user && user.user) {
                    return "Pomyślnie zarejestrowano użytkownika.";
                }
                return user && user.messages ? user.messages[0] : STANDARD_ERROR;

            } catch (ex) {
                throw ex;
            }
        },

        login: async (
            obj: any,
            args: { userName: string, password: string },
            ctx: GqlContext,
            info: any
        ): Promise<string> => {
            let user: UserResult;
            try {
                user = await login(args.userName, args.password);
                if (user && user.user) {
                    ctx.req.session!.userId = user.user.id;
                    console.log(ctx.req.session!.userId); console.log(user.user.id);

                    return `Pomyślnie zalogowano użytkownika ${ctx.req.session!.userId}.`;
                }
                return user && user.messages ? user.messages[0] : STANDARD_ERROR;
            } catch (ex) {
                console.log(ex)
                throw ex;
            }
        },

        logout: async (
            obj: any,
            args: { userName: string },
            ctx: GqlContext,
            info: any
        ): Promise<string> => {
            try {
                let result = await logout(args.userName);
                ctx.req.session?.destroy((err: any) => {
                    if (err) {
                        console.log("nie udało się usunąć sesji");
                        return;
                    }
                    console.log("sesja została usunięta", ctx.req.session?.userId);
                });
                return result;
            } catch (ex) {
                throw ex;
            }

        },
    }
};

export default resolvers;
