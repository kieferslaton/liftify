import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import moment from 'moment'

import DailyWorkout from './DailyWorkout'
import PlanForm from './PlanForm'

const Workout = ({user}) => {
    const [plan, setPlan] = useState()
    const [workoutDay, setWorkoutDay] = useState()

    useEffect(() => {
        axios.get('/plans').then(res => {
            let userPlan = res.data.find(plan => plan.user === user.username)
            console.log(userPlan)
            if(userPlan) setPlan(userPlan)
        })
    }, [])

    const passUpPlan = (plan) => {
        if(!plan) return
        setPlan(plan)
    }

    const refreshPlan = (newPlan) => {
        if(!plan || !newPlan) return
        axios.post(`/plans/update/${plan._id}`, {
            name: newPlan.name, 
            startDate: newPlan.startDate, 
            user: newPlan.user, 
            days: newPlan.days
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const closeDailyWorkout = () => {
        setWorkoutDay('')
    }

    const renderWeeks = () => {
        let startDate = moment(plan.startDate).add(12, 'hours')
        let rows =[]
        rows.push(<Row key="1" className="my-3 justify-content-center text-center"><Col>Mesocycle 1</Col></Row>)
        
        const daysRow = () => {
            let row = []
            for (let i = 0; i < 7; i++){
                row.push(<Col key={`Day Row ${i}`}>{moment(startDate).startOf('week').add(i, 'days').format('dd')}</Col>)
            }
            return (<Row key="daysRow1" className="my-3 justify-content-center text-center">{row}</Row>)
        }

        rows.push(daysRow())

        for (let i = 0; i < 5; i ++){
            let sundayOfWeek = moment(startDate).format('d') === 0 ? moment(startDate) : moment(startDate).startOf('week').add(i*7, 'days')
            let weekRow = []
            for (let j = 0; j < 7; j++){
                let workoutDay = moment(sundayOfWeek).add(j, 'days').format('YYYY-MM-DD')
                plan.days.filter(day => day.date === workoutDay).length > 0 ? 
                weekRow.push(<Col key={workoutDay} className="loaded-day m-0 p-0" onClick = {() => {
                    setWorkoutDay(workoutDay)
                }}>{moment(workoutDay).format('M/D')}</Col>) : 
                weekRow.push(<Col className="mx-0 px-0" key={workoutDay}>{moment(workoutDay).format('M/D')}</Col>)
            }
            rows.push(<Row key={`Row ${i}`} className="my-3 justify-content-center text-center">{weekRow}</Row>)
            weekRow = []
        }
        return (rows)
    }

    return (
        <div style={{maxWidth: 800, width: "100%", margin: "0 auto"}}>{plan?
            <>
            {workoutDay ?
            <Container className="m-0 p-0" style={{maxWidth: "100%", margin: "0 auto"}}>
            <DailyWorkout workoutDay={workoutDay} closeDailyWorkout={closeDailyWorkout} plan={plan} refreshPlan={refreshPlan} />
            </Container> : 
            <Container>
            {renderWeeks()}
            </Container>}
            </>:
            <Container className="my-3">
            <PlanForm user={user} passUpPlan={passUpPlan} />
            </Container>}
        </div>
    )
}

export default Workout