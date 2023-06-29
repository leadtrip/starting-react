import React from 'react';
import './App.css';
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from '@mui/material/Button';

// @ts-ignore
const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
        <Button
            variant="contained"
            color="primary"
            onClick={() => onSelect(pokemon)} >Select</Button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.shape({
            english: PropTypes.string
        }),
        type: PropTypes.arrayOf(PropTypes.string),
    }),
    onSelect: PropTypes.func,
}

// @ts-ignore
const PokemonInfo = ({name, base}) => (
    <div>
        <h1>{name.english}</h1>
        <table>
            {
                Object.keys(base).map(key => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{base[key]}</td>
                    </tr>
                ))
            }
        </table>
    </div>
)

PokemonInfo.prototypes = {
    name: PropTypes.shape({
        english: PropTypes.string,
    }),
    base: PropTypes.shape({
        HP: PropTypes.number.isRequired,
        Attack: PropTypes.number.isRequired,
        Defense: PropTypes.number.isRequired,
        "Sp. Attack": PropTypes.number.isRequired,
        "Sp. Defense": PropTypes.number.isRequired,
        Speed: PropTypes.number.isRequired
    })
};

const Title = styled.h1`
  text-align: center;
 `

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`

function App() {
    const [filter, filterSet] = React.useState("")
    const [pokemon, pokemonSet] = React.useState([])
    const [selectedItem, selectedItemSet] = React.useState()

    React.useEffect(() => {
       fetch("http://localhost:3000/starting-react/pokemon.json")
           .then(resp => resp.json())
           .then(data => pokemonSet(data))
    }, [])

  // @ts-ignore
    return (
    <Container>
      <Title>Pokemon search</Title>
        <TwoColumnLayout>
            <div>
                <Input
                    value={filter}
                    onChange={(evt) => filterSet(evt.target.value)}
                />
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon
                      // @ts-ignore
                      .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                      .map(pokemon => (
                      // @ts-ignore
                      <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
                  ))}
                </tbody>
              </table>
            </div>
            {selectedItem &&
                // @ts-ignore
                <PokemonInfo {...selectedItem} />}
        </TwoColumnLayout>
    </Container>
  );
}

export default App;
