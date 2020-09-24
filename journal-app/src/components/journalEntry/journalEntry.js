import React from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';
import EditableJournalEntry from '../editableJournalEntry/editableJournalEntry';
import './journalEntry.css'


export default function JournalEntry({ journal, deleteJournal}) {
    const [isEditing, setIsEditing] = React.useState(false);

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
                    <div key={journal.id}>
                        <Card fluid>
                            <Card.Content extra>
                                <Card.Header>{journal.title}</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Description>{journal.body}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button onClick={e => onClickEdit(e, journal)} basic color="blue">
                                        Edit
                                    </Button>
                                    <Button onClick={e => deleteJournal(e, journal)} basic color='red'>
                                        Delete
                                    </Button> 
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
        )}
    </div>
    )
}
