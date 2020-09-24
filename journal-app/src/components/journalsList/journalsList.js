import React, {useState, useEffect} from 'react';
import './journalsList.css';
import JournalEntry from '../journalEntry/journalEntry';
import axios from 'axios';


export default function JournalsList() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        getJournals()
    }, []);
    
    async function getJournals() {
        let data = await axios.get('/api/journals')
            .then(res => {
                console.log(res.data.journals)
                setJournals(res.data.journals)
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function deleteJounal (e, journal) {
        console.log(`DELETING: ${journal.title}`)
        let data = axios.delete(`/api/journals/${journal.id}`)
            .then(({data}) => data)
            .catch((error) => {
                throw error.response.data
            })
        getJournals();
    }

    return (
                <div>
                    
                    <ul>
                    {journals.map(journal => (
                        <li key={journal.id}>
                        <JournalEntry 
                            journal={journal}
                            deleteJournal={deleteJounal}
                        />
                        </li>
                    ))}
                    </ul>
                </div>
                
          
    );
};
