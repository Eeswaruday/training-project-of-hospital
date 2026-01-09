function goToRecomendation() {
    let selectedCheckboxes = document.querySelectorAll("input[type='checkbox']:checked");
    if (selectedCheckboxes.length > 0) {
        let symptoms = [];
        selectedCheckboxes.forEach((checkedbox) => {
            symptoms.push(checkedbox.value);
        });
        localStorage.setItem("symptoms", JSON.stringify(symptoms));
        location.href = "recomendation.html";
    } else {
        alert("Please select at least one symptom.");
    }
}
function showRecomendation(){
    let symptoms = JSON.parse(localStorage.getItem("symptoms") || "[]");
    if (!symptoms || symptoms.length === 0) {
        document.getElementById("result").innerHTML = "<h2>No symptoms selected.</h2>";
        return;
    }
    let severity = "";
    let recommendation = "";
    if (symptoms.includes("Fever") || symptoms.includes("Shortness of Breath") || symptoms.includes("Chest Pain")) {
        severity = "High Severity";
        recommendation = "Consult a General Physician immediately.";
    } else if (symptoms.includes("Cough") || symptoms.includes("Sore Throat") || symptoms.includes("Cold")) {
        severity = "Medium Severity";
        recommendation = "Consult a General Physician within 2 days.";
    } else {
        severity = "Low Severity";
        recommendation = "Self-care at home. Consult a doctor if symptoms worsen.";
    }
    document.getElementById("result").innerHTML = `\
        <h2>Based on your symptoms, we recommend the following:</h2>\
        <b>Symptoms:</b> ${symptoms.join(", ")}<br>\
        <b>Severity:</b> ${severity}<br>\
        <b>Recommendation:</b> ${recommendation}`;
    localStorage.setItem("severity", severity);
    localStorage.setItem("doctor", recommendation);
}
function confirmAppointment(){
    const pnameEl = document.getElementById("pname");
    const emailEl = document.getElementById("email");
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");
    const ageEl = document.getElementById("age");
    const doctorEl = document.getElementById("doctor");
    if (!pnameEl || !emailEl || !dateEl || !timeEl || !ageEl || !doctorEl) {
        alert("Form elements not found.");
        return false;
    }
    localStorage.setItem("pname", pnameEl.value);
    localStorage.setItem("email", emailEl.value);
    localStorage.setItem("date", dateEl.value);
    localStorage.setItem("time", timeEl.value);
    localStorage.setItem("age", ageEl.value);
    // store both the option value and visible text for the selected doctor
    localStorage.setItem("doctor_value", doctorEl.value);
    const doctorText = doctorEl.options[doctorEl.selectedIndex] ? doctorEl.options[doctorEl.selectedIndex].text : "";
    localStorage.setItem("doctor_selected", doctorText);

    window.location.href = "confirmation.html";
    return false;
}