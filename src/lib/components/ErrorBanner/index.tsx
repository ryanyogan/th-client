import { Alert } from "antd";
import React from "react";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = ({
  message = "Uh oh! Something went wrong.",
  description = "An error has occurred, please try again later.",
}: Props) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
