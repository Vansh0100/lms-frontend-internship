import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import UpdateModal from "./UpdateModal";
import images from "./images";
import { ENDPOINT } from "../constants";

function DisplayBooks(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const deleteHandler = async (e, title) => {
    e.preventDefault();
    try {
      await axios
        .delete(`${ENDPOINT}/deleteBook/${title}`)
        .then(() => props.onFinish())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex justify-center gap-5 align-middle flex-wrap mt-5">
      {props?.isLoading ? (
        <Circles />
      ) : (
        <>
          {props.data?.map((book, idx) => (
            <Card style={{ width: "18rem" }} className="mb-3" key={idx}>
              <Card.Img
                variant="top"
                src={images[idx % 10]}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.description}</Card.Text>
                <Badge bg="info" className="block">
                  Author: {book.author}
                </Badge>
                <br />
                <Badge bg="success">
                  Published Year: {book.publicationYear}
                </Badge>
              </Card.Body>
              <Card.Footer className="flex gap-2">
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                >
                  Update
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={(e) => deleteHandler(e, book.title)}
                >
                  Delete
                </button>
              </Card.Footer>
            </Card>
          ))}

          {/* render a single modal at the bottom */}
          {selectedBook && (
            <UpdateModal
              show={showModal}
              onHide={() => setShowModal(false)}
              book={selectedBook}
              onFinish={props.onFinish}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DisplayBooks;
