import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import TodoList from '../components/TodoList';

const url="https://63518210dfe45bbd55c21bb3.mockapi.io/todos"

type AddFn= (text:string) =>void;



const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const getTodos = async () => {
    try {
      const {data}=await axios.get<TodoType[]>(url)
      console.log(data)
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
    
  }
  const addTodo:AddFn = async (text)={
    const newTodo={
      task: text,
      isDone:false
    }
    try {
      await axios.post(url,newTodo)
    } catch (error) {
      console.log(error)
    }

  }


  useEffect(()=>{
    getTodos();

  },[])


  

  return (
    <div className='main'>
      <InputForm  />
      <TodoList todos={todos} />
    </div>
  )
}

export default Home