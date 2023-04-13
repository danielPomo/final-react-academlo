import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { addProductToChartThunk } from "../store/slices/chart.slice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();

  const buyOneLess = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    console.log(detail)
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => setDetail(resp.data))
      .catch((error) => console.log(error));
  }, []);

  const addProduct = () => {
    const data = {
      quantity: counter,
      productId: id,
    };

    dispatch(addProductToChartThunk(data));
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <h2>{detail.title}</h2>
        </Col>
      </Row>
      <Row xs={1} md={2}>
        <Col>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.images?.[0].url}
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail?.images?.[1].url}
                alt="Second slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item
            >
              <img
                
                className="d-block w-100"
                src={detail?.images?.[2].url}
                alt="Third slide"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <h1>{detail.title}</h1>
          <p>{detail.description}</p>
          <Row className="mb-2">
            <Col>{detail.price}</Col>
            <Col>
              <Button
                className="me-2"
                onClick={() => buyOneLess()}
                disabled={!counter}
              >
                -
              </Button>
              <span>{counter}</span>
              <Button className="ms-2" onClick={() => setCounter(counter + 1)}>
                +
              </Button>
            </Col>
          </Row>
          <Row>
            <Button onClick={() => addProduct()}>Add to chart!</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
