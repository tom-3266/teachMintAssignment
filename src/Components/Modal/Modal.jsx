import React from "react";
import styles from "./modal.module.scss";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const Modal = ({ setModalOpenVal, modalOpenVal }) => {
  return (
    <>
      <div
        className={styles["backgroundColor"]}
        onClick={() =>
          setModalOpenVal({ open: false, title: "", description: "" })
        }
      />
      <div className={styles["centered"]}>
        <div className={styles["modal"]}>
          <div className={styles["heading"]}>
            <CloseOutlined
              onClick={() =>
                setModalOpenVal({ open: false, title: "", description: "" })
              }
              style={{ color: "black" }}
            />
          </div>

          <div className={styles["modalContent-title"]}>
            {modalOpenVal.title}
          </div>
          <div className={styles["modalContent-description"]}>
            {modalOpenVal.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
