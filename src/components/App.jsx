import { useState, useEffect } from "react";

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { set, get } from '../utils/localStorageActions';

import { nanoid } from "nanoid";

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [findName, setFindName] = useState('');

    useEffect(() => {
        if (!get()) {
            return;
        }
        setContacts(get());
    }, []);

    useEffect( () => set(contacts), [contacts] );

    const nameInputId = () => { return nanoid(); }

    const handleAddName = event => {
        event.preventDefault();

        const { id, value: name } = event.target.elements.name;
        const { value: number } = event.target.elements.number;

        if (contacts.map(user => user.name).includes(name)) {
            alert(`${name} is already in contacts`);
            return;
        }
        setContacts( [...contacts, { id, name, number }] );
        event.target.reset();
    }

    const handleFindName = ({ target }) => {
        setFindName(target.value.toLowerCase());
    }

    const handleDeleteName = (id) => {
        setContacts( contacts.filter(user => user.id !== id) );
    }

    return (
        <div className="data">

            <h1>Phonebook</h1>

            <ContactForm addName={handleAddName} nameInputId={nameInputId} />

            <h2>Contacts</h2>

            <Filter findName={handleFindName} />

            <ContactList contacts={contacts} findName={findName} deleteName={handleDeleteName} />

        </div>
    )
}