import React, {useState, useEffect} from 'react';
import './journalsList.css';
import JournalEntry from '../journalEntry/journalEntry';
import JournalForm from '../journalForm/jounalForm';

import axios from 'axios';


export default function JournalsList() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        getJournals()
    }, []);
    
    const getJournals = () => {
        axios.get('/api/journals')
            .then(res => {
                setJournals(res.data.journals)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteJounal = (e, journal) => {
        axios.delete(`/api/journals/${journal.id}`)
            .then(({data}) => data)
            .catch((error) => {
                throw error.response.data
            })
        getJournals();
    }

    return (
            <div>
                <JournalForm getJournals={getJournals}/>
                <ul>
                {journals.map(journal => (
                    <li key={journal.id}>
                    <JournalEntry 
                        journal={journal}
                        deleteJournal={deleteJounal}
                        getJournals={getJournals}
                    />
                    </li>
                ))}
                </ul>
            </div>
    );
};
