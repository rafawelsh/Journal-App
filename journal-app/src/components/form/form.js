import React, {useState} from 'react';
import axios from 'axios';
import { Button, Form, TextArea } from 'semantic-ui-react'
import './form.css'

export default function JournalForm() { 
    const [formSubmission, setFormSubmission] = useState({
        title: '',
        body: ''
    });
 
    const handleChange = (event) => {
        //this updates each time text is typed on the form fields
        setFormSubmission({...formSubmission, [event.target.name]: event.target.value})
    };

    const handleSubmit = (e) => {
        console.log(formSubmission)
       
        axios.post('/api/journals', formSubmission)
            .then(res => {
                setFormSubmission(res.data)
                console.log(res);
            })
            .catch(err => {
                console.log(err.response)
            })
    };

  
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Field className="input-field">
                    <label>Title</label>
                    <input type="text" name="title" value={formSubmission.title} onChange={handleChange} required/>
                </Form.Field>
                <Form.Field className="input-field">
                    <label>Body</label>
                    <TextArea type="text" name="body" value={formSubmission.body} onChange={handleChange} required />
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
