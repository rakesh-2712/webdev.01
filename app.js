function showToast(message) {
    let toast = document.getElementById("app-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "app-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.setAttribute("aria-atomic", "true");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    window.clearTimeout(showToast.timeoutId);
    showToast.timeoutId = window.setTimeout(function () {
        toast.classList.remove("is-visible");
    }, 3500);
}

window.showToast = showToast;

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    const formStatus = document.getElementById("form-status");
    const matchSelect = document.getElementById("match");
    const requestedMatch = new URLSearchParams(window.location.search).get("match");
    const requestedMatchOption = Array.from(matchSelect.options).find(function (option) {
        return option.value === requestedMatch;
    });

    if (window.location.hash === "#booking-form") {
        window.requestAnimationFrame(function () {
            bookingForm.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    if (requestedMatchOption) {
        matchSelect.value = requestedMatchOption.value;
        const matchName = requestedMatchOption.textContent.split(" — ")[0];

        showToast(matchName + " selected. Complete your booking below.");
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formStatus.textContent =
            "All fields are valid. This demo does not send or store your booking.";
        showToast("Your booking details are valid.");
    });

    bookingForm.addEventListener("reset", function () {
        formStatus.textContent = "";
    });
}
