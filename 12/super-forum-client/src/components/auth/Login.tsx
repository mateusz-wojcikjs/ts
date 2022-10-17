import React, {FC, useEffect, useReducer} from 'react';
import userReducer from "../../reducers/UserReducer";
import ReactModal from "react-modal";
import {ModalProps} from "../types/ModalProps";
import {allowSubmit} from "../../Helpers/auth";
import {useDispatch} from "react-redux";
import {UserProfileSetType} from "../../store/user/Reducer";
import User from "../../models/User";
import {gql, useMutation} from "@apollo/client";
import {Me, useRefreshReduxMe} from "../../hooks/useRefreshReduxMe";

const LoginMutation = gql`
    mutation Login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password)
    }
`;


const Login: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
    const [execLogin] = useMutation(LoginMutation, {
        refetchQueries: [
            {query: Me}
        ]
    })
    const [{ userName, password, resultMsg, isSubmitDisabled }, dispatch] = useReducer(userReducer, {
        userName: "",
        password: "",
        resultMsg: "",
        isSubmitDisabled: true,
    });

    const { execMe, updateMe } = useRefreshReduxMe();

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "userName", payload: e.target.value });
        if (!e.target.value)
            allowSubmit(dispatch, "Nazwa użytkownika nie może być pusta", true);
        else allowSubmit(dispatch, "", false);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "password", payload: e.target.value });
        if (!e.target.value)
            allowSubmit(dispatch, "Hasło nie może być puste", true);
        else allowSubmit(dispatch, "", false);
    };

    const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onClickToggle(e);
        const result = await execLogin({
            variables: {
                userName,
                password,
            },
        });
        execMe();
        updateMe();
    };

    const profileDispatch = useDispatch();
    useEffect(() => {
        profileDispatch({
            type: User,
            payload: {
                id: 1,
                userName: "testUser"
            },
        });
    }, [profileDispatch]);

    const onClickCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClickToggle(e);
    };

    return (
        <ReactModal className="modal-menu" isOpen={isOpen} onRequestClose={onClickToggle} shouldCloseOnOverlayClick={true}>
            <form>
                <div className="reg-inputs">
                    <div>
                        <label>Nazwa użytkownika</label>
                        <input type="text" value={userName} onChange={onChangeUserName} />
                    </div>
                    <div>
                        <label>Hasło</label>
                        <input
                            type="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                </div>
                <div className="form-buttons form-buttons-sm">
                    <div className="form-btn-left">
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="action-btn"
                            disabled={isSubmitDisabled}
                            onClick={onClickLogin}
                        >
                            Zaloguj
                        </button>
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                            Zamknij
                        </button>
                    </div>

                    <span className="form-btn-left">
            <strong>{resultMsg}</strong>
          </span>
                </div>
            </form>
        </ReactModal>
    );
};

export default Login;
