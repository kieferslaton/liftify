import React, {useState, useEffect, useRef} from 'react'
import { Col } from 'react-bootstrap'

const Set = ({reps, completeReps, i, passback, enabled, repAdd}) => {
    const [complete, setComplete] = useState(completeReps)

    const loaded = useRef(false)
    useEffect(() => {
        if (loaded.current) {
        passback(complete, i)
        repAdd()
        } else {
            loaded.current = true
        }
    }, [complete])

    const handleClick = () => {
            if (complete === 0){
            setComplete(reps)
        } else if (complete > 1) {
            setComplete(complete-1)
        } else {
            setComplete(0)
        }
    }

    return (
        <Col key={i} className="text-center"><div className={`set mx-auto ${complete > 0 ? 'complete' : ''} ${enabled ? '' : 'disabled'}`} onClick={() => {
            handleClick()
        }}>{complete > 0 ? complete : reps}</div></Col>
    )
}

export default Set