import React, {useState} from 'react';
import axios from 'axios';
import { Card, Button, TextArea } from 'semantic-ui-react';
import './journalEntry.css'


export default function JournalEntry({ journal, deleteJournal, getJournals}) {
    const [isEditing, setIsEditing] = React.useState(false);
    const [formSubmission, setFormSubmission] = useState({
        title: `${journal.title}` || '',
        body: `${journal.body}` || ''
    });

    const handleChange = (event) => {
        //this updates each time text is typed on the form fields
        setFormSubmission({ ...formSubmission, [event.target.name]: event.target.value })
    };

    const onClickSave = (e, journal) => {
        console.log('GOING TO JournalEntry')
        console.log(`ID IS :${journal.id}`)
        e.preventDefault()
        axios.put(`/api/journals/${journal.id}`, formSubmission)
            .then(res => {
                setFormSubmission(res.data)
                console.log(res);
            })
            .catch(err => {
                console.log(err.response)
            })
        setIsEditing(!isEditing)
        getJournals();
    }

    const onClickEdit = (e, journal) => {
        console.log('GOING TO EDITS')
        console.log(`BUTTON WORKS: ${journal.id}`)
        setIsEditing(!isEditing)
    }


    return (
        <div>
            { isEditing ? (
                    <Card key={journal.id}>
                    <Card.Content>
                        <Card.Header>
                                <input type="text" name="title" value={formSubmission.title} onChange={handleChange} required />
                        </Card.Header>
                        <Card.Description>
                                <TextArea type="text" name="body" value={formSubmission.body} onChange={handleChange} required />
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        
                        <Button onClick={e => onClickSave(e, journal)} inverted color='blue'>
                            Save
                        </Button>
                    
                    </Card.Content>
                </Card>
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
