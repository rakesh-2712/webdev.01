import React, { useState } from "react";
import Hero from "./components/Hero.jsx";
import MatchCard from "./components/MatchCard.jsx";
import Navbar from "./components/Navbar.jsx";

const matches = [
  {
    id: "rcb-csk",
    date: "15 May 2026",
    city: "Bengaluru",
    homeTeam: "RCB",
    awayTeam: "CSK",
    venue: "M. Chinnaswamy Stadium",
  },
  {
    id: "mi-kkr",
    date: "18 May 2026",
    city: "Mumbai",
    homeTeam: "MI",
    awayTeam: "KKR",
    venue: "Wankhede Stadium",
  },
  {
    id: "srh-dc",
    date: "20 May 2026",
    city: "Hyderabad",
    homeTeam: "SRH",
    awayTeam: "DC",
    venue: "Rajiv Gandhi International Cricket Stadium",
  },
];

const teams = [
  { value: "RCB", label: "Royal Challengers Bengaluru (RCB)" },
  { value: "CSK", label: "Chennai Super Kings (CSK)" },
  { value: "MI", label: "Mumbai Indians (MI)" },
  { value: "KKR", label: "Kolkata Knight Riders (KKR)" },
  { value: "SRH", label: "Sunrisers Hyderabad (SRH)" },
  { value: "DC", label: "Delhi Capitals (DC)" },
];

const tickets = [
  { name: "General Stand", price: "₹1000" },
  { name: "Premium Stand", price: "₹2500", featured: true },
  { name: "VIP Box", price: "₹5000" },
];

const guidelines = [
  {
    title: "Check your match",
    description:
      "Confirm the teams, date, and venue before continuing to the booking form.",
  },
  {
    title: "Choose a stand",
    description:
      "Compare the available ticket categories and review the live price summary.",
  },
  {
    title: "Review your details",
    description:
      "Enter valid contact details and check the number of tickets before submitting.",
  },
];

export default function App() {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [view, setView] = useState("grid");
  const visibleMatches = matches.filter(
    (match) =>
      selectedTeam === "all" ||
      match.homeTeam === selectedTeam ||
      match.awayTeam === selectedTeam
  );
  const matchCount = visibleMatches.length;

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="content-section" id="matches">
          <div className="section-heading">
            <p className="eyebrow">Choose your game</p>
            <h2 className="section-title">Upcoming Matches</h2>
            <p>Pick a matchup and reserve your seat in a few steps.</p>
          </div>

          <div className="match-toolbar" aria-label="Match display controls">
            <label className="team-filter" htmlFor="team-filter">
              Filter by team
              <select
                id="team-filter"
                value={selectedTeam}
                onChange={(event) => setSelectedTeam(event.target.value)}
              >
                <option value="all">All teams</option>
                {teams.map((team) => (
                  <option key={team.value} value={team.value}>{team.label}</option>
                ))}
              </select>
            </label>
            <div className="view-toggle" role="group" aria-label="Match layout">
              {["grid", "list"].map((layout) => (
                <button
                  className={`view-button${view === layout ? " is-active" : ""}`}
                  type="button"
                  key={layout}
                  aria-pressed={view === layout}
                  onClick={() => setView(layout)}
                >
                  {layout === "grid" ? "Grid view" : "List view"}
                </button>
              ))}
            </div>
          </div>

          <p className="filter-status" role="status" aria-live="polite">
            {matchCount === 1
              ? "Showing 1 match."
              : `Showing ${matchCount} matches.`}
          </p>
          <div className="match-grid" data-view={view}>
            {visibleMatches.length > 0 ? (
              visibleMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p>No upcoming matches for this team.</p>
            )}
          </div>
        </section>

        <section className="content-section ticket-section" id="tickets">
          <div className="section-heading">
            <p className="eyebrow">Find your seat</p>
            <h2 className="section-title">Ticket Categories</h2>
            <p>Choose the view that suits your match day.</p>
          </div>
          <div className="ticket-grid">
            {tickets.map((ticket, index) => (
              <article
                className={`ticket-card${ticket.featured ? " ticket-card-featured" : ""}`}
                key={ticket.name}
              >
                <span className="ticket-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{ticket.name}</h3>
                <p>{ticket.price} <span>per ticket</span></p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section guidelines-section" id="guidelines">
          <div className="section-heading">
            <p className="eyebrow">A smooth match day</p>
            <h2 className="section-title">Booking Guidelines</h2>
            <p>A few helpful reminders before you reserve your seats.</p>
          </div>
          <div className="guideline-grid">
            {guidelines.map((guideline, index) => (
              <article className="guideline-card" key={guideline.title}>
                <span className="guideline-icon" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{guideline.title}</h3>
                <p>{guideline.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="booking-cta" id="booking">
          <div>
            <p className="eyebrow">Ready for the big game?</p>
            <h2>Make it a match day to remember.</h2>
          </div>
          <a href="booking.html#booking-form" className="btn">Open Booking Form</a>
        </section>
      </main>

      <footer>
        <p>© 2026 IPL Ticket Booking Website | Designed for Web Technology Lab</p>
      </footer>
    </>
  );
}
