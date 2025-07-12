import { useState, useEffect } from 'react';

import Phonebook from './components/Phonebook';
import PersonForm from './components/Personform';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState({ text: null, type: null });

  // fetch initial data from the server
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const findPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const changedPerson = { ...findPerson, number: newNumber };

    if (findPerson && findPerson.number === newNumber) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (findPerson && findPerson.number !== newNumber) {
      if (
        window.confirm(
          `${newName} ${newNumber} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === changedPerson.id ? returnedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
            setMessage({
              text: `Updated ${changedPerson.name}`,
              type: 'success',
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(() => {
            setMessage({
              text: `Information of ${changedPerson.name} has already been removed from server`,
              type: 'error',
            });
            setPersons(persons.filter((p) => p.id !== changedPerson.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };

      personService
        .create(newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');
          setMessage({ text: `Added ${newPerson.name}`, type: 'success' });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) =>
          setMessage({ text: `[error] ${error.response.data}` })
        );
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ${person.number} ?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        setMessage(`Deleted ${person.name}`);
        setTimeout(() => {
          setMessage({ text: null, type: null });
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      <Phonebook
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        newNameChange={(e) => setNewName(e.target.value)}
        newNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
