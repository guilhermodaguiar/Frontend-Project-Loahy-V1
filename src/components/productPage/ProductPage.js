import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function ProductPage() {

    const { id } = useParams();

   // async function getProduct() {
     //   try{
       //     const response =axios.get(`productdatabase/${id}`);
        //} catch{
        //    console.log(e);
        //}
    //}


    return(
       <div>
           Product {id}
       </div>


    )
}

export default ProductPage;