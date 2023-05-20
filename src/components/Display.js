import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import {Circles} from 'react-loader-spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateModal from "./UpdateModal";
import images from "./images";


const ENDPOINT = "http://localhost:4000";
function DisplayBooks(props) {
  const [data, setData] = useState();
  const [isLoading,setIsLoading]=useState(true);
  const [showModal,setShowModal]=useState(false);
  const [deleteTitle,setDeleteTitle]=useState("");
  const getAllBooks = async () => {
    try {
        setIsLoading(true);
      axios
        .get(`${ENDPOINT}/getAllBooks`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBooks();
  },[]);

  const deleteHandler=async (e,title)=>{
    e.preventDefault();
    try {
        axios.delete(`${ENDPOINT}/deleteBook/${title}`).then(()=>setData(()=>data.filter((book)=>book.title!=title))
        ).catch((err)=>console.log(err))
    } catch (error) {
        console.log(error);
    }
  }
  console.log(data);
  return (
    <div className="container flex justify-center gap-5 align-middle flex-wrap mt-5">
        
      {
        isLoading?<Circles/>:<>
            {data?.map((book, idx) => {
        return (
          <Card style={{ width: "18rem" }} className="mb-3">
            <Card.Img
              variant="top"
              src={images[idx % 10]}
              style={{ height: "12rem", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.description}</Card.Text>
              <Badge bg="info" className="block">Author: {book.author}</Badge>
              <br/>
              <Badge bg="success">Published Year: {book.publicationYear}</Badge>
            </Card.Body>
            <Card.Footer className="flex gap-2">
                  <button type="" className="btn btn-outline-warning" onClick={()=>setShowModal(true)}>Update</button>
                  <UpdateModal show={showModal} onHide={()=>setShowModal(false)} title={book.title} />
                  <button type="" className="btn btn-outline-danger" onClick={(e)=>{
                    deleteHandler(e,book.title);
                  }}>Delete</button>
                </Card.Footer>
          </Card>
        );
      })}
        </>
      }
    </div>
  );
}

export default DisplayBooks;
