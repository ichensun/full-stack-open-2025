import { useState } from 'react';
import Phonebook from './components/Phonebook';
import PersonForm from './components/Personform';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook value={filterName} onChange={handleFilterNameChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        newNameChange={handleNewNameChange}
        newNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons data={filteredPersons} />
    </div>
  );
};

export default App;
