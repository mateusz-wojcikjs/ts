import React, {useRef} from 'react';

const UserNameComp = React.memo(() => {
    const renders = useRef(0);
    console.log("renderowanie komponentu UserNameComp", renders.current++);
    const username = 'samantha'
    return (
        <div>

        </div>
    );
});

export default UserNameComp;
