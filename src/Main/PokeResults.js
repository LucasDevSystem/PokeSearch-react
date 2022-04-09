import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const PokeResults = ({ pokemons, onSelectResult }) => {
  return (
    <List>
      {pokemons.map(function (poke, index) {
        return (
          <ListPok
            key = {index}
            index={index}
            sprites={poke.sprites}
            name={poke.name}
            onClick={() => onSelectResult(pokemons[index])}
          ></ListPok>
        );
      })}
    </List>
  );
};

export default PokeResults;

const ListPok = ({sprites, name, onClick }) => {
  return (
    <ListItem>
      <Divider absolute={true} />
      <ListItemText onClick={() => onClick()} style={{ textAlign: "center" }}>
        {name}
      </ListItemText>

      <ListItemIcon style={{ height: 50, width: 100 }}>
        <img src={sprites.front_default} />
      </ListItemIcon>
    </ListItem>
  );
};
