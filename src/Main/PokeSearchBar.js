import React, { useState } from "react";
import { Button } from "@mui/material";
import Select from "react-select";

const PokeSearchBar = ({ types, colors, onSearch }) => {
  const [selectedOpt, setSelectedOpt] = useState({});

  const onChangeColor = (opt) => {
    setSelectedOpt({ ...selectedOpt, colorUrl: opt.value });
  };
  const onChangeType = (opt) => {
    setSelectedOpt({ ...selectedOpt, typeUrl: opt.value });
  };
  return (
    <div style={{ display: "flex" }}>
      <Button>type:</Button>
      <div>
        <Select
          styles={{}}
          width={"300px"}
          onChange={(opt) => onChangeType(opt)}
          options={toValidOpt(types)}
        ></Select>
      </div>
      <Button>color:</Button>
      <div>
        <Select
          options={toValidOpt(colors)}
          onChange={(opt) => onChangeColor(opt)}
        ></Select>
      </div>

      <div>
        <Button
          styles={{ left: 400 }}
          onClick={() => onSearch(selectedOpt)}
          variant="outlined"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
export default PokeSearchBar;

function toValidOpt(array) {
  return array.map((opt) => ({ label: opt.name, value: opt.url }));
}
