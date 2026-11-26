import React, { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#matches", label: "Matches" },
  { href: "#tickets", label: "Tickets" },
  { href: "booking.html#booking-form", label: "Booking" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="nav-container">
        <a className="brand" href="#home" aria-label="IPL Tickets home">
          <span className="brand-mark" aria-hidden="true">IPL</span>
          <span>Ticket Booking</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          className={`nav-links${isOpen ? " is-open" : ""}`}
          id="primary-navigation"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
