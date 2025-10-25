import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ENDPOINT } from "../constants";

const defaultValues = {
  title: "",
  description: "",
  author: "",
  publicationYear: null,
  genre: "",
};

function UpdateModal(props) {
  const { book } = props;
  const [data, setData] = useState(defaultValues);
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const updateBook = async () => {
    try {
      await axios
        .put(`${ENDPOINT}/updateBook/${book.title}`, data)
        .then((res) => {
          props.onFinish();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  if (book) setData(book);
}, [book]);

  return (
    <Modal {...props} size="md">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update title of the book"
              name="title"
              required
              onChange={updateData}
              defaultValue={data.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update description of the book"
              name="description"
              required
              onChange={updateData}
              defaultValue={data.description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPublishedYear">
            <Form.Label>Publication Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Update publication year of the book"
              name="publicationYear"
              required
              onChange={updateData}
              defaultValue={data.publicationYear}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Author of the book"
              name="author"
              required
              onChange={updateData}
              defaultValue={data.author}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Update Genre of the book"
              name="genre"
              required
              onChange={updateData}
              defaultValue={data.genre}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              updateBook()
              props.onHide();
            }}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default UpdateModal;
