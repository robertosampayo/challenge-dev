import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from './providers/ProductProvider';

const ItemsNumber = ({allItems, currentItems}) => {

    const [products, setProducts] = useContext(ProductContext);



    return (


        <p>{ currentItems } of { allItems } products </p>
    );


}

export default ItemsNumber;