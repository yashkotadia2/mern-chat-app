import { PiSignOutBold } from "react-icons/pi";
import useLogout from "../../hooks/useLogout";
import { LoadingOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div style={{ marginTop: "auto", marginBottom: "1rem" }}>
      {!loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "1rem",
          }}
        >
          <PiSignOutBold
            style={{
              width: "2rem",
              height: "2rem",
              color: "#20948b",
              cursor: "pointer",
            }}
            onClick={logout}
          />{" "}
          :
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
              color: "#20948b",
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
