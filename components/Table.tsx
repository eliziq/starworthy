import { FC, useEffect, useState } from "react";
import { FlatList, ListRenderItem, Text } from "react-native";
import styled from "styled-components/native";
import { TPersonage } from "../types";
import { RootState } from "../store/store";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchAsyncPersonages } from "../store/personagesSlice";
import { colors } from "./colors";
import TableElement from "./TableElement";
import IconButton from "./IconButton";

const StyledList = styled(FlatList<TPersonage>)`
  min-width: 700px;
  height: 100%;
`;

const StyledScroll = styled.ScrollView`
  border: 1px solid ${colors.lightGrey};
  border-radius: 10px;
  height: 100%;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

const Table: FC = () => {
  const dispatch = useAppDispatch();

  const personagesList = useAppSelector(
    (state: RootState) => state.personages.personages
  );
  const searchedList = useAppSelector(
    (state: RootState) => state.personages.searched.results
  );
  const searchQuery = useAppSelector(
    (state: RootState) => state.personages.searched.searchQuery
  );
  const previousPage = useAppSelector(
    (state: RootState) => state.personages.page.previous
  );
  const nextPage = useAppSelector(
    (state: RootState) => state.personages.page.next
  );

  useEffect(() => {
    dispatch(fetchAsyncPersonages("https://swapi.dev/api/people/?page=1"));
  }, []);

  useEffect(() => {
    setDisplayedList(personagesList);
  }, [personagesList]);

  useEffect(() => {
    setDisplayedList(searchQuery ? searchedList : personagesList);
  }, [searchQuery]);

  const [page, setPage] = useState(1);
  const [displayedList, setDisplayedList] = useState(personagesList);
  // const [displayedList, setDisplayedList] = useState([] as TPersonage[]);

  const changePageHandler = (dir: string | null) => {
    if (dir) {
      const newPage = dir.charAt(dir.length - 1);
      setPage(+newPage);
      dispatch(fetchAsyncPersonages(dir));
    }
  };

  const Item = ({ item }: { item: TPersonage }) => (
    <TableElement
      name={item.name}
      birth_year={item.birth_year}
      gender={item.gender}
      homeworld={item.homeworld}
      speciesLink={item.species}
    />
  );

  const ListHeader = () => (
    <TableElement
      name="Name"
      birth_year="Birth Year"
      gender="Gender"
      homeworld="Home World"
      speciesLink="Species"
      textStyles={{
        fontWeight: "600",
        borderLeftColor: colors.lightGrey,
        borderLeftWidth: 2,
        paddingLeft: 10,
      }}
    />
  );

  const ListFooter = () => (
    <FooterContainer>
      <Text>
        {page * 10 - 9} - {page * 10} of 82
      </Text>
      <IconButton
        name="arrow-back"
        color="#000000"
        size={24}
        addStyles={{ paddingLeft: 15 }}
        pressHandler={() => changePageHandler(previousPage)}
      />
      <IconButton
        name="arrow-forward"
        color="#000000"
        size={24}
        addStyles={{ paddingLeft: 15 }}
        pressHandler={() => changePageHandler(nextPage)}
      />
    </FooterContainer>
  );

  const renderItem: ListRenderItem<TPersonage> = ({ item }) => (
    <Item item={item} />
  );

  return (
    <StyledScroll horizontal>
      <>
        {personagesList && (
          <StyledList
            data={displayedList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
          />
        )}
      </>
    </StyledScroll>
  );
};

export default Table;
