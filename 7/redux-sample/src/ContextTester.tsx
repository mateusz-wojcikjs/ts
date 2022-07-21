import React, {createContext, useState} from 'react';
import UserAgeComp from "./UserAgeComp";
import UserNameComp from "./UserAgeComp";

export const TestContext = createContext<{username: string, userAge: number}>({username: "samantha", userAge: 0 });
const ContextTester = () => {
    const [userAge, setUserAge] = useState(20);
    const [localState, setLocalState] = useState(0);

    const onClickAge = () => {
        setUserAge(userAge + 1);
    }

    const onClickLocalState = () => {
        setLocalState(localState + 1);
    }

    return (
        <>
         <button onClick={onClickAge}>Aktualizuj wiek</button>
         <TestContext.Provider value={{ username: "samantha", userAge }}>
             <UserAgeComp />
         </TestContext.Provider>
            <UserNameComp />
            <br/>
            <button onClick={onClickLocalState}>Aktualizuj stan lokalny</button>
            &nbsp;<label htmlFor="">{localState}</label>
        </>
    );
};

export default ContextTester;
