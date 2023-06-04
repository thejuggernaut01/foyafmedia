import React, { useContext } from "react";
import classes from "./SuccessModal.module.css";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ErrorModal() {
  const { closeSuccessModal } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={classes.modal}>
      <div className={classes["modal-content"]}>
        <div className={classes["modal-body"]}>
          Your Event Has Been Created!
        </div>
        <div
          onClick={() => {
            navigate("");
          }}
          className={classes["modal-footer"]}
        >
          <button
            className={classes["confirm-button"]}
            onClick={closeSuccessModal}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
