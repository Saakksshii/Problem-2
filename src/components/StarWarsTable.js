import React, { useState } from "react";
import axios from "axios";

const StarWarsTable = () => {
  const [characters, setCharacters] = useState([]);

  // Function to fetch a random Star Wars character
  const addCharacter = async () => {
    let randomId;

    for (let i = 0; i < 5; i++) { // Retry up to 5 times if 404 occurs
      randomId = Math.floor(Math.random() * 83) + 1;
      console.log("Fetching character ID:", randomId);

      try {
        const response = await axios.get(`https://swapi.dev/api/people/${randomId}/`);
        console.log("API Response:", response.data);

        const newCharacter = {
          id: randomId,
          name: response.data.name || "Unknown",
          height: response.data.height || "N/A",
          gender: response.data.gender || "N/A",
        };

        setCharacters((prev) => [...prev, newCharacter]); // Update state with new character
        return; // Exit function after successful fetch
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn(`Character ID ${randomId} not found. Retrying...`);
          continue; // Retry with a new ID
        } else {
          console.error("Error fetching character:", error);
          return; // Stop on other errors
        }
      }
    }

    console.error("Failed to find a valid character after multiple attempts.");
  };

  // Function to delete a character from the table
  const deleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id));
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
