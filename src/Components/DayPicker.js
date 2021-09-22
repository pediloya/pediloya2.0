import React, { useState, useEffect } from 'react'

import DayPicker from 'react-day-picker'
import { localeUtils } from '../Assets/localUtils'
import { fiveDays, tenDays, fifteenDays } from '../Assets/disableDays'
import 'react-day-picker/lib/style.css'
import { useCrearPedido } from '../Context/CrearPedidoContext'

const CrearPedidoStepDayP = ({ timeAhead, label, handleFunction }) => {
    const { secondSelect } = useCrearPedido()

    const [timeAheadDisable, setTimeAheadDisable] = useState('')

    const [formatedDay, setFormatedDay] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)

    useEffect(() => {
        if (timeAhead === 5) return setTimeAheadDisable(fiveDays)
        if (timeAhead === 10) return setTimeAheadDisable(tenDays)
        if (timeAhead === 15) return setTimeAheadDisable(fifteenDays)
        return setTimeAheadDisable([])
    }, [timeAheadDisable])

    useEffect(() => {
        setFormatedDay(null)
        setSelectedDay(null)
    }, [secondSelect])

    const handleSelected = (day, formatedDay) => {
        setFormatedDay(formatedDay)
        setSelectedDay(day)
        handleFunction(day, formatedDay)
    }
    const handleDeselected = () => {
        setFormatedDay(null)
        setSelectedDay(null)
        handleFunction(null, null)
    }

    const handleDayClick = (day, { selected, disabled }) => {
        if (!disabled) {
            if (!selected) {
                return handleSelected(day, localeUtils.formatDayMonthYear(day))
            }
            return handleDeselected()
        }
    }
    return (
        <div className='dayPicker'>
            <p>{label}</p>
            <DayPicker
                fromMonth={new Date()}
                locale='es'
                localeUtils={localeUtils}
                onDayClick={handleDayClick}
                selectedDays={selectedDay}
                disabledDays={[...timeAheadDisable, { daysOfWeek: [0, 6] }, { before: new Date() }]}
            />
            <p className='text-center'>{formatedDay ? formatedDay : 'Selecciona un día'}</p>
        </div>
    )
}

export default CrearPedidoStepDayP
