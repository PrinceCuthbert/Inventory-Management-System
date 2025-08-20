import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
const Spinner = () => (
  <Flex align="center" gap="middle">
    {/* <Spin indicator={<LoadingOutlined spin />} size="small" /> */}
    {/* <Spin indicator={<LoadingOutlined spin />} /> */}
    {/* <Spin indicator={<LoadingOutlined spin />} size="large" /> */}
    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
  </Flex>
);
export default Spinner;
