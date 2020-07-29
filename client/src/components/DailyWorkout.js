import React, { useState, useEffect }  from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaChevronLeft } from 'react-icons/fa'
import Exercise from './Exercise'

const DailyWorkout = ({closeDailyWorkout, workoutDay, plan, refreshPlan}) => {

    const dailyWorkout = plan.days.find(day => day.date === workoutDay)

    return (
        <Container>
        <Row className="my-3">
            <Col xs={1}><FaChevronLeft style={{cursor: 'pointer'}} onClick={closeDailyWorkout}/></Col>
            <Col xs={10} className="text-center font-weight-bold display">{dailyWorkout.name}</Col>
            <Col xs={1}></Col>
        </Row>
        {dailyWorkout.exercises.map((exercise, index) => (
            <Exercise key={index} workoutDay={workoutDay} name={exercise.name} plan={plan} refreshPlan={refreshPlan} />
        ))}
        </Container>
    )
}
export default DailyWorkout