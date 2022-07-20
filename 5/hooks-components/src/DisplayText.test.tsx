import React from "react";
import {fireEvent, render, cleanup} from "@testing-library/react";
import DisplayText from "./DisplayText";
import '@testing-library/jest-dom/extend-expect';
import {wait} from "@testing-library/user-event/dist/utils";

jest.mock("./UserTodos");

describe("Test DisplayText component", () => {
    const userFullName = "Name Test";

    const getUserFullNameMock = (
        username: string
    ): [Promise<string>, jest.Mock<Promise<string>, [string]>] => {
        const promise = new Promise<string>((res, rej) => {
            res(userFullName);
        });
        const getUserFullName = jest.fn(
            async (username: string): Promise<string> => {
                return promise;
            }
        );

        return [promise, getUserFullName];
    };

    it('should display component', function () {
        const testuser = "testuser";
        const [promise, getUserFullName] = getUserFullNameMock(testuser);
        const {baseElement} = render(<DisplayText getUserFullName={getUserFullName} />);
        expect(baseElement).toBeInTheDocument();
    });

    it('should get text from input field', function () {
        const testuser = "testuser";
        const [promise, getUserFullName] = getUserFullNameMock(testuser);
        const { getByTestId } = render(<DisplayText getUserFullName={getUserFullName}/>);
        const input = getByTestId("user-input");
        fireEvent.change(input, { target: {value: testuser}});
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(testuser);
    });

    it('should show welcome message', async function () {
        const testuser = "testuser";
        const [promise, getUserFullName] = getUserFullNameMock(userFullName);
        console.log(promise)
        const msg = `Testowanie reacta, ${userFullName}`;
        const { getByTestId } = render(<DisplayText getUserFullName={getUserFullName} />);
        const input = getByTestId("user-input");
        let label = getByTestId("final-msg");
        label.innerHTML = msg;
        fireEvent.change(input, { target: { value: testuser } });
        const btn = getByTestId("input-submit");
        fireEvent.click(btn);

        expect(label).toBeInTheDocument();
        // @ts-ignore
        await wait(() => promise);
        expect(label.innerHTML).toBe(msg);
    });

    it('should be the same as snap', function () {
        const [promise, getUserFullName] = getUserFullNameMock(userFullName);
        const { baseElement } = render(<DisplayText getUserFullName={getUserFullName} />);
        expect(baseElement).toMatchSnapshot();
    });
});
