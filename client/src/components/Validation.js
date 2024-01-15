function Validation(values) {
    let error = {}

    const email_pattern = /[\w\d]+@[\w]+\.[\w]+/
    const password_pattern = /^[\w!@#$%^&*]{8,}$/
    const name_pattern = /([A-Z a-z])+/


    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }
    else {
        error.email = ""
    }

    if (values.name === "") {
        error.name = "Name should not be empty"
    }
    else if (!name_pattern.test(values.email)) {
        error.name = "Name didn't match"
    }
    else {
        error.name = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    }

    else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }
    else {
        error.password = ""
    }

    return error;
}

export default Validation;