import React, { useState } from "react";
import axios from "axios";

const StarWarsTable = () => {
  const [characters, setCharacters] = useState([]);

  
  const addCharacter = async () => {
    const randomId = Math.floor(Math.random() * 83) + 1; 
    try {
      const response = await
       axios.get(`https://swapi.dev/api/people/${randomId}/${randomId}`);
      const newCharacter = {
        id: randomId,
        name: response.data.name,
        height: response.data.height,
        gender: response.data.gender
      };
      setCharacters([...characters, newCharacter]);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  
  const deleteCharacter = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <button onClick={addCharacter}>Add Record</button>
      <table border="1" style={{ marginTop: "10px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <tr key={char.id}>
              <td>{char.name}</td>
              <td>{char.height}</td>
              <td>{char.gender}</td>
              <td>
                <button onClick={() => deleteCharacter(char.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarWarsTable;