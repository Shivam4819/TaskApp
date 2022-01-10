import React, { useEffect,useState } from "react";
import AddTodo from "./components/add_todo";
import DisplayTodo from "./components/display_todo";
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs } from 'antd';
import "./App.css";
import './Bootstrap.css';
import axios from "axios";


const { TabPane } = Tabs;

function App(){

  const [arr,setArr]= useState([])
   
  useEffect(()=>{
      axios.get("http://localhost:3000/api/v1/todo")
          .then(response=> {
              setArr(response.data)
          })
  },[])

  return (
    <div className="App">
        <Tabs defaultActiveKey="1" style={{marginLeft: '80px', marginRight: '80px'}}>
          <TabPane tab="Add Todo" key="1">
            <AddTodo setArr={setArr}/>
          </TabPane>
          <TabPane tab="Display Todo" key="2">
            <DisplayTodo arr={arr}/>
          </TabPane>
        </Tabs>
    </div>
  );
}


export default App;
