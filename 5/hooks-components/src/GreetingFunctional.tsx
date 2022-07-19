import React from 'react';

interface GreetingProps {
    enteredName: string;
    message: string;
    greetingDispatcher: React.Dispatch<{ type: string, payload: string }>
}

const Greeting = (props: GreetingProps) => {
    console.log("Renderuje komponent Greeting");

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.greetingDispatcher({ type: "enteredName", payload: e.target.value });
        props.greetingDispatcher({ type: "message", payload: e.target.value });
    }
    return (
        <div>
            <input type="text" value={props.enteredName} onChange={onChangeName}/>
            {props.message}
        </div>
    );
};

export default Greeting;
