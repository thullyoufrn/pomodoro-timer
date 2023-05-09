import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CyclesContext } from '../..'
import { useContext } from 'react'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      task: '',
      minutesAmount: null,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">I will work on</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Name your project"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Ignite Feed"></option>
        <option value="To Do List"></option>
        <option value="Pomodoro Timer"></option>
      </datalist>

      <label htmlFor="minutesAmount">during</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="0"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
