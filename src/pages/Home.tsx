import axios from 'axios';
import { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import TodoList from '../components/TodoList';
import useAxios from '../hooks/useAxios'; // eslint-disable-line ile netlify de erro hatasını kaldırırz


const url = "https://63518210dfe45bbd55c21bb3.mockapi.io/todos"



const Home = () => {
  //custom hooktan da çekip burada çağırıp ve componentlere props olarak geçebiliriz. Bunları ilgili componentlerde de çağırabilirdik. Ama propslar typescriptte nasıl kullanılıyor onu görmek adına bu şekilde kullanabiliriz

  // const { todos, getTodos, addTodo, deleteTodo, toggleTodo } = useAxios()

  const [todos,setTodos] = useState<TodoType[]>([])

  const getTodos = async () => {
    try {
      const {data} = await axios.get<TodoType[]>(url)
      console.log(data)
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addTodo:AddFn= async (text) => {
    const newTodo = {
      task: text,
      isDone: false
    }
    try {
      await axios.post(url,newTodo)
      getTodos()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTodo:ToggleFn = async (item) => {
    try {
      await axios.put(`${url}/${item.id}`,{...item,isDone:!item.isDone})
      getTodos();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo:DeleteFn = async (id) => {
    try {
      await axios.delete(`${url}/${id}`)
      getTodos();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTodos()
  },[])
  

  return (
    <div className='main'>
      <InputForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  )
}

export default Home




