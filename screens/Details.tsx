import { FC, useEffect, useState} from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { TPersonage } from "../types";
import { RouteProp } from "@react-navigation/native";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import { Card } from "../components/shared";
import { RootState } from "../store/store";
import { fetchAsyncEntity, EntityThunkPayload } from "../store/personagesSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const DetailElement = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  width: 100%;
`;

const PropText = styled.Text`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 18px;
`;

const DescText = styled.Text`
  text-transform: capitalize;
  font-size: 18px;
`;

type DetailsProp = {
  route: RouteProp<{ params: { displayedPersonage: TPersonage } }, "params">;
};

const Details: FC<DetailsProp> = ({ route }) => {
  const dispatch = useAppDispatch();

  const { displayedPersonage } = { ...route.params };

  //getting fields that we already have in state
  const films = useAppSelector((state: RootState) => state.personages.filmsMap);
  const vehicles = useAppSelector(
    (state: RootState) => state.personages.vehiclesMap
  );
  const starships = useAppSelector(
    (state: RootState) => state.personages.starshipsMap
  );

  //there will be kept fields for current personage to display
  const [displayedFilms, setDisplayedFilms] = useState<string[]>([]);
  const [displayedVehicles, setDisplayedVehicles] = useState<string[]>([]);
  const [displayedStarships, setDisplayedStarships] = useState<string[]>([]);

  useEffect(() => {

    //this function gets entities from the store (or fetches, if there is none) and sets them to displayed
    const displayStringProps = (type: EntityThunkPayload["type"]) => {
      //for planets we have different field/type names, but we do need them here anyway
      if (type !== "planets") {
        (displayedPersonage[type] as string[]).forEach((link) => {
          //general variables for starships/films/vehicles
          let entityFromStore,
            displayedEntity: string[] = [];
            //getting entities from store and assigning them to the temporary variable
          switch (type) {
            case "starships": {
              entityFromStore = starships[link];
              displayedEntity = displayedStarships;
              break;
            }
            case "films": {
              entityFromStore = films[link];
              displayedEntity = displayedFilms;
              break;
            }
            case "vehicles": {
              entityFromStore = vehicles[link];
              displayedEntity = displayedVehicles;
              break;
            }
          }
          //fetching entities that we dont have in store
          if (!entityFromStore) {
            dispatch(fetchAsyncEntity({ type: type, link }));
          } else if (!displayedEntity.includes(entityFromStore)) {
            displayedEntity.push(entityFromStore);

            switch (type) {
              case "films": {
                setDisplayedFilms(displayedEntity.slice());
                break;
              }
              case "vehicles": {
                setDisplayedVehicles(displayedEntity.slice());
                break;
              }
              case "starships": {
                setDisplayedStarships(displayedEntity.slice());
                break;
              }
            }
          }
        });
      }
    };

    displayStringProps("films");
    displayStringProps("vehicles");
    displayStringProps("starships");

  }, [films, vehicles, starships]);

  // conditional render of items depending on if its a string or an array
  const renderItem = (value: string[] | string) => {
    if (Array.isArray(value)) {
      return (
        <View style={{ alignItems: "flex-end" }}>
          {(value as string[])?.map((el, i) => (
            <DescText key={i}> {el}</DescText>
          ))}
        </View>
      );
    } else {
      return <DescText> {value}</DescText>;
    }
  };

  const renderInfo = Object.entries({
    //reassigning object with links to object with names
    ...Object.assign({}, displayedPersonage),
    films: displayedFilms,
    vehicles: displayedVehicles,
    starships: displayedStarships,
  })
    //cutting unnecessary fields
    .slice(0, 13)
    //formatting text to make it readable
    .map(([key, value], i) => (
      <DetailElement key={i}>
        <PropText>{key.split("_").join(" ")}:</PropText>
        {renderItem(value)}
      </DetailElement>
    ));

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <Card>{renderInfo}</Card>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
