import React, { useState, useEffect, useContext, useCallback } from 'react'
import './App.css';
import Nav from './components/Nav/Nav';
import Products from './components/Products/Products';
import ItemsNumber from './ItemsNumber';
import Banner from './Banner';


import { UserProvider } from './providers/UserProvider';
import { ProductProvider } from './providers/ProductProvider';



import { TimelineLite, CSSPlugin } from "gsap/all";

const axios = require('axios');

const App = (props) => {



          const [products, setProducts] = useState([]);

          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiNjY4ODVjMmY5ODAwNmQ0YzQ4YjIiLCJpYXQiOjE1Nzk5MDI2MDB9.ur63hbTPSUo4-JsdQc7d9ldLFW-IGuJkSnRjm0mo2VE';

          const pageLimit = 10;

          const [filterActive, setFilterActive] = useState("recent");




          const [items, setItems] = useState(pageLimit);
          const [action, setAction] = useState("");
          const [nextDisabled, setNextDisabled] = useState(false);
          const [prevDisabled, setPrevDisabled] = useState(true);

          const [currentPage, setCurrentPage] = useState(1);
          const [currentData, setCurrentData] = useState([]);

          // animations state
          const [animateProduct, setAnimateProduct] = useState(false);




          useEffect(() => {
            getProducts();


          }, []);

          useEffect(() => {
            var total = products.slice((currentPage * pageLimit) - pageLimit, currentPage * pageLimit);
            setCurrentData(total);



          }, [ currentPage, products]);





          const changePage = async (direction, event) =>{


            var numbersOfProducts = currentData.length;
              if (direction == 'prev') {

                setAction("prev");
                if (numbersOfProducts > 0) {

                  setItems(items - numbersOfProducts);

                  setCurrentPage(currentPage - 1);
                  // console.log(items);
                }


              }

              if (direction == 'next') {

                setAction("next");

                if (numbersOfProducts > 0) {
                  setCurrentPage(currentPage + 1);
                }



              }



          }

          useEffect(() => {

            // Get the real value of currentData
            var numbersOfProducts = currentData.length;
            if (numbersOfProducts === 0) {
              setCurrentPage(1);
            }

            if (action == "initial") {
              setNextDisabled(false);
              setPrevDisabled(true);
            }

            if (action === "next") {
              var total = items + numbersOfProducts;
              setItems(total);
              if (total === products.length) {
                    setNextDisabled(true);

              }else{

                    setPrevDisabled(false);
              }
            }

            if (action === "prev"){
              if( items <= pageLimit) {
                      setPrevDisabled(true);
                      setNextDisabled(false);
              }else{
                setPrevDisabled(false);
                setNextDisabled(false);
              }
            }

            const t2 = new TimelineLite({ paused: false });
            t2.set(document.getElementsByClassName('products__item'), { autoAlpha: 0, y: -20 });
            t2.staggerTo(document.getElementsByClassName('products__item'), 1, { autoAlpha: 1, y: 0 }, 0.1);


          }, [currentData])





          const getProducts = async () => {

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
            setAction("initial");
            setFilterActive("recent");
            setCurrentPage(1);
            setItems(pageLimit);
            setProducts(data);


          }





          const getLowerPrice = event => {
            const newProducts = [...products].sort((a, b) => {
              return a.cost - b.cost;
            });
            setAction("initial");
            setFilterActive("lower");
            setCurrentPage(1);
            setItems(pageLimit);
            setProducts(newProducts);

            setAnimateProduct(true);





          };

          const getHighestPrice = event => {
            const newProducts = [...products].sort((a, b) => {
              return b.cost - a.cost;
            });
            setAction("initial");
            setFilterActive("highest");
            setCurrentPage(1);
            setItems(pageLimit);
            setProducts(newProducts);

          };


          return (

            <UserProvider>

              <ProductProvider>




                    <div className="App">
                        <Nav/>
                        <Banner/>
                        <main>
                        <section className="container">
                            <ul className="container__search">
                                <li><ItemsNumber allItems={ products.length } currentItems={ items } /></li>
                                <li>
                                  <div className="container__filters">
                                    <p>Sort by: </p>
                                    <ul>
                                      {  filterActive === "recent" &&

                                      <li className="active jello-horizontal disabled" onClick={getProducts} >Most Recent</li>
                                      }
                                      {
                                          filterActive != "recent" &&

                                      <li className="hvr-grow" onClick={getProducts} >Most Recent</li>
                                      }

                                      {filterActive === "lower" &&

                                      <li className="active jello-horizontal disabled" onClick={getLowerPrice}  >Lower Price</li>
                                      }
                                      {
                                        filterActive != "lower" &&

                                      <li className="hvr-grow" onClick={getLowerPrice}  >Lower Price</li>
                                      }


                                      {filterActive === "highest" &&

                                      <li className="active jello-horizontal disabled" onClick={getHighestPrice} >Highest Price</li>
                                      }
                                      {
                                        filterActive != "highest" &&

                                      <li className="hvr-grow" onClick={getHighestPrice} >Highest Price</li>
                                      }


                                    </ul>
                                  </div>
                                  <ul className="pagination">
                            <button disabled={prevDisabled} className={prevDisabled ? 'hidden arrow round' : 'arrow round '} onClick={(e) => changePage("prev", e)} >&#8249;</button>
                            <button disabled={nextDisabled} className={nextDisabled ? 'hidden arrow round' : 'arrow round'} onClick={(e) => changePage("next", e)} >&#8250;</button>
                                  </ul>
                                </li>
                              </ul>



                      <Products className="hvr-grow" productsState={currentData} animation={animateProduct} />




                        <ul className="footer">
                        <li> <p>{items} of {products.length} products </p> </li>
                                  <li>
                                    <ul className="pagination">

                            <button disabled={prevDisabled} className={prevDisabled ? 'hidden arrow round' : 'arrow round' } onClick={(e) => changePage("prev", e)} >&#8249;</button>
                            <button disabled={nextDisabled} className={nextDisabled ? 'hidden arrow round' : 'arrow round'} onClick={(e) => changePage("next", e)} >&#8250;</button>
                                    </ul>
                                  </li>
                        </ul>



                          </section>

                        </main>


                    </div>

               </ProductProvider>

            </UserProvider>
          );
}

export default App;
