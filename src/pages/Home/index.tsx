import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { 
  CountdownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  Separator, 
  StartCountdownButton, 
  TaskInput 
} from './styles'


export function Home() {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  interface NewCycleFormData {
    task: string
    minutesAmount: number
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    
    reset()
  }

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput 
            id="task" 
            list="task-suggestions" 
            placeholder="Name your project" 
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
            placeholder="00" 
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
