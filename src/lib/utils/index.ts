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

export const formatListingPrice = (
  price: number,
  round: boolean = true
): string => {
  const formattedListingPrice = round ? Math.round(price / 100) : price / 100;
  return `$${formattedListingPrice}`;
};

export const iconColor: string = "#1890ff";
