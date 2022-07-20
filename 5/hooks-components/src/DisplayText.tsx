import React, {FC, useEffect, useState} from 'react';
import UserTodos from "./UserTodos";

interface DisplayTextProps {
    getUserFullName: (username: string) => Promise<string>;
}

const DisplayText: FC<DisplayTextProps> = ({getUserFullName}) => {
    const [txt, setTxt] = useState("");
    const [msg, setMsg] = useState("");
    const [todoControl, setTodoControl] = useState<ReturnType<typeof UserTodos>>();
    const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTxt(e.target.value);
    }

    const onClickShowMsg = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setMsg(`Testowanie reacta, ${await getUserFullName(txt)}`);
        setTodoControl(<UserTodos username={txt} />);
    }


    return (
        <form>
            <div>
                <label htmlFor="">Your name</label>
            </div>
            <div>
                <input type="text" data-testid="user-input"  value={txt} onChange={onChangeTxt} />
            </div>
            <div>
                <button data-testid="input-submit" onClick={onClickShowMsg}>Show message</button>
            </div>
            <div>
                <label htmlFor="" data-testid="final-msg">{msg}</label>
            </div>
            <ul>{todoControl}</ul>
        </form>
    );
};

export default DisplayText;
