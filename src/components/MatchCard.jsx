import React from "react";

export default function MatchCard({ match }) {
  return (
    <article className="match-card">
      <div className="match-card-top">
        <span className="match-date">{match.date}</span>
        <span className="match-badge">{match.city}</span>
      </div>
      <h3>{match.homeTeam} <span>vs</span> {match.awayTeam}</h3>
      <p className="match-venue">{match.venue}</p>
      <a className="btn" href={`booking.html?match=${match.id}#booking-form`}>
        Book this match
      </a>
    </article>
  );
}
