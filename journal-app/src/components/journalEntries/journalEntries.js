import React, {useState, useEffect} from 'react';
import './journalEntries.css';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react'

export default function Journals() {
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

    const deleteJounal = (e, journal) => {
        console.log(`BUTTON WORKS: ${e}`)
        console.log(journal);
        axios.delete(`/api/journals/${journal.id}`)
            .then(res => res.data)
            .catch((error) => {                
                throw error.response.data
            })
    }

    return (
        <div>
        <h2>Journals</h2>
    
        <ul>
        {journals.map(journal => (
            <li key={journal.id}>
                <Card>
                    <Card.Content>
                    <Card.Header>{journal.title}</Card.Header>
                    {/* <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                    </Card.Meta> */}
                    <Card.Description>
                        {journal.body}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button inverted color='blue'>
                            Edit
                        </Button>
                            <Button inverted color='red' onClick={e => deleteJounal(e, journal)}>
                            Delete
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
            </li>
            ))
        } 
            </ul>
        </div>
    );
};
