import {v4} from "uuid";
import {GqlContext} from "./GqlContext";
import {todos} from "./db";

interface User {
    id: string;
    username: string;
    description?: string;
}

interface Todo {
    id: string;
    title: string;
    description?: string;
}

const resolvers = {
    Query: {
        getUser: async (
            obj: any,
            args: {
                id: string;
            },
            ctx: GqlContext,
            info: any
        ): Promise<User> => {
            return {
                id: v4(),
                username: "Janusz",
            };
        },
        getTodos: async (
            parent: any,
            args: null,
            ctx: GqlContext,
            info: any
        ): Promise<Array<Todo>> => {
            return [
                {
                    id: v4(),
                    title: "First task",
                    description: "Description of first task."
                },
                {
                    id: v4(),
                    title: "Second task",
                    description: "Description of the second task"
                },
                {
                    id: v4(),
                    title: "Third task"
                },
            ];
        }
    },
    Mutation: {
        addTodo: async (
                parent: any,
                args: { title: string; description: string; },
                ctx: GqlContext,
                info: any
        ): Promise<Todo> => {
            todos.push({
                id: v4(),
                title: args.title,
                description: args.description
            });
            return todos[todos.length - 1];
        }
    }
};

export default resolvers;