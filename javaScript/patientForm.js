const patientForm = document.getElementById("patientForm");
const retrieveData = document.getElementById("submit");
const fName = document.getElementById("fName");
const mName = document.getElementById("mName");
const lName = document.getElementById("lName");
const address = document.getElementById("address");
const mobileNumber = document.getElementById("mobileNumber");
const birthDate = document.getElementById("birthDate");
const gender = document.querySelector('input[name="gender"]:checked');
const medicalHistory = document.querySelectorAll('input[name="medicalHistory"]');
const currentSymptoms = document.getElementById("currentSymptoms");
const medicationYes = document.getElementById("medicationYes");
let storedPatientForm = localStorage.getItem('patientForms');
let patientForms = storedPatientForm ? JSON.parse(storedPatientForm) : [];
let medicalHistoryValues = [];

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
        const valName = /^[a-zA-Z ]+$/;
        const mobileNumber = /^(09)\d{9}$/;
        switch (field.id) {
            case "fName":
                if (valName.test(field.value)) {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;
            case "mName":
                if (valName.test(field.value)) {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;
            case "lName":
                if (valName.test(field.value)) {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;
            case "mobileNumber":
                if (mobileNumber.test(field.value)) {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;
            case "birthDate":
                let date = new Date(field.valueAsNumber || field.value);
                let maxDateString = "2004-01-01"; // Set maximum date to January 1, 2004
                let maxDate = new Date(maxDateString);
                console.log(date);
                console.log(maxDate);
                if (!isNaN(date.getTime()) && date <= maxDate) {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;

            default:
                if (field.value != "") {
                    if (field.classList.contains("border-danger")) {
                        field.classList.remove("border-danger")
                    }
                    field.classList.add("border-success");
                } else {
                    if (field.classList.contains("border-success")) {
                        field.classList.remove("border-success");
                    }
                    field.classList.add("border-danger");
                }
                break;

        }
    }
    validateOnSubmit() {
        let selfForm = this;
        this.form.addEventListener("submit", (event) => {
            let isValid = true;
            selfForm.fields.forEach(field => {
                let input = document.querySelector(`#${field}`);
                selfForm.validateFields(input);
                if (input.classList.contains("border-danger")) {
                    isValid = false;
                }
            })
            if (!isValid) {
                event.preventDefault(); // prevent form submission if validation failed
            }
        });
    }

}
let patientFormField = ["fName", "mName", "lName", "address", "mobileNumber", "birthDate"];
let validatePatientForm = new ValidateForm(patientForm, patientFormField);
validatePatientForm.initializeForm();

function showInput() {
    medicationYes.classList.remove("d-none");
    medicationYes.classList.add("d-block");
}
function hideInput() {
    medicationYes.classList.remove("d-block");
    medicationYes.classList.add("d-none");
}

function addPatientForm() {
    const medication = document.querySelector('input[name="medication"]:checked').value;
    medicalHistory.forEach((checkbox) => {
        if (checkbox.checked) {
            medicalHistoryValues.push(checkbox.value);
            console.log(checkbox);

        }
    });


    let patientForm = {
        fName: fName.value,
        mName: mName.value,
        lName: lName.value,
        address: address.value,
        mobileNumber: mobileNumber.value,
        birthDate: birthDate.value,
        gender: gender.value,
        medicalHistory: medicalHistoryValues,
        medication: medication,
        currentSymptoms: currentSymptoms.value
    }
    patientForms.push(patientForm);
    localStorage.setItem('patientForms', JSON.stringify(patientForms));


}



window.onload = function () {
    const patientForm = document.getElementById("patientForm");
    patientForm.onsubmit = addPatientForm;

};
