import {gql} from "apollo-server-express";

const typeDefs = gql`
    scalar Date
    
    type EntityResult {
        messages: [String!]
    }

    type User {
        id: ID!
        email: String!
        userName: String!
        password: String!
        confirmed: Boolean!
        isDisabled: Boolean!
        threads: [Thread!]
        threadItems: [ThreadItem!]
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union UserResult = User | EntityResult
    
    type Thread {
        id: ID!
        views: Int!
        points: Int!
        isDisabled: Boolean!
        title: String!
        body: String!
        user: User!
        threadItems: [ThreadItem!]
        category: ThreadCategory!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type ThreadItem {
        id: ID!
        views: Int!
        points: Int!
        isDisabled: Boolean!
        body: String!
        user: User!
        thread: Thread!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    
    type ThreadCategory {
        id: ID!
        name: String!
        description: String!
        threads: [Thread!]
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }

    union ThreadResult = Thread | EntityResult
    type ThreadArray {
        threads: [Thread!]
    }
    union ThreadArrayResult = ThreadArray | EntityResult
    
    union ThreadItemResult = ThreadItem | EntityResult
    type ThreadItemArray {
        threadItems: [ThreadItem!]
    }
    union ThreadItemArrayResult = ThreadItemArray | EntityResult

    type Query {
        getThreadById(id: ID!): ThreadResult
        getThreadsByCategoryId(categoryId: ID!): ThreadArrayResult
        getThreadItemsByThreadId(threadId: ID!): ThreadItemArrayResult
        getAllCategories: [ThreadCategory!]
        getThreadsLatest: ThreadArrayResult!
        me: UserResult!
    }

    type Mutation {
        createThread(
            userId: ID!
            categoryId: ID!
            title: String
            body: String
        ): EntityResult
        createThreadItem(            
            userId: ID!
            threadId: ID!
            body: String)
        : ThreadItemResult
        updateThreadPoint(
            userId: ID!
            threadId: ID!
            increment: Boolean!
        ): String!
        updateThreadItemPoint(
            userId: ID!
            threadItemId: ID!
            increment: Boolean!
        ): String!
        register(
            userName: String!
            email: String!
            password: String!
        ): String!
        login(
            userName: String!
            password: String!
        ): String!
        logout(userName: String!): String!
        changePassword(newPassword: String!): String!
    }
 `;

export default typeDefs;