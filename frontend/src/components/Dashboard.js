import React, { useState , useEffect} from 'react';
import axios from "axios"
export default function Dashboard({token}) {
    const [articles,setArticles] = useState([])
    useEffect(() => {
        if (token){
        axios.get("http://localhost:5000/articles").then( function(res){
            setArticles(res.data)
            
        })
    }}

    , []);
    const getArticle = ()=>{
        if (token){
        axios.get("http://localhost:5000/articles").then( function(res){
            setArticles(res.data)
            console.log(res)
            
        }).catch((err)=>{
            console.log(err)
        })
    }}
    return(
    <div className="Rigster">
        <p>Dashboard</p>
        <button className="btn" onClick={getArticle}>Get All Articles</button>
        {articles.map((elem,i)=>{
                return(<div className="grid">
                <div className="Dashboard">
                    <h1 >{elem.title}<button className="btn2">More Details</button></h1>
                    

                    <p >{elem.description}</p>
                </div></div>)
            })}
    </div>)

}