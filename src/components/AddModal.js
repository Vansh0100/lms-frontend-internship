import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
const ENDPOINT = "https://lms-bakend.onrender.com";


function AddModal(props){
    const {bookTitle}=props;
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
    const addBook=(e)=>{
        e.preventDefault();
        try {
            axios.post(`${ENDPOINT}/insertBook`,data).then((res)=>console.log(res.data)).catch((err)=>console.log(err));
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
          Add Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={addBook}>
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
        Insert Book
      </Button>
    </Form>
      </Modal.Body>
    </Modal>
    )
}
export default AddModal