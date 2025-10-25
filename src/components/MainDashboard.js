import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FiLogOut } from "react-icons/fi";
import AddModal from "./AddModal";
import DisplayBooks from "./Display";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import images from "./images";
import { ENDPOINT } from "../constants";

function MainDashboard() {
  const [isLoading,setIsLoading]=useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const search = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("title-->", title);
    try {
      axios
        .post(`${ENDPOINT}/searchBooks`, { title: title })
        .then((res) => setSearchedBooks(res.data.data))
        .catch((err) => console.log(err));
        setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
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
  // console.log(data);
  // getAllBooks();
  const navigate=useNavigate();
  const logoutHandler=()=>{
    sessionStorage.clear();
    navigate('/');
  }
  console.log(searchedBooks)
  useEffect(()=>{
    if(title.length==0){
      setSearchedBooks();
    }
  })

  useEffect(()=>{
    getAllBooks()
  }, [])
  return (
    <div className="w-full h-screen">
      <div className="w-full">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">BooksHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1">Home</Nav.Link>
                {/* <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
              </Nav>
              <Button
                variant="btn btn-primary"
                className="mr-3"
                onClick={() => setShowModal(true)}
              >
                + ADD
              </Button>
              <AddModal show={showModal} onHide={() => setShowModal(false)} onFinish={()=>getAllBooks()}/>
              <Form className="d-flex" onSubmit={search}>
                <Form.Control
                  type="search"
                  placeholder="Search for books"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {setTitle(e.target.value);search(e)}}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
              <FiLogOut color="white" size={30} className="ml-3" onClick={logoutHandler}/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="w-full">
        {searchedBooks == null ? (
          <DisplayBooks data={data} loading={isLoading} onFinish={()=>getAllBooks()}/>
        ) : (
          <div className="container flex justify-center gap-5 flex-wrap mt-5">
            {
              isLoading?<Circles/>:<>
                {searchedBooks?.map((book, idx) => {
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
                  <Badge bg="info" className=" block">Author: {book.author}</Badge>
                  <Badge bg="success">
                    Published Year: {book.publicationYear}
                  </Badge>
                </Card.Body>
                
              </Card>
              )
            })}
              </>
            }
            
          </div>
        )}
        {/* <DisplayBooks/> */}
      </div>
    </div>
  );
}

export default MainDashboard;
