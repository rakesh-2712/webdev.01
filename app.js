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

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

if (menuToggle && primaryNavigation) {
    function setNavigationOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
        primaryNavigation.classList.toggle("is-open", isOpen);
    }

    menuToggle.addEventListener("click", function () {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        setNavigationOpen(!isOpen);
    });

    primaryNavigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setNavigationOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setNavigationOpen(false);
            menuToggle.focus();
        }
    });
}

const matchList = document.getElementById("match-list");
const teamFilter = document.getElementById("team-filter");

if (matchList && teamFilter) {
    const matchCards = Array.from(matchList.querySelectorAll(".match-card"));
    const filterStatus = document.getElementById("filter-status");
    const viewButtons = document.querySelectorAll(".view-button");

    teamFilter.addEventListener("change", function () {
        const selectedTeam = teamFilter.value;
        let visibleCount = 0;

        matchCards.forEach(function (card) {
            const teams = card.dataset.teams.split(" ");
            const shouldShow = selectedTeam === "all" || teams.includes(selectedTeam);

            card.hidden = !shouldShow;
            if (shouldShow) {
                visibleCount += 1;
            }
        });

        const message = visibleCount === 1
            ? "Showing 1 match."
            : "Showing " + visibleCount + " matches.";
        filterStatus.textContent = message;
        showToast(message);
    });

    viewButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedView = button.dataset.view;

            matchList.dataset.view = selectedView;
            viewButtons.forEach(function (viewButton) {
                const isActive = viewButton === button;

                viewButton.classList.toggle("is-active", isActive);
                viewButton.setAttribute("aria-pressed", String(isActive));
            });
        });
    });
}

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
