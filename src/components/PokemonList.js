import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [limit, setLimit] = useState(9); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error receiving data:', error);
      }
    };
  
    fetchData();
  }, [limit]);
  

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  

const handleLoadMore = () => {
  setLimit((prevLimit) => prevLimit + 5);
};

  return (
    <div className='pokemon-container'>
      <div className="pokemon-list-container">
        <ul className='pokemon-list'>
          {pokemonList.map((pokemon, index) => (
            <div className="card">
              <li key={index} onClick={() => handlePokemonClick(pokemon)}>
              {pokemon.name}
            </li>
            </div>
          ))}
        </ul>
        <button className='load-more' onClick={handleLoadMore}>Load More</button>
      </div>
      <div className="pokemon-details-container">
        {selectedPokemon && (
          <div className="pokemon-detalis">
            <h3>{selectedPokemon.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
