import React, {useContext} from 'react';
import {TestContext} from "./ContextTester";

const UserAgeComp = React.memo(() => {
    // console.log("renderowanie komponentu UserNameComp", renders.current++);
    const {userAge} = useContext(TestContext);
    return (
        <div>
            {userAge}
        </div>
    );
});

export default UserAgeComp;
