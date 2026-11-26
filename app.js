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
    const standSelect = bookingForm.querySelector("#stand");
    const ticketQuantity = bookingForm.querySelector("#tickets");
    const summary = bookingForm.querySelector(".booking-summary");
    const summaryMatch = summary.querySelector("[data-summary-match]");
    const summaryStand = summary.querySelector("[data-summary-stand]");
    const summaryPrice = summary.querySelector("[data-summary-price]");
    const summaryQuantity = summary.querySelector("[data-summary-quantity]");
    const summaryTotal = summary.querySelector("[data-summary-total]");
    const summaryNote = summary.querySelector("[data-summary-note]");
    const requestedMatch = new URLSearchParams(window.location.search).get("match");
    const requestedMatchOption = Array.from(matchSelect.options).find(function (option) {
        return option.value === requestedMatch;
    });

    function updateBookingSummary(announce) {
        const selectedMatch = matchSelect.selectedOptions[0];
        const selectedStand = standSelect.selectedOptions[0];
        const ticketCount = Number(ticketQuantity.value);
        const standPrice = Number(selectedStand && selectedStand.dataset.price);
        const validTicketCount = ticketQuantity.value !== "" &&
            ticketQuantity.validity.valid;
        const hasValidSelection = Boolean(
            selectedMatch &&
            selectedMatch.value &&
            selectedStand &&
            selectedStand.value &&
            Number.isFinite(standPrice) &&
            validTicketCount
        );

        summaryMatch.textContent = selectedMatch && selectedMatch.value
            ? selectedMatch.textContent
            : "Not selected";
        summaryStand.textContent = selectedStand && selectedStand.value
            ? selectedStand.textContent.split(" — ")[0]
            : "Not selected";
        summaryPrice.textContent = selectedStand && selectedStand.value &&
            Number.isFinite(standPrice)
            ? "₹" + standPrice.toLocaleString("en-IN")
            : "—";
        summaryQuantity.textContent = ticketQuantity.value || "Not selected";
        summaryTotal.textContent = hasValidSelection
            ? "₹" + (standPrice * ticketCount).toLocaleString("en-IN")
            : "—";
        summaryNote.textContent = hasValidSelection
            ? "Total for " + ticketCount + " ticket" +
                (ticketCount === 1 ? "" : "s") + "."
            : "Select a match, stand, and valid ticket quantity to calculate your total.";

        if (announce) {
            showToast("Booking summary updated.");
        }
    }

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

    updateBookingSummary(false);

    [matchSelect, standSelect, ticketQuantity].forEach(function (control) {
        control.addEventListener("change", function () {
            updateBookingSummary(true);
        });
    });

    ticketQuantity.addEventListener("input", function () {
        updateBookingSummary(false);
    });

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formStatus.textContent =
            "All fields are valid. This demo does not send or store your booking.";
        showToast("Your booking details are valid.");
    });

    bookingForm.addEventListener("reset", function () {
        formStatus.textContent = "";
        window.setTimeout(function () {
            updateBookingSummary(false);
        }, 0);
    });
}
