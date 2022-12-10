import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/papers/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author: event.target.Author.value,
            title: event.target.Title.value,
            institution: event.target.Institution.value,
            content: event.target.Content.value
        }),
    });

    const body = await response.json();
    console.log(body);

    if (response.status !== 200) {
        throw Error(body.message)
    }

    alert("Paper submitted successfully!");
}

// Create a form with fields for title, author, and content
const PaperForm = () => {

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="Author">
                <Form.Text className="text-muted">
                    Use previous name if you have published before.
                </Form.Text>
                <br></br>
                <Form.Control required type="text" placeholder="Full Name" />
                <Form.Text className="text-muted">
                    Use previous name if you have published before.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Institution">
                <Form.Control required type="text" placeholder="Institution" />
                <Form.Text className="text-muted">
                    Institution where you are affiliated.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Title">
                <Form.Control required type="text" placeholder="Title" />
                <Form.Text className="text-muted">
                    Summarize the main idea or ideas of your study.
                    <br></br>
                    A good title contains the fewest possible words that adequately describe the contents and/or purpose of your research paper.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Content">
                {/* <Form.Control type="textarea" placeholder="Research content" /> */}
                <textarea className="form-control" id="Content" placeholder="Research content" rows="10"></textarea>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Paper
            </Button>
        </Form>
    );
}


const App = () => (
    <Container className="p-3">
        <h4 className="header">Eleo Scientific Papers Archive</h4>
        <Jumbotron>
            <PaperForm />
        </Jumbotron>
    </Container>

);

export default App;
