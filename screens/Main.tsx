import React, { FC, useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { RootState } from "../store/store";
import { useAppSelector } from "../store/hooks";
import { Container } from "../components/shared";
import GenderCard from "../components/GenderCard";
import TableCard from "../components/TableCard";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { getData } from "../utils";
import {
  TPersonageState,
  initPersonageState,
  persStorageKey,
} from "../store/personagesSlice";
import {
  TFavouriteState,
  favStorageKey,
  initFavouriteState,
} from "../store/favouriteSlice";

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
  const st = useAppSelector((state: RootState) => state.favourite);
  const dispatch = useDispatch();

  const [displayedGenders, setDisplayedGenders] =
    useState<[string, number][]>();

  useEffect(() => {
    // set personages initial state if there is data in storage
    getData<TPersonageState>(persStorageKey).then(
      (data) => data && dispatch(initPersonageState(data))
    );
    // set Favourite initial state if there is data in storage

    getData<TFavouriteState>(favStorageKey).then(
      (data) => data && dispatch(initFavouriteState(data))
    );
  }, []);

  useEffect(() => {
    genders && setDisplayedGenders(Object.entries(genders));
  }, [genders]);

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
            {displayedGenders?.map(([gender, count]) => (
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
