import { FC, useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { TPersonage } from "../types";
import { RootState } from "../store/store";
import { addFavourite, removeFavourite } from "../store/favouriteSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAsyncEntity,
} from "../store/personagesSlice";
import { colors } from "./colors";
import IconButton from "./IconButton";
import { RootStackParamList } from "../App";

const ElementContainer = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-style: solid;
  border-bottom-color: ${colors.lightGrey};
  border-bottom-width: 1px;
`;

type ElementProps = {
  name: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  speciesLink: string[] | string;
  textStyles?: {};
};

const TableElement: FC<ElementProps> = ({
  name,
  birth_year,
  gender,
  homeworld,
  speciesLink,
  textStyles,
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Details">>();

  const personages = useAppSelector(
    (state: RootState) => state.personages.personages
  );
  const planetFromState = useAppSelector(
    (state: RootState) => state.personages.planetsMap[homeworld]
  );
  const speciesFromState = useAppSelector(
    (state: RootState) => state.personages.speciesMap[speciesLink[0]]
  );
  const likedPersonages = useAppSelector(
    (state: RootState) => state.favourite.favourites
  );
  const initialIsLiked = !!likedPersonages.find(
    (personages) => personages.name === name
  );

  useEffect(() => {
    if (!planetFromState) {
      dispatch(fetchAsyncEntity({ type: "planets", link: homeworld }));
    }
    if (!speciesFromState) {
      speciesLink.length &&
        dispatch(fetchAsyncEntity({ type: "species", link: speciesLink[0] }));
    }
  }, []);

  useEffect(() => {
    setPlanetName(planetFromState || "Homeworld");
    setSpecies(speciesFromState || (name !== "Name" ? "Human" : "Species"));
  }, [planetFromState]);

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [species, setSpecies] = useState("");
  const [planetName, setPlanetName] = useState("");

  const likeHandler = () => {
    const likedPersonage = personages.find(
      (personage) => personage.name === name
    );
    if (!isLiked) {
      likedPersonage && dispatch(addFavourite(likedPersonage));
    } else {
      likedPersonage && dispatch(removeFavourite(likedPersonage));
    }
    setIsLiked((isLiked) => !isLiked);
  };

  const uiMap: Array<[string, number]> = [
    [name, 24],
    [birth_year, 18],
    [gender, 18],
    [planetName, 18],
    [species, 22],
  ];

  const openDetailsHandler = () => {
    const displayedPersonage = {
      ...personages.find((personage) => personage.name === name),
    } as TPersonage;

    if (displayedPersonage) {
      Object.assign(displayedPersonage, {
        species: species || "",
        homeworld: planetName || "",
      });
      navigation.navigate("Details", { displayedPersonage });
    }
  };

  return (
    <ElementContainer>
      <IconButton
        name={isLiked || textStyles ? "heart" : "heart-outline"}
        size={16}
        color={textStyles ? "#000" : colors.red}
        addStyles={{ width: "10%" }}
        pressHandler={likeHandler}
      />
      <Pressable
        style={{ flexDirection: "row" }}
        onPress={openDetailsHandler}
        disabled={!!textStyles}
      >
        {uiMap.map(([name, width], i) => (
          <View key={i} style={{ width: `${width}%` }}>
            <Text style={textStyles ? textStyles : { paddingLeft: 10 }}>
              {name}
            </Text>
          </View>
        ))}
      </Pressable>
    </ElementContainer>
  );
};

export default TableElement;
