import React, { useState, createContext, useEffect } from 'react'

const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiNjY4ODVjMmY5ODAwNmQ0YzQ4YjIiLCJpYXQiOjE1Nzk5MDI2MDB9.ur63hbTPSUo4-JsdQc7d9ldLFW-IGuJkSnRjm0mo2VE';


export const ProductContext = createContext(null);

export const ProductProvider = props => {

    const [products, setProducts] = useState([ ]);



    const fetchProduct = async () => {
        const result = await axios(
            'https://coding-challenge-api.aerolab.co/products',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token,

                },
            }
        );
        const data = await result.data;
        setProducts(data);


    };

    useEffect(() => { fetchProduct(); }, []);



    return (

        <ProductContext.Provider value={[products, setProducts]}>
            {props.children}

        </ProductContext.Provider>

    );
}