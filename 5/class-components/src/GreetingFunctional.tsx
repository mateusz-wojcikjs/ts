import React from 'react';

interface GreetingProps {
    message: string;
}

const Greeting = (props: GreetingProps) => {
    console.log("Renderuje komponent Greeting")
    return (
        <div>
            {props.message}
        </div>
    );
};

export default Greeting;
