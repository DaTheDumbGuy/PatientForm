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
