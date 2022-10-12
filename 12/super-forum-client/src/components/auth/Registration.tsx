import React, {FC, useReducer} from "react";
import {isPasswordValid, PasswordTestResult} from "../../common/PasswordValidator";
import ReactModal from "react-modal";
import {ModalProps} from "../types/ModalProps";
import userReducer from "../../reducers/UserReducer";
import {allowSubmit} from "../../Helpers/auth";
import PasswordComparison from "../../common/PasswordComparison";

const Registration:FC<ModalProps> = ({isOpen, onClickToggle}) => {
  const [{ userName, password, email, passwordConfirm, isSubmitDisabled, resultMsg }, dispatch] = useReducer(userReducer, {
      userName: "davec",
      password: "",
      email: "admin@dzhaven.com",
      passwordConfirm: "",
      isSubmitDisabled: true,
      resultMsg: "",
  });

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ payload: e.target.value, type: "userName" });
    if (!e.target.value)
        allowSubmit(dispatch, "Nazwa użytkownika nie może być pusta.", true);
     else
        allowSubmit(dispatch, "", false);
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({payload: e.target.value, type: "email"});
      if (!e.target.value) allowSubmit(dispatch, "E-mail nie może być pusty.", true);
      else allowSubmit(dispatch, "", false);
  }

  const onClickRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClickToggle(e);
  };

  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
      onClickToggle(e);
  }

  return (
      <ReactModal isOpen={isOpen} className="modal-menu" onRequestClose={onClickToggle} shouldCloseOnOverlayClick={true}>
          <form>
              <div className="reg-inputs">
                  <div>
                    <label>Nazwa użytkownika</label>
                    <input type="text" value={userName} onChange={onChangeUserName}/>
                  </div>
                  <div>
                      <label>E-mail</label>
                      <input type="text" value={email} onChange={onChangeEmail}/>
                  </div>
                  <PasswordComparison dispatch={dispatch} password={password} passwordConfirm={passwordConfirm}/>
              </div>

              <div className="form-button">
                  <div className="form-btn-left">
                      <button style={{ marginLeft: ".5em"}} className="action-btn" disabled={isSubmitDisabled} onClick={onClickRegister}>Rejestruj</button>
                      <button style={{ marginLeft: ".5em"}} className="cancel-btn" onClick={onClickCancel}>Zamknij</button>
                  </div>
                  <span className="form-btn-right"><strong>{resultMsg}</strong></span>
              </div>
          </form>
      </ReactModal>
  );
};

export default Registration;