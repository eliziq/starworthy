import { FC } from "react";
import { Card } from "./shared";
import Table from "./Table";
import SearchBar from "./SearchBar";

const TableCard: FC = () => {
  return (
    <Card style={{ height: "100%" }}>
      <SearchBar />
      <Table />
    </Card>
  );
};

export default TableCard;
