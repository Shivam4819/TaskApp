import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

export default function AddTodo({setArr}){

    const [taskName, setTaskName] = useState(null);
    const [description, setDescription] = useState(null);
    const [dayRequired, setDayRequired] = useState(null);
    

    function addTodo(){
        axios.post("http://localhost:3000/api/v1/todo",{
            taskName:taskName,
            description:description,
            dayRequired:dayRequired,
        }).then((response)=>{
            if(response.status===200){
                toast.success("new to created");
                getData()
            }
            else {
                toast.error("wrong input");
            }
        })
    }

    async function getData(){
        const response = await axios.get("http://localhost:3000/api/v1/todo")
        setArr(response.data)
    }


    return (
        <Form
            initialValues={{
            remember: true,
            }}
            layout="vertical" 
            autoComplete="off"
            style={{marginLeft: '100px', marginRight: '100px', marginTop: '50px'}} 
        >
            

            <Form.Item label="Task Name" name="taskname" rules={[{required: true,message: 'Please input task name!'}]}>
                <Input type="text" placeholder="Enter task name" onChange={(e)=>setTaskName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Task Description" name="taskDescription" rules={[{required: true,message: 'Please input task description'}]}>
                <Input type="text" placeholder="Enter author Name" onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Required Days" name="requiredDays" rules={[{required: true,message: 'Please input days needed'}]}>
                <Input type="number" placeholder="Enter Total days needed" onChange={(e)=>setDayRequired(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={addTodo}>
                    Submit
                </Button>
                <ToastContainer/>
            </Form.Item>
        </Form>
    );
}

