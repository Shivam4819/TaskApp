import  React ,{useEffect,useState}from "react";
import {Button} from 'antd';
import axios from "axios";

export default function DisplayTodo({arr}){

    const [arr2,setArr]= useState(arr)

    function completed(id){
        axios.put("http://localhost:3000/api/v1/todo",{
            id:id,
            status:"Completed",
        }).then((response)=>{
            if(response.status===200){
                getData()
            }
            else {
                console.log("wrong input");
            }
        })
    }

    function progress(id){
        axios.put("http://localhost:3000/api/v1/todo",{
            id:id,
            status:"In Progress"
        }).then((response)=>{
            if(response.status===200){
                getData()
            }
            else {
                console.log("wrong input");
            }
        })
    }
    
    async function getData(){
        const response = await axios.get("http://localhost:3000/api/v1/todo")
        console.log("Data:", response.data);
        setArr(response.data)
    }

    return(
        <div>
            <h2>Todo</h2>

            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Days Needed</th>
                        <th>Current Status</th>
                        <th>In Progress</th>
                        <th>Completed</th>
                     
                    </tr>
                    </thead>
                    <tbody>
                    {
                        arr2.map(value => {
                            return (
                                value.status!="completed" ?
                                <tr>
                                    <td>{value.taskName}</td>
                                    <td>{value.description}</td>
                                    <td>{value.dayRequired}</td>
                                    <td>{value.status}</td>
                                    <td><Button className="btn btn-success" onClick={() =>progress(value.id)}>In Progress</Button></td>
                                    <td><Button className="btn btn-success" onClick={() =>completed(value.id)}>completed</Button></td>
                                </tr>
                                :
                                <></>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

