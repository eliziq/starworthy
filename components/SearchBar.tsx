import {useState, useEffect } from "react";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { setSearched } from "../store/personagesSlice";

const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 10px 0;
`;

const SearchBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const changeInput = (input: string) => {
    console.log(input);

    const value = input;
    setValue(input);
    dispatch(setSearched(value));
  };

  useEffect(() => {
    dispatch(setSearched(value));
  }, [value]);

  return (
    <SearchContainer>
      <Ionicons name="search" size={24} />
      <TextInput
        onChangeText={(e) => changeInput(e)}
        value={value}
        placeholder="Search"
        style={{ width: "100%", paddingLeft: 10 }}
      />
    </SearchContainer>
  );
};

export default SearchBar;
