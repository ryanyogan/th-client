import React from "react";
import { Card, List, Skeleton, Typography } from "antd";

import listingLoadingCardCover from "../../assets/listing-loading-card-cover.jpg";

const { Title } = Typography;

interface Props {
  title: string;
}

export const HomeListingsSkeleton = ({ title }: Props) => {
  const data = [{}, {}, {}, {}];

  return (
    <div className="home-listings-skeleton">
      <Title level={4} className="home-listings__title">
        {title}
      </Title>
      <Skeleton paragraph={{ rows: 0 }} />
      <List
        grid={{
          gutter: 8,
          xs: 1,
          md: 2,
          lg: 4,
        }}
        dataSource={data}
        renderItem={() => (
          <List.Item>
            <Card
              cover={
                <div
                  style={{
                    backgroundImage: `url(${listingLoadingCardCover})`,
                  }}
                  className="home-listings-skeleton__card-cover-img"
                ></div>
              }
              loading
            />
          </List.Item>
        )}
      />
    </div>
  );
};
