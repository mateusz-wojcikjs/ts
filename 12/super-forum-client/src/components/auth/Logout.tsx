import {gql, useMutation} from "@apollo/client";
import {useSelector} from "react-redux";
import {AppState} from "../../store/AppState";
import {Me, useRefreshReduxMe} from "../../hooks/useRefreshReduxMe";
import ReactModal from "react-modal";
import {FC} from "react";
import {ModalProps} from "../types/ModalProps";

const LogoutMutation = gql`
    mutation logout($userName: String!) {
        logout(userName: $userName)
    }
`;

const Logout: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
  const user = useSelector((state: AppState) => state.user);
  const [execLogout] = useMutation(LogoutMutation, {
      refetchQueries: [
          { query: Me },
      ],
  });
  const { deleteMe } = useRefreshReduxMe();

    const onClickLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        onClickToggle(e);
        await execLogout({
            variables: {
                userName: user?.userName ?? "",
            },
        });
        deleteMe();
    };


    const onClickCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClickToggle(e);
    };

    return (
        <ReactModal
            className="modal-menu"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
        >
            <form>
                <div className="logout-inputs">
                    Czy jesteś pewny, że chcesz się wylogować?
                </div>
                <div className="form-buttons form-buttons-sm">
                    <div className="form-btn-left">
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="action-btn"
                            onClick={onClickLogin}
                        >
                            Wyloguj
                        </button>
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                            Zamknij
                        </button>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default Logout;