import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebook from './services/phonebook'; 
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebook.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      const person = persons.find(person => person.name === newName)
      const id = person.id

      if  (window.confirm(`${newName} is already added to phonebook update new number?`)){
        phonebook.update(id, personObject)
        console.log('personObject:', personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response))
          setNewName('')
          setNewNumber('')     
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      } else {
        phonebook.remove(id)
        setPersons(persons.filter(person => person.id !== id))
      }
    }

    console.log('personObject:', personObject)
    phonebook.create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')     
       })
       .catch(error => {
        console.log(error.response.data)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })    
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook.remove(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
    <h2>Phonebook</h2>

    <Notification message={errorMessage} />

    <Filter search={search} handleSearchChange={handleSearchChange}/>

    <h3>Add a new</h3>

    <PersonForm  addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

    <h3>Numbers</h3>

    <Persons persons={persons} search={search} handleDelete={handleDelete}/>
  </div>
  )
}

export default App
