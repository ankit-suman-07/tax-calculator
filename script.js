function calculateTax() {
    var age = document.getElementById("age").value;
    var income = parseFloat(document.getElementById("income").value);
    var extraIncome = parseFloat(document.getElementById("extraIncome").value);
    var deductions = parseFloat(document.getElementById("deductions").value);
    var ageError = document.getElementById("age-error");
    // Validation
    if (age === "empty" || !income || !extraIncome || !deductions) {
        if (age === "empty") {
            ageError.style.display = "block";
        }
        if (!income) {
            document.getElementById("income-mandatory").style.display = "block";
        }
        if (!extraIncome) {
            document.getElementById("extraIncome-mandatory").style.display = "block";
        }
        if (!deductions) {
            document.getElementById("deductions-mandatory").style.display = "block";
        }
        return
    }
    // var errorSpans = document.getElementsByClassName("error-span");
    // for (var i = 0; i < errorSpans.length; i++) {
    //     errorSpans[i].style.display = "none";
    // }


    // Calculate taxable income
    var taxableIncome = income + extraIncome - deductions;
    var tax = 0;
    if (taxableIncome > 800000) {
        switch (age) {
            case "Less than 40":
                tax = 0.3 * (taxableIncome - 800000);
                break;
            case "40 to less than 60":
                tax = 0.4 * (taxableIncome - 800000);
                break;
            case "Greater than 60":
                tax = 0.1 * (taxableIncome - 800000);
                break;
        }
    }

    if (deductions > (income + extraIncome)) {
        document.getElementById("result").innerHTML = "Deductions cannot be more than Income";

        // Display modal
        var modal = document.getElementById("modal-error");
        modal.style.display = "flex";

        // Close the modal when clicking on the close button
        var closeBtn = document.getElementsByClassName("close-error")[0];
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }

        // Close the modal when clicking anywhere outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else {
        document.getElementById("result").innerHTML = new Intl.NumberFormat('en-IN').format((taxableIncome - tax).toFixed(2));
        document.getElementById("result-error").innerHTML = "";

        // Display modal
        var modal = document.getElementById("modal");
        modal.style.display = "flex";

        // Close the modal when clicking on the close button
        var closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function () {
            modal.style.display = "none";
            document.getElementById("income").value = "";
            document.getElementById("extraIncome").value = "";
            document.getElementById("deductions").value = "";
        }

        // Close the modal when clicking anywhere outside of it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById("income").value = "";
                document.getElementById("extraIncome").value = "";
                document.getElementById("deductions").value = "";
            }
        }
    }

}

// Validate input fields
var inputs = document.getElementsByClassName("validate");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        var value = this.value;
        if (!value.match(/^\d*\.?\d*$/)) {
            var errorIcon = document.getElementById(this.id + "-error");
            errorIcon.style.display = "block";
        } else {
            var errorIcon = document.getElementById(this.id + "-error");
            errorIcon.style.display = "none";
        }

    });
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        var value = this.value;

        if (!value) {
            var errorIcon = document.getElementById(this.id + "-mandatory");
            errorIcon.style.display = "block";
        } else {
            var errorIcon = document.getElementById(this.id + "-mandatory");
            errorIcon.style.display = "none";
        }

    });
}

