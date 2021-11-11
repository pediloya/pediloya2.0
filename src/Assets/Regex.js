const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isEmail = email => {
    if (regexEmail.test(email)) return true
    return false
}

export const isMoreThanOneUrl = string => {
    if (string.includes(';') || string.includes(',')) return true
    return false
}

export const isValidURL = string => {
    let url = ''

    try {
        url = new URL(string)
    } catch (_) {
        return false
    }
    return true
}
