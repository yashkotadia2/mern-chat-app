import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi";
import useLogout from "../../hooks/useLogout";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginTop: "auto", marginBottom: "1rem" }}>
      {!loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "1rem",
            paddingBlock: "0.5rem",
          }}
        >
          <Modal
            centered
            title={"Logout"}
            open={open}
            onOk={logout}
            onCancel={hideModal}
            okText="Logout"
            cancelText="Cancel"
            width={300}
          >
            <p>Are you sure you want to logout?</p>
          </Modal>
          <PiSignOutBold
            style={{
              width: "2rem",
              height: "2rem",
              color: "#1995ad",
              cursor: "pointer",
            }}
            onClick={showModal}
          />{" "}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "1rem",
          }}
        >
          <LoadingOutlined
            style={{
              width: "2rem",
              height: "2rem",
              color: "#1995ad",
              fontSize: "4rem",
            }}
          />{" "}
          :
        </div>
      )}
    </div>
  );
};
export default LogoutButton;
