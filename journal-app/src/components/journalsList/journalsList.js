import React, {useState, useEffect} from 'react';
import './journalsList.css';
import JournalEntry from '../journalEntry/journalEntry';
import axios from 'axios';


export default function JournalsList() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        axios.get('/api/journals')
            .then(res => {
                console.log(res.data.journals)
                setJournals(res.data.journals)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    

    return (
                <div>
                    <h2>Journal Entries</h2>
                    <ul>
                    {journals.map(journal => (
                        <JournalEntry 
                            key={journal.id}
                            journal={journal}
                        />
                    ))}
                    </ul>
                </div>
                
          
    );
};
