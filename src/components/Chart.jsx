import Button  from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getChartThunk, cartCheckoutThunk  } from '../store/slices/chart.slice';

const Chart = ({show, handleClose}) => {
    const dispatch = useDispatch()
    const chartProducts = useSelector( state => state.chart )

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush">
            {
                chartProducts.map( chartProduct => {
                    return(
                        <ListGroup.Item key={chartProduct.id}>
                          <h6>{chartProduct.product.title}</h6>
                          <Row>
                            <Col>
                              <img className='w-25' src={chartProduct.product.images[2].url} alt="" />
                            </Col>
                            <Col>
                              <h6>{chartProduct.quantity} units</h6>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                    )
                } )
            }
        </ListGroup>
        <Button
        onClick={() => dispatch(cartCheckoutThunk())}>Checkout</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Chart;

