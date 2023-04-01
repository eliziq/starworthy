import { FC } from "react";
import { Card, StyledLoader } from "./shared";
import Table from "./Table";
import SearchBar from "./SearchBar";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

const TableCard: FC = () => {
  const isLoading = useAppSelector(
    (state: RootState) => state.personages.isLoading
  );
  return (
    <Card style={{ height: "100%" }}>
      <SearchBar />
      {isLoading ? <StyledLoader size="large" color="#000000e0" /> : ""}
      <Table />
    </Card>
  );
};

export default TableCard;
