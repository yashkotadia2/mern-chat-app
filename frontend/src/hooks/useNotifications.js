import { notification } from "antd";

const useNotifications = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, msg, desc, duration) => {
    api[type]({
      message: msg,
      description: desc,
      duration: duration,
    });
  };

  const setNotificationState = (state) => {
    openNotificationWithIcon(
      state.type,
      state.msg || state.type.charAt(0).toUpperCase() + state.type.slice(1),
      state.desc,
      state.duration || 2
    );
  };

  return { setNotificationState, contextHolder };
};

export default useNotifications;
