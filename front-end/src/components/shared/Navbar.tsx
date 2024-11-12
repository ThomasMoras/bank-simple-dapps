"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeToggle } from "./ThemeToogle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ThemeToggle />
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
