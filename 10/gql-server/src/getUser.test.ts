import {makeExecutableSchema} from "graphql-tools";
import {addMockFunctionsToSchema} from "apollo-server-express";
// @ts-ignore
import faker from "faker";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {testGraphQLQuery} from "./testGraphQLQuery";

describe("Testuję pobieranie danych użytkownika", () => {
    const GetUser = `
        query GetUser($id: ID!) {
            getUser(id: $id) {
                id
                username
                email
            }
        }
    `;

    it('pobiera odpowiedniego użytkownika', async () => {
        const schema = makeExecutableSchema({ typeDefs, resolvers });
        const userId = faker.random.alphaNumeric(20);
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const mocks = {
            User: () => ({
                id: userId,
                username,
                email,
            }),
        };

        console.log("id", userId);
        console.log("username", username);
        console.log("email", email);

        addMockFunctionsToSchema({ schema, mocks });

        const queryResponse = await testGraphQLQuery({
            schema,
            source: GetUser,
            variableValues: { id: faker.random.alphaNumeric(20) },
        });

        const result = queryResponse.data ? queryResponse.data.getUser : null;
        console.log("result", result);

        expect(result).toEqual({
            id: userId,
            username,
            email,
        });
    });
});