import React, { useState, useContext, useEffect, useRef, createRef   } from 'react';
import './Products.css';
import defaultImg from '../../assets/img/default.png';
import { UserContext } from '../../providers/UserProvider';

import ProductsCard from '../ProductsCard/ProductsCard';
import { TimelineLite, TweenLite, TweenMax, gsap } from "gsap/all";
import { CSSPlugin } from 'gsap/CSSPlugin';
import Img from 'react-image';
// Force CSSPlugin to not get dropped during build
gsap.registerPlugin(CSSPlugin);



const axios = require('axios');


 const Products = ({ productsState, animateProduct }) => {

    const [user, setUser] = useContext(UserContext);

    const itemRefs = useRef([...productsState].map(() => createRef()));

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiNjY4ODVjMmY5ODAwNmQ0YzQ4YjIiLCJpYXQiOjE1Nzk5MDI2MDB9.ur63hbTPSUo4-JsdQc7d9ldLFW-IGuJkSnRjm0mo2VE';

    const pageLimit = 10;

    const [showCard, setShowCard] = useState(false);
    const [productKey, setProductKey] = useState("");
    const successCard = useRef();

    const [pointsUpdate, setPointsUpdate] = useState(false);



    useEffect(() => {
        if (pointsUpdate !== false) {
            showSuccess();
            console.log('User points updated:' + user.points);
        }else{
            console.log('User points not updated:' + user.points);
        }

    }, [user])

     const showReddemOption = (product, event) => {
         setShowCard(true);
         setProductKey(product._id);


     };

     const hideReddemOption = (product, event) => {
         setShowCard(false);
         setProductKey(product._id);

     };



    function loadDefaultImage(){

        return (
            <img className="products__default" src={defaultImg}  ></img>
        )
    }

    function showSuccess(){
        // e.preventDefault();

        successCard.current.style.pointerEvents = 'all';
        TweenMax.to(successCard.current, 0.5, { opacity: 1 });

        setTimeout(() => {
          hideSuccess();

        }, 3000);

    }

    function hideSuccess() {
        successCard.current.style.pointerEvents = 'none';
        TweenMax.to(successCard.current, 0.5, { opacity: 0 , onComplete: function () {}  });
    }




    return (




        <ul className="products" >


            <div className="success " onClick={(e) => { e.preventDefault(); hideSuccess();}} ref={successCard}> <h1>Product Redeem! <br/> You have now {user.points} points</h1></div>




            {
                productsState.map((product,i) => (




                    <React.Fragment key={product._id} >

                        <li className='products__item' onClick={(e) => {  setPointsUpdate(true); }} onMouseEnter={(e) => showReddemOption(product, e)} onMouseLeave={(e) => hideReddemOption(product, e)}  >

                             {showCard && productKey === product._id &&
                                <ProductsCard  product={product}   />

                            }
                                <div className="message" ref={itemRefs.current[product._id]}   ></div>
                                <div className="products__details">
                                <figure>

                                    <Img src={product.img.url} className="products__img scale-in-center" unloader={ loadDefaultImage() } />



                                </figure>


                                <div className="products__title "  >
                                        <p>{product.category}</p>
                                        <h3>{product.name}</h3>
                                        <p><b>{product.cost}</b> points</p>
                                </div>





                                </div>

                            </li>







                    </React.Fragment>

            ))


            }

        </ul>








    );


}

export default Products;