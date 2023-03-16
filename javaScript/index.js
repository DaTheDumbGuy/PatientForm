class ValidateForm {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }
    initializeForm() {
        this.validateOnInput();
        this.validateOnSubmit();
    }
    validateOnInput() {
        let selfForm = this;
        this.fields.forEach(field => {
            let input = document.querySelector(`#${field}`);
            input.addEventListener("input", () => {
                selfForm.validateFields(input)

            })

        });

    }
    validateFields(field) {

        //FrogNald Approach
        let label = field.previousElementSibling.textContent;
        let errorMessage = field.nextElementSibling;
        const regEmail = /\S+@\S+\.\S+/;


        if (field.id == "confirm_password") {
            if (field.value == document.getElementById("regPassword").value && field.value != "") {
                errorMessage.textContent = "Success";
                errorMessage.classList.remove("text-danger");
                errorMessage.classList.add("text-success");
                field.classList.remove("border-danger");
                field.classList.add("border-success", "border-2");
            } else {
                errorMessage.textContent = `Error`;
                errorMessage.classList.remove("text-success");
                errorMessage.classList.add("text-danger");
                field.classList.remove("border-success");
                field.classList.add("border-danger", "border-2");
            }
        } else if (field.id == "email") {

            if (regEmail.test(field.value)) {
                errorMessage.textContent = "Success";
                errorMessage.classList.remove("text-danger");
                errorMessage.classList.add("text-success");
                field.classList.remove("border-danger");
                field.classList.add("border-success", "border-2");
            } else {
                errorMessage.textContent = `${label} Should Have @gmail.com`;
                errorMessage.classList.remove("text-success");
                errorMessage.classList.add("text-danger");
                field.classList.remove("border-success");
                field.classList.add("border-danger", "border-2");
            }

        } else if (field.value.trim() == "") {
            errorMessage.textContent = `${label} cannot be empty`;
            errorMessage.classList.remove("text-success");
            errorMessage.classList.add("text-danger");
            field.classList.remove("border-success");
            field.classList.add("border-danger", "border-2");
        } else {
            errorMessage.textContent = "Success";
            errorMessage.classList.remove("text-danger");
            errorMessage.classList.add("text-success");
            field.classList.remove("border-danger");
            field.classList.add("border-success", "border-2");
        }


    }
    validateOnSubmit() {
        let selfForm = this;
        this.form.addEventListener("submit", (event) => {
            selfForm.fields.forEach(field => {
                let input = document.querySelector(`#${field}`);
                selfForm.validateFields(input);

            })
        });
    }

}
const createAccount = document.querySelector("#createAccount");
const regPassword = document.getElementById("regPassword");
const confirm_password = document.getElementById("confirm_password");
const regUsername = document.getElementById("regUsername");
const email = document.getElementById("email");
const logIn = document.getElementById("formLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");
let createAccountFields = ['regUsername', 'email', 'regPassword', 'confirm_password'];
let logInFields = ['username', 'password'];

function accountForms() {
    let account = {
        accountID: Date.now(),
        username: regUsername.value,
        password: regPassword.value,
        email: email.value,
    };

    localStorage.setItem(account.username, JSON.stringify(account));
}

function loginCheck(event) {
    let userAccount = localStorage.getItem(`${username.value}`);
    let user = userAccount ? JSON.parse(userAccount) : [];
    if (user.length == 0) {
        alert("Username not found!");
        username.nextElementSibling.textContent = "Try Again";
        password.nextElementSibling.textContent = "Try Again";
        username.nextElementSibling.classList.remove("text-success");
        password.nextElementSibling.classList.remove("text-success");
        username.nextElementSibling.classList.add("text-danger");
        password.nextElementSibling.classList.add("text-danger");

        if (username.classList.contains("border-success")) {
            username.classList.add("border-danger");
            password.classList.add("border-danger");

        }
        event.preventDefault();
        logIn.action = '#';
    } else {
        let checker = (password.value == user.password) ? true : false;
        if (checker) {
            alert("Success!");
            logIn.action = '/patientForm.html';

        } else {
            alert("Username and password did not match!");
            username.nextElementSibling.textContent = "Try Again";
            password.nextElementSibling.textContent = "Try Again";
            username.nextElementSibling.classList.remove("text-success");
            password.nextElementSibling.classList.remove("text-success");
            username.nextElementSibling.classList.add("text-danger");
            password.nextElementSibling.classList.add("text-danger");
            if (!username.classList.contains("border-danger")) {
                username.classList.add("border-danger");
                password.classList.add("border-danger");

            }
            event.preventDefault();
            logIn.action = `#`;
        }
    }
}


let newAccount = new ValidateForm(createAccount, createAccountFields);
newAccount.initializeForm();

let logInAccount = new ValidateForm(logIn, logInFields);
logInAccount.initializeForm();

window.onload = function () {
    createAccount.onsubmit = accountForms;
    logIn.onsubmit = loginCheck;
}


