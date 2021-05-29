import React , {useState} from "react"
import axios from "axios"

export default function NewArticle({token}) {
    const [message,newMessage] = useState("")
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const header = {headers:{'Authorization': `Bearer ${token}`}}
    const newArticle = ()=>{
    axios.post("http://localhost:5000/articles", {title,description},header).then((res)=>{
        if(res.status===201){
            newMessage(<div>
                <p>The article has been created successfully</p>
            </div>)
        }else{
            newMessage(<div>
                <p>Error happened while creating a new article, please try again</p>
            </div>)
        }
    }).catch((error)=>{
        console.log(error)
    })}
    return(
    <div>
        <p>NewArticle</p>
        <input type={Text} placeholder="title here" onChange={(e)=>setTitle(e.target.value) }></input>
        <br/>
        <textarea placeholder="description here" onChange={(e)=>setDescription(e.target.value) }></textarea>
        <br/>
        <button onClick={newArticle}>Create New Article</button>
        {message}
    </div>)

}