import React, { FC } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import { Container } from "../components/shared";
import GenderCard from "../components/GenderCard";
import TableCard from "../components/TableCard";
import Button from "../components/Button";

const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  padding: 10px;
  font-size: 24px;
`;

const Main: FC = () => {
  const genders = useAppSelector((state: RootState) => state.favourite.genders);

  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar style="dark" />
        <Container>
          <InfoContainer>
            <StyledText>Fans</StyledText>
            <Button />
          </InfoContainer>
          <InfoContainer>
            {Object.entries(genders).map(([gender, count]) => (
              <GenderCard key={gender} name={gender} count={count} />
            ))}
          </InfoContainer>
          <TableCard />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
