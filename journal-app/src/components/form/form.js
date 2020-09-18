import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Button, Form, TextArea } from 'semantic-ui-react'
import './form.css'

export default function JournalForm() { 
    const [formSubmission, setFormSubmission] = useState({});
 
    const handleChange = (event) => {
        setFormSubmission({...formSubmission, [event.target.name]: event.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
    }
    useEffect(() => {
        axios.post('/api/journals', formSubmission)
            .then(res => {
                setFormSubmission(res.data)
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    });

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field class="input-field">
                    <label>Title</label>
                    <input type="text" name="title" value={formSubmission.title} onChange={handleChange} required/>
                </Form.Field>
                <Form.Field class="input-field">
                    <label>Body</label>
                    <TextArea type="text" name="body" value={formSubmission.body} onChange={handleChange} required />
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
