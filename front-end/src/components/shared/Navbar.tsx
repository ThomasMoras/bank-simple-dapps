"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ThemeToggle } from "./ThemeToogle";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ThemeToggle />

        {/* {isConnected ? <p>Connected with {address}</p> : <p></p>} */}
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
