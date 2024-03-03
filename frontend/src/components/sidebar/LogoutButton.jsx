import { PiSignOutBold } from "react-icons/pi";
import useLogout from "../../hooks/useLogout";
import { LoadingOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div style={{ marginTop: "auto", marginBottom: "1rem"}}>
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
              height: "1.5rem",
              color: "#20948b",
              cursor: "pointer",
            }}
            onClick={logout}
          />
        </div>
      ) : (
        <LoadingOutlined
          style={{
            color: "#20948b",
            width: "fit-content",
            fontSize: "4rem",
            margin: "auto",
          }}
        />
      )}
    </div>
  );
};
export default LogoutButton;
