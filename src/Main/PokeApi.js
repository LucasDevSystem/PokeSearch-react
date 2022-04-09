class PokeApi {

  static async getPokemonsColor() {
    const { results } = await getResponse(
      "https://pokeapi.co/api/v2/pokemon-color"
    );
    return results;
  }
  static async getFilteredPokemons(typeUrl, colorUrl) {
    let namesByTypeArr = [];
    let namesByColorArr = [];

    const resultByColor = await getResponse(colorUrl);
    const resultByType = await getResponse(typeUrl);

    namesByTypeArr = toArrayOfNames(resultByType.pokemon);
    namesByColorArr = toArrayOfNames(resultByColor.pokemon_species);

    let filtered = namesByTypeArr.filter((name) =>
      namesByColorArr.includes(name) ? true : false
    );

    return filtered;
  }

  static async getPokemonsType() {
    const { results } = await getResponse("https://pokeapi.co/api/v2/type");
    return results;
  }

  static async getPokemonInfoByName(pokeName) {
    let filteredInfo = {};
    const pokeMonInfo = await getResponse(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );

    filteredInfo = {
      name: pokeMonInfo.name,
      heigth: pokeMonInfo.height,
      sprites: pokeMonInfo.sprites,
      weight: pokeMonInfo.weight,
    };

    return filteredInfo;
  }
}
export default PokeApi; 

async function getResponse(url) {
  const responseAll = await fetch(url);
  const response = await responseAll.json();

  return response;
}


function toArrayOfNames(array) {
  let newArr = [];

  array.forEach((element) => {
    if(element.name){
      newArr.push(element.name);
    }else{
      newArr.push(element.pokemon.name);
    }

  });
  return newArr;
}
