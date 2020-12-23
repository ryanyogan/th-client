import React from "react";
import { Layout } from "antd";
import { HomeHero } from "./components";
import { RouteComponentProps } from "react-router-dom";

import mapBackground from "./assets/map-background.jpg";
import { displayErrorMessage } from "../../lib/utils";

const { Content } = Layout;

export const Home = ({ history }: RouteComponentProps) => {
  const onSearch = (value: string): void => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      displayErrorMessage("Please enter a valid search!");
      return;
    }
    history.push(`/listings/${trimmedValue}`);
  };

  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero onSearch={onSearch} />
    </Content>
  );
};
