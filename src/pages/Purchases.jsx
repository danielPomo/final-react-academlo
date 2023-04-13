import axios from 'axios'
import { useState, useEffect } from 'react'
import getConfig from '../utils/getConfig'
import Card from 'react-bootstrap/Card';

const Purchases = () => {

    const [ purchases, setPurchases ] = useState([])

    useEffect( () => {

        axios
            .get( "https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig() )
            .then( resp => setPurchases( resp.data ) )
            .catch( error => console.error(error) )

    }, [] )

    return (
        <div className='container mt-3'>
            <h1>My Purchases</h1>
            {
                purchases.map( item => (
                    <Card style={{ width: '100%', display: "flex", flexDirection : "row" }} key={ item.id }>
                        <Card.Img variant="left" src={item.product?.images[1].url} style={{height: 150, padding: 20}}/>
                        <Card.Body>
                            <Card.Title>{item.product?.title}</Card.Title>
                            <Card.Text>
                                Units: {item.quantity}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    )
}


export default Purchases;

