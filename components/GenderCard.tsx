import { FC } from "react";
import styled from "styled-components/native";
import { Card } from "./shared";

const Count = styled.Text`
  color: black;
  font-size: 30px;
  `;

const GenderPlaceholder = styled.Text`
  color: black;
  font-size: 14px;
  text-transform: capitalize;
`;

export type GenderCardProps = {
  name: string;
  count: number;
};

const GenderCard: FC<GenderCardProps> = ({ name, count }) => {
  return (
    <Card>
      <Count>{count}</Count>
      <GenderPlaceholder>{name}</GenderPlaceholder>
    </Card>
  );
};

export default GenderCard;
