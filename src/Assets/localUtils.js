const WEEKDAYS_LONG = {
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
}
const WEEKDAYS_SHORT = {
    es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
}
const MONTHS = {
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
}

const FIRST_DAY = {
    es: 0,
}

const formatDayMonthYear = d => {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

function formatDay(d, locale = 'es') {
    return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
}

function formatMonthTitle(d, locale = 'es') {
    return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
}

function formatWeekdayShort(i, locale) {
    return WEEKDAYS_SHORT[locale][i]
}

function formatWeekdayLong(i, locale) {
    return WEEKDAYS_SHORT[locale][i]
}

function getFirstDayOfWeek(locale) {
    return FIRST_DAY[locale]
}

export const localeUtils = {
    formatDay,
    formatDayMonthYear,
    formatMonthTitle,
    formatWeekdayShort,
    formatWeekdayLong,
    getFirstDayOfWeek,
}
