import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import moment from 'moment'

import Set from './Set'

const Exercise = ({plan, workoutDay, name, refreshPlan}) => {

    const day = plan.days.find(day => day.date === workoutDay)
    const exercise = day.exercises.find(exercise => exercise.name === name)
    const exerciseIndex = day.exercises.findIndex(exercise => exercise.name === name)

    const [sets, setSets] = useState(exercise.sets)
    const [sumReps, setSumReps] = useState()
    
    const passback = (completeReps, i) => {
        const newSets = sets
        const reps = newSets[i].reps
        newSets[i] = {
            completeReps: completeReps, 
            reps: reps
        }
        setSets(newSets)

    }

    const updatePlan = () => {
        let newPlan = plan
        if (sumReps > sets.length * 10) {
            newPlan.days.forEach(planDay => {
                if (planDay.number === day.number && moment(planDay.date) > moment(day.date)){
                    if (planDay.exercises[exerciseIndex].sets.length === sets.length){
                    planDay.exercises[exerciseIndex].sets.push({
                        reps: sets[0].reps, 
                        completeReps: 0
                    })
                }
                }
            })
            console.log(newPlan)

        } else if (sumReps < sets.length * 10) {
            newPlan.days.forEach(planDay => {
                if (planDay.number === day.number && moment(planDay.date) > moment(day.date)){
                    if (planDay.exercises[exerciseIndex].sets.length > sets.length){
                    planDay.exercises[exerciseIndex].sets.pop()
                }
                }
            })
        }

        refreshPlan(newPlan)
    }

    useEffect(() => {
        updatePlan()
    }, [sumReps])

    const repAdd = () => {
        let sum = 0
        sets.forEach(set => {
            sum+= set.completeReps
        })
        setSumReps(sum)
    }

    const isEnabled = (j) => {
        return(
        j === 0 ? true : (sets[j-1] ? (sets[j-1].completeReps > 0) : false)
        )
    }

    const renderSets = (sets) => {
        let row = []
        for (let i = 0; i < sets.length; i++){
            row.push(
                <Set key={i} i={i} reps={sets[i].reps} completeReps={sets[i].completeReps} passback={passback} enabled={isEnabled(i)} repAdd={repAdd}/>
            )
        }
        return <Row className="mt-4 mb-0 justify-content-center">{row}</Row>
    } 

    return (
        <Container className="exercise-card py-4">
            <Row className="my-0 justify-content-center">
                <Col className="font-weight-bold text-center">{exercise.name} | Weight: {exercise.weight}</Col>
            </Row>
            {renderSets(exercise.sets)}
        </Container>
    )
}

export default Exercise