import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
const ENDPOINT = "http://localhost:4000";


function UpdateModal(props){
    const bookTitle=props.title;
    console.log(bookTitle);
    const [data,setData]=useState({
        title:"",
        description:"",
        author:"",
        publicationYear:null,
        genre:""

    })
    const updateData=(e)=>{
      setData({
        ...data,
        [e.target.name]:e.target.value
      })
    }
    const updateBook=(e)=>{
        e.preventDefault();
        try {
            axios.put(`${ENDPOINT}/updateBook/${bookTitle}`,data).then((res)=>console.log(res)).catch((err)=>console.log(err));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal
      {...props}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={updateBook}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Update title of the book" name='title' required onChange={updateData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Update description of the book" name='description' required onChange={updateData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPublishedYear">
        <Form.Label>Publication Year</Form.Label>
        <Form.Control type="number" placeholder="Update publication year of the book" name='publicationYear' required onChange={updateData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Update Author of the book" name='author' required onChange={updateData}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicGenre">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" placeholder="Update Genre of the book" name='genre' required onChange={updateData}/>
      </Form.Group>

      
      <Button variant="primary" type="submit" className='w-full' onClick={()=>props.onHide()}>
        Update
      </Button>
    </Form>
      </Modal.Body>
    </Modal>
    )
}
export default UpdateModal