import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import PokeSearchBar from "./PokeSearchBar";
import PokeGraph from "./PokeGraph";
import PokeResults from "./PokeResults";
import PokeApi from "./PokeApi";
//            PIKACHU DA LEI
//  aqui comeca a busca por pokemons.
const  Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsColor, setPokemonsColor] = useState([]);
  const [pokemonsType, setPokemonsType] = useState([]);
  const [pokemonToCompair, setPokemonToCompair] = useState({});

  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    const pokeColor = await PokeApi.getPokemonsColor();
    const pokeType = await PokeApi.getPokemonsType();

    setPokemonsType(pokeType);
    setPokemonsColor(pokeColor);
  }

  const onSearch = async ({ colorUrl, typeUrl }) => {
    let pokeFiltered = await PokeApi.getFilteredPokemons(typeUrl, colorUrl);
    pokeFiltered = await getPokemonsInfo([...pokeFiltered]);

    setPokemons(pokeFiltered);
  };
  const onSelectResult = (selected) => {
    setPokemonToCompair(selected);
  };
  return (
    <>
      <TopTitle />

      <PokeSearchBar
        types={pokemonsType}
        colors={pokemonsColor}
        onSearch={(selection) => onSearch(selection)}
      ></PokeSearchBar>
      {pokemons.length !== 0 ? (
        <>
          <Divider textAlign="left"> {"results:" + pokemons.length}</Divider>
          <div style={{ height: 290 }}>
            <PokeGraph
              compairedData={pokemonToCompair}
              data={pokemons}
            ></PokeGraph>
          </div>
          <div style={{ textAlign: "center", fontSize: 25 }}>
            <Divider textAlign="left">Names</Divider>
          </div>
          <div>
            <PokeResults
              onSelectResult={(selected) => onSelectResult(selected)}
              pokemons={pokemons}
            ></PokeResults>
          </div>
        </>
      ) : (
        "search"
      )}
    </>
  );
}

export default Main;

const TopTitle = () => {
  return (
    <div style={{ textAlign: "center", fontSize: 30 }}>
      Search Pok statistics
    </div>
  );
};

async function getPokemonsInfo(pokeArr) {
  let pokeInfoArr = [];
  for (const poke of pokeArr) {
    let pokeInfo;
    pokeInfo = await PokeApi.getPokemonInfoByName(poke);
    pokeInfoArr.push(pokeInfo);
  }

  return pokeInfoArr;
}
