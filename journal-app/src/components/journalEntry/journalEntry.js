import React from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';
import EditableJournalEntry from '../editableJournalEntry/editableJournalEntry';


export default function JournalEntry({ journal}) {
    const [isEditing, setIsEditing] = React.useState(false);

    const deleteJounal = (e, journal) => {
        console.log(`DELETING: ${journal.title}`)
        axios.delete(`/api/journals/${journal.id}`)
            .then(res => res.data)
            .catch((error) => {
                throw error.response.data
            })
    }

    const onClickEdit = (e, journal) => {
        console.log('GOING TO EDITS')
        console.log(`BUTTON WORKS: ${journal.id}`)
        setIsEditing(!isEditing)
    }


    return (
        <div>
            { isEditing ? (
                    <EditableJournalEntry journal={journal}/>
                ) : (
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
                            <Button onClick={e => onClickEdit(e, journal)} inverted color='blue'>
                            Edit
                        </Button>
                            <Button onClick={e => deleteJounal(e, journal)} inverted color='red'>
                            Delete
                        </Button> 
                        </div>
                    </Card.Content>
                </Card>
            </li>
        )}
    </div>
    )
}
