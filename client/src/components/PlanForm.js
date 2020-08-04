import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import moment from 'moment'
import axios from 'axios'

const PlanForm = ( { user, passUpPlan }) => {
    const [benchVal, setBenchVal] = useState('')
    const [squatVal, setSquatVal] = useState('')
    const [date, setDate] = useState('')
    const [days, setDays] = useState([])

    const handleCheckToggle = (val) => {
        if (!days.includes(val)){
            if(days.length < 4){
            setDays([...days, val])
            } else {
                let newDays = [days[0], days[1], days[2]]
                newDays.push(val)
                setDays(newDays)
            }
        } else {
            setDays(days.filter(day => day !== val))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(benchVal, squatVal, date, days)
        let plan = {}
        plan.startDate =  moment(date).startOfWeek()
        plan.user = user.username
        plan.days = []

        //First Mesocycle
        let firstCycleWeeks = 5
        for (let i = 0; i < firstCycleWeeks; i++){
            const startOfWeek = moment(date).add(i*7, 'days')
            days.forEach((day, index) => {
                let name
                let number
                let exercises = []
                const dayDate = moment(startOfWeek).add(day, 'days')
                if(index === 0){
                    name = "Chest "+(i+1)
                    number = 1
                    exercises = [
                        {
                            name: "Incline Dumbbell Press",
                            sets: [
                                {reps: 12, 
                                completeReps: 0},
                                {reps: 12, 
                                completeReps: 0},
                                {reps: 12, 
                                completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.35)/5)*5,
                        },
                        {
                            name: "Dumbbell Overhead Extension",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.35)/5)*5,
                        },
                        {
                            name: "Flat Bench Press",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.8)/5)*5,
                        },
                        {
                            name: "1-Arm Dumbbell Row",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((benchVal*0.4)/5)*5,
                        },
                        {
                            name: "Pullup",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal)/5)*5,
                        },
                        {
                            name: "Dumbbell Lateral Raise",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.075)/5)*5,
                        }
                    ]
                } else if (index === 1){
                    name = "Quads "+(i+1)
                    number = 2
                    exercises = [
                        {
                            name: "Close Stance Squat",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((squatVal*0.8)/5)*5,
                        },
                        {
                            name: "Front Squat",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((squatVal*0.75)/5)*5,
                        },
                        {
                            name: "Single Leg Curl",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((squatVal*0.25)/5)*5,
                        },
                        {
                            name: "Calf Raises",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((squatVal*0.7)/5)*5,
                        },
                        {
                            name: "Cable Tricep Pushdown",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((benchVal*0.7)/5)*5,
                        },
                        {
                            name: "Seated Dumbbell Shoulder Press",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.25)/5)*5,
                        }
                    ]
                } else if(index === 2){
                    name = "Back "+(i+1)
                    number = 3
                    exercises = [
                        {
                            name: "Chin-up",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal)/5)*5,
                        },
                        {
                            name: "Lat Pulldown",
                            sets: [
                                {reps: 12, 
                                complete: false},
                                {reps: 12, 
                                complete: false},
                                {reps: 12, 
                                complete: false}
                            ], 
                            weight: Math.ceil((benchVal*0.8)/5)*5,
                        },
                        {
                            name: "Cable Row",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((benchVal*0.9)/5)*5,
                        },
                        {
                            name: "Rear Dumbbell Flye",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.075)/5)*5,
                        },
                        {
                            name: "Incline Dumbbell Press",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.35)/5)*5,
                        },
                        {
                            name: "Flat Bench Press",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((benchVal*0.9)/5)*5,
                        }
                    ]
                } else {
                    name = "Hams/Glutes "+(i+1)
                    number = 4
                    exercises = [
                        {
                            name: "Dumbbell Walking Lunge",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((squatVal*0.2)/5)*5,
                        },
                        {
                            name: "Romanian Deadlift",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((squatVal*0.8)/5)*5,
                        },
                        {
                            name: "Hack Squat",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((squatVal*0.5)/5)*5,
                        },
                        {
                            name: "Dumbbell Curl",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((benchVal*0.15)/5)*5,
                        },
                        {
                            name: "Barbell Shrug",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ], 
                            weight: Math.ceil((benchVal*0.8)/5)*5,
                        },
                        {
                            name: "Smith Machine Calf Raise",
                            sets: [
                                {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                                    {reps: 12, 
                                    completeReps: 0},
                            ],  
                            weight: Math.ceil((squatVal*0.75)/5)*5,
                        }
                    ]
                }

                plan.days.push({
                    name: name,
                    number: number, 
                    date: dayDate.format("YYYY-MM-DD"),
                    exercises: exercises
                })
            })
        }

        axios.post('/plans/add', {
            name: 'Default',
            startDate: plan.startDate,
            user: plan.user,
            days: plan.days
        }).then(res => {
            console.log(res.data)
            passUpPlan(res.data)
        })
    }

    return(
        <Form onSubmit={handleSubmit}> 
            <Form.Group>
                <Form.Label>Bench Press (10RM)</Form.Label>
                <Form.Control type="text" value={benchVal} onChange={(e) => setBenchVal(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Squat (10RM)</Form.Label>
                <Form.Control type="text" value={squatVal} onChange={(e) => setSquatVal(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Plan Start Date</Form.Label>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Days of Week (Select 4)</Form.Label>
                <Form.Check type="checkbox" checked={days.includes('0')} label="Sunday" value='0' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('1')} label="Monday" value='1' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('2')} label="Tuesday" value='2' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('3')} label="Wednesday" value='3' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('4')} label="Thursday" value='4' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('5')} label="Friday" value='5' onClick={(e) => handleCheckToggle(e.target.value)} />
                <Form.Check type="checkbox" checked={days.includes('6')} label="Saturday" value='6' onClick={(e) => handleCheckToggle(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="accent">Make My Plan!</Button>
        </Form>
    )
}

export default PlanForm