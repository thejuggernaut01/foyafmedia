import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import SuccessModal from "./SuccessModal";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const SuccessModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <SuccessModal />
    </Card>
  );
};

const SuccessMessageModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <SuccessModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default SuccessMessageModal;
