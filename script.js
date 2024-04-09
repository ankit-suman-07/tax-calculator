function calculateTax() {
    var age = document.getElementById("age").value;
    var income = parseFloat(document.getElementById("income").value);
    var extraIncome = parseFloat(document.getElementById("extraIncome").value);
    var deductions = parseFloat(document.getElementById("deductions").value);

    // Validation
    if (!age || isNaN(income) || isNaN(extraIncome) || isNaN(deductions)) {
        document.getElementById("result").innerHTML = "Please enter numbers";
        return;
    }

    // Calculate taxable income
    var taxableIncome = income + extraIncome - deductions;
    var tax = 0;
    if (taxableIncome > 8) {
        switch (age) {
            case "<40":
                tax = 0.3 * (taxableIncome - 8);
                break;
            case ">=40&<60":
                tax = 0.4 * (taxableIncome - 8);
                break;
            case ">=60":
                tax = 0.1 * (taxableIncome - 8);
                break;
        }
    }

    document.getElementById("result").innerHTML = "Tax: " + tax.toFixed(2) + " Lakhs";

    // Display modal
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    // Close the modal when clicking on the close button
    var closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    // Close the modal when clicking anywhere outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
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
