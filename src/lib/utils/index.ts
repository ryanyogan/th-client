import { message, notification } from "antd";

interface Props {
  message: string;
  description?: string;
}

export const displaySuccessNotification = ({ message, description }: Props) =>
  notification["success"]({
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50,
    },
  });

export const displayErrorMessage = (error: string) => message.error(error);
