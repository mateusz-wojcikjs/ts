import React, {FC, useEffect, useState} from 'react';

interface GreetingProps {
    name?: string;
}

const Greetings: FC<GreetingProps> = ({name}: GreetingProps) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (name) {
            setMessage(`Witaj z Greeting, ${name}.`);
        }
    }, []);

    if (!name) {
        return <div>Nie podano imienia!</div>
    }
    return (
        <div>
            {message}
        </div>
    );
};

export default Greetings;
