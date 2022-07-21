import {useSelector} from "react-redux";
import {AppState} from "./store/AppState";

const UserDisplay = () => {
  const user = useSelector((state: AppState) => state.user);

  if (user) {
    return (<>
      <div>
        <label>Nazwa użytkownika:</label>
        &nbsp;{user.username}
      </div>
      <div>
        <label>E-mail:</label>
        &nbsp;{user.email}
      </div>
      <div>
        <label>Miasto:</label>
        &nbsp;{user.city}
      </div>
    </>);
  } else {
    return null;
  }
}

export default UserDisplay;