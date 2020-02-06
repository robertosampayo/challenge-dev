import React, { useState, useContext, useEffect, Fragment } from 'react';
import { getHighestPrice } from '../Products/Products';
import './ProductsCard.css';
import money from '../../assets/img/money.svg';
import { UserContext } from '../../providers/UserProvider';


const axios = require('axios');

const ProductsCard = ({ product }) => {

    const [user, setUser] = useContext(UserContext);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiNjY4ODVjMmY5ODAwNmQ0YzQ4YjIiLCJpYXQiOjE1Nzk5MDI2MDB9.ur63hbTPSUo4-JsdQc7d9ldLFW-IGuJkSnRjm0mo2VE';
    const [success, setSuccess] = useState(false);

    const [redeem, setRedeem] = useState(false);



    const redeemProduct = async (e) => {

        e.preventDefault();

        if (user.points >= product.cost) {

            await axios({
                method: 'post',
                url: 'https://coding-challenge-api.aerolab.co/redeem',
                data: {
                    'productId': product._id,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token,
                }
            }).then(function (response) {

                var newPoints = user.points - product.cost;
                // console.log(newPoints);
                var newUser = { ...user };
                newUser.points = newPoints;
                setUser(newUser);
                setSuccess(true);

                setRedeem(true);




            });



        }


        // Para obtener mas puntos
        // await axios({
        //     method: 'post',
        //     url: 'https://coding-challenge-api.aerolab.co/user/points',
        //     data: {
        //         'amount': 5000,
        //     },
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': token,
        //     }
        // }).then(function (response) {
        //     // var newUser = { ...user };
        //     // newUser.points = user.points;
        //     // setUser(newUser);

        // });




    }



    return (

        <React.Fragment>

        <div>



        { (user.points < product.cost) &&

                <div className='card__inactive card__item'    >

                    <div className="card__details">

                        <div className="card__points"><h3>{product.cost} </h3> <img src={money}></img></div>

                        <button disabled >You can´t redeem</button>
                        <p className="alert__points"> You need { (product.cost - user.points) } points</p>

                    </div>



                </div>

        }

        { (user.points >= product.cost) &&

                    <div className='card__active card__item' onClick={(e) => redeemProduct(e)}   >

                { !redeem &&

                    <div className="card__details">

                            <div className="card__points"><h3>{product.cost} </h3> <img src={money}></img></div>

                        <button >Reedem now</button>

                    </div>


                }

                { redeem &&

                    <div className="card__details">

                        <div className="success__points "><h3>You have now </h3> <h1>{user.points}</h1> <img src={money}></img></div>


                    </div>

                }

                </div>
        }
        </div>
        </React.Fragment>
    );


}

export default ProductsCard;