import styled from "styled-components/native";
import { colors } from "./colors";

export const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  background-color: ${colors.primary};
  height: 100%;
  width: 100%;
  padding: 40px 7.5px 0px 7.5px;
`;

export const StyledLoader = styled.ActivityIndicator`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.8;
  z-index: 3;
`;

export const Card = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin: 7.5px;
  shadow-color: #000;
  shadow-offset: {
    width: 0px;
    height: 2px;
  }
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 3;
  flex: 1;
  height: auto;
`;
