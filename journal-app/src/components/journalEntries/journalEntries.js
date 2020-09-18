import React, {useState, useEffect} from 'react';
import './journalEntries.css';
import axios from 'axios';

export default function Journals() {
    const [journals, setJournals] = useState([])

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
            <h2>Journals</h2>
        
            <ul>
            {journals.map(journal => (
                    <li key={journal.id}>
                        <p>{journal.title}</p>
                    </li>
                ))
            } 
             </ul>
          </div>
        );
};
