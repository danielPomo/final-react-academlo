import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsThunk,
  filterCategoriesThunk,
  filterTitleThunk
} from "../store/slices/products.slice";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState("")

  useEffect(() => {
    dispatch(getProductsThunk());
    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Container>
        <Row className="py-3" xs={1} md={2} lg={5}>
          {categories.map((category) => {
            return (
              <Col key={category.id}>
                <Button
                  className="w-100 my-3"
                  onClick={() => dispatch(filterCategoriesThunk(category.id))}
                >
                  {category.name}
                </Button>
              </Col>
            );
          })}
         <Col>
                <Button
                  className="w-100 my-3"
                  onClick={() => dispatch(getProductsThunk())}
                >
                  All
                </Button>
              </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search product by name"
                aria-label="Search product by name"
                value={inputSearch}
                onChange={e=>setInputSearch(e.target.value)}
              />
              <Button
              variant="outline-primary"
              onClick={() => dispatch(filterTitleThunk(inputSearch))}
              >Search</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="py-3">
          {products.map((product) => {
            return (
              <Col className="mb-2" key={product.id}>
                <Card className="d-flex flex-column" style={{height: "100%"}}>
                  <Card.Img
                    className="py-3 align-self-center"
                    variant="top"
                    src={product.images[0].url}
                    style={{width: "50%", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="text-truncate">{product.description}</Card.Text>
                    <Button 
                    variant="primary"
                    as={Link}
                    to = {`/products/${product.id}`}
                    >See More</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
