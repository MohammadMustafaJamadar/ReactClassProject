import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

async function DataFetch(){
return await  axios.post("http://localhost:9000/home")
}

async function updateHomePageFetch(setProducts , setErrorMassage){
  try {
    const res = await DataFetch();
    const products = res.data.product
    setProducts(products);

    
  } catch (error) {
    setErrorMassage("Fetch error")
    console.log(error);
  }
}

export default function Home() {

  const [Products, setProducts] = useState([]);
  const [Price , setPrice] = useState(0)
  const [filtered , updatefiltered] = useState([]) 
  const [errorMassage , setErrorMassage] = useState("")
  
  useEffect(()=>{
   
    updateHomePageFetch(setProducts , setErrorMassage)
  },[])


  useEffect(()=>{
    const filterItems = Products.filter((item)=>{
      if(item.price < Price) return false;
      return true;
    });
    updatefiltered(filterItems)
  },[Price , Products])
  
  return (
    <>
    
    <div className="container">
    <input type="text" className="form-control" value={Price} onChange={(event)=>{setPrice(event.target.value)}} />
    <br />
    <button className="btn btn-secondary" onClick={()=>{setPrice(Price)}}>Search</button>
    
    <button className="btn btn-primary"  onClick={()=>setPrice(0)}>Clear</button>
    </div>
    
    <br />
      <h1 className="mx-5 text-center -text-bold main-headin">
        Electronic Items Order Now
      </h1>
      <hr />
    <h1>
    {errorMassage}
      </h1>  
      <div className="menu-items container-fluid mt-5 ">
        <div className="row">
          <div className="col-11 mx-auto">
            <div className="row my-5" >
              {filtered.map((element) => {
                const { id, name, price, discription, image } = element;
                return (
                
                  <div
                    className="card mb-3"
                    style={{ maxWidth: "540px" }}
                    key={id}
                  >
                    <div className="row g-0">
                      <div className="col-md-4 ">
                        <img
                          src={image}
                          className="img-fluid rounded-start  hover-zoom"
                          alt={" Not Available"}
                          
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title"> {name} </h5>
                          <p className="card-text"> {discription} </p>
                          <p className="card-text price">Price: {price} </p>
                        </div>
                      </div>
                      <div className="text-center mt-2px">
                        <button className="btn btn-outline-primary btn-sm ">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
