import { TodoContract, TodoABI } from '@contracts/todoABI'
import { useEffect, useState } from 'react'

export const TodoVM = () => {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

  const todoABI = new TodoABI(contractAddress)

  const [todoList, setTodoList] = useState([] as TodoContract[])
  const [task, setTask] = useState('' as string)

  const getTodoList = (): TodoContract[] => todoList

  const fetchTodo = async (id: string): Promise<TodoContract> => {
    return await todoABI.getTodo(id)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  const fetchTodoList = async () => {
    const todoList: TodoContract[] = []
    await todoABI
      .getTodoIDs()
      .then((ids: string[]) => {
        void Promise.all(
          ids.map(async (id) => {
            const todo = await fetchTodo(id)
            todoList.push(todo)
          })
        )
          .then(() => {
            setTodoList(todoList)
          })
          .catch((e) => {
            console.error(e)
          })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const createTodo = async () => {
    await todoABI.createTask(task)
  }

  const handleCreateTodo = () => {
    void createTodo()
      .then(() => {
        setTask('')
        void fetchTodoList()
      })
      .catch((e: Error) => {
        console.error(e)
      })
  }

  useEffect(() => {
    function init() {
      void fetchTodoList()
    }
    void init()
  }, [])

  return {
    handleCreateTodo,
    handleInputChange,
    getTodoList,
    task,
  }
}
