import { SimpleButton, simpleButtonStyle } from '@components/button/SimpleButton'
import { SimpleCard } from '@components/card/SimpleCard'
import { TextForm } from '@components/form/TextForm'
import { TodoContract } from '@contracts/todoABI'
import { MainView } from '@mainViews/MainView'
import { TodoVM } from '@mainViews/todo/TodoVM'

export const TodoView = () => {
  const VM = TodoVM()

  return (
    <MainView>
      <TextForm id="task" label="new task" val={VM.task} handleChange={VM.handleInputChange} />
      <SimpleButton label="Create" color={simpleButtonStyle.color.green} onClick={VM.handleCreateTodo} />

      <SimpleCard>
        <div>
          <div className="font-bold text-xl mb-2">TODO</div>
          {VM.getTodoList().map((todo: TodoContract, i) => (
            <p key={`todo-${i}`}>{todo.task}</p>
          ))}
        </div>
      </SimpleCard>
    </MainView>
  )
}
