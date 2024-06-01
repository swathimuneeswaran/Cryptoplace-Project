import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHanlder = (event) => {
    setInput(event.target.value);
    if(event.target.value === "")
      {
        setDisplayCoin(allCoin)
      }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins=await allCoin.filter(
      (item) =>{
        return item.name.toLowerCase().includes(input.toLowerCase()) 
      } 
    );
    setDisplayCoin(coins)
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
    //  console.log(displayCoin)
  }, [allCoin]);

  return (
    <>
      <div className="home">
        <div className="hero">
          <h1>
            Largest <br /> Crypto Marketplace
          </h1>
          <p>
            Welcome to the world's largest marketplace.Signup to explore more
            about cryptos
          </p>
          <form onSubmit={searchHandler}>
            <input
              type="text"
              onChange={inputHanlder}
              value={input}
              required
              list="coinlist"
              placeholder="Search Crypto.."
            />


            <datalist id="coinlist">
              {allCoin.map((item,index)=>(
                 <option key={index}>value={item.name}</option>
              ))}
            </datalist>




            <button type="submit">Search</button>
          </form>
        </div>
        <div className="crypto_table">
          <div className="table_layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className="market-cap">Market Cap</p>
          </div>
          {displayCoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`}className="table_layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}{" "}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {" "}
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
