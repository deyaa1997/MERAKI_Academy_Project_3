import React, { useState } from 'react';
import axios from "axios"
export default function Dashboard({token}) {
    const [articles,setArticles] = useState([])
    const getArticle = ()=>{
        if (token){
        axios.get("http://localhost:5000/articles").then(async function(res){
            setArticles(res.data)
            console.log(res)
            
        }).catch((err)=>{
            console.log(err)
        })
    }}
    return(
    <div>
        <p>Dashboard</p>
        <button onClick={getArticle}>Get All Articles</button>
        {articles.map((elem,i)=>{
                return(<div>
                    <h1>{elem.title}<button>More Details</button></h1>
                    

                    <p>{elem.description}</p>
                </div>)
            })}
    </div>)

}