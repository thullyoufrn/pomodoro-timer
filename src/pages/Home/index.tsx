import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

interface NewCycleFormData {
  task: string
  minutesAmount: number | null
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number | null
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      task: '',
      minutesAmount: null,
    },
  })

  console.log(cycles)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (activeCycleId === cycle.id) {
          cycle.interruptedDate = new Date()
          return cycle
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
    setAmountSecondsPassed(0)
  }

  const totalSeconds = activeCycle?.minutesAmount
    ? activeCycle.minutesAmount * 60
    : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.startDate
      )

      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setActiveCycleId(null)
          setAmountSecondsPassed(0)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro Timer'
    }
  }, [minutes, seconds, activeCycle])

  const taskField = watch('task')
  const minutesAmountField = watch('minutesAmount')
  const isSubmitDisabled = !taskField || !minutesAmountField

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
