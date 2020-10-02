import React from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

const modalStyle: Modal.Styles = {
  overlay: {
    zIndex: 1000,
    background: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    background: "none",
    padding: "0",
    width: "100%",
    height: "100%",
    inset: "auto",
    border: "none",
  },
};

const MyModal: React.FC<ReactModal.Props> = (props) => {
  return (
    <Modal style={modalStyle} {...props}>
      {props.children}
    </Modal>
  );
};

export default MyModal;
