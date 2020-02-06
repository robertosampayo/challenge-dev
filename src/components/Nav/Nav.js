import React, { useState, useContext, useEffect, useRef, Fragment } from 'react';
import { UserContext } from '../../providers/UserProvider';
import './Nav.css';
import money from '../../assets/img/money.svg';
import logo from '../../assets/img/logo.svg';


const Nav = (props) => {

    const [user, setUser] = useContext(UserContext);



    return (

        <nav>
            <div className="nav__logo">
                <img className="scale-in-center" src={logo} ></img>

            </div>
            <ul>

                <li className="nav__user"> <h3 className="scale-in-center">{user.name}</h3>   </li>
                <li className="nav__points scale-in-center" >  <h3 className=""> {user.points} </h3> <img className="" src={money} ></img> </li>
            </ul>


        </nav>


    );


}

export default Nav;