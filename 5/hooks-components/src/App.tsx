import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import Greeting from "./GreetingFunctional";
import ListCreator, {ListItem} from "./ListCreator";

const reducer = (state: any, action: any) => {
  console.log("enteredNameReducer");
  switch (action.type) {
    case "enteredName":
      if (state.enteredName === action.payload) return state;
      return {...state, enteredName: action.payload}
    case "message":
      return {...state, message: `Witaj, ${action.payload}`}
    default:
      throw new Error("Nie prawidłow typ akcji: " + action.type);
  }
}

const initState = {
  enteredName: "",
  message: "",
}

function App() {
  const [{message, enteredName}, dispatch] = useReducer(reducer, initState);
  const [starCount, setStarCount] = useState(0);
  const [count, setCount] = useState(0);

  const setCountCallback = useCallback(
      () => {
        const inc = count + 1 > starCount ? count + 1 : Number(count + 1) + starCount;
        setCount(inc);
      },
      [count, starCount],
  );

  const [listItems, setListItems] = useState<Array<ListItem>>();

  useEffect(() => {
    const li = [];
    for (let i = 0; i < count; i++) {
      li.push({ id: i });
    }
    setListItems(li);
  }, [count]);

  const onWelcomeBtnClick = () => {
    setCountCallback();
  }

  const onChangeStarCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStarCount(Number(e.target.value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <Greeting enteredName={enteredName} message={message} greetingDispatcher={dispatch} />

        <div>
          <label htmlFor="">Wpisz liczbę i inkrementuj ją</label>
          <br/>
          <input type="text" value={starCount} onChange={onChangeStarCount}/>
          <br/>
          <label htmlFor="">{count}</label>
          <br/>
          <button onClick={onWelcomeBtnClick}>Increment</button>
        </div>

        <div>
          <ListCreator listItems={listItems} />
        </div>
      </header>
    </div>
  );
}

export default App;
