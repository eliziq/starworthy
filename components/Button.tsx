import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { clearFavourite } from "../store/favouriteSlice";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { colors } from "./colors";

const ButtonContainer = styled.Pressable`
  border: 1px solid ${colors.accent};
  border-radius: 10px;
  color: ${colors.accent};
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  margin: 7.5px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  color: ${colors.accent};
`;

const Button = () => {
  const dispatch = useDispatch();
  const genders = useAppSelector((state: RootState) => state.favourite.genders);

  const onClearFans = () => {
    dispatch(clearFavourite());
    console.log("Fans cleared");
    console.log(genders);
  };

  return (
    <ButtonContainer
      onPress={onClearFans}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#ff2b2413" : "white",
      })}
    >
      <ButtonText>Clear Fans</ButtonText>
    </ButtonContainer>
  );
};

export default Button;
