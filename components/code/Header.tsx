import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Favorite from "./Favorite";
import CartIcon from "./CartIcon";
import ThemeToggle from "./ThemeToggle";
import Login from "./Login";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="py-3">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-row-reverse md:gap-0">
          <Logo />
          <MobileMenu />
        </div>
        {/* NavLinks  */}
        <NavLinks />
        {/* Side NavLinks */}
        <div className=" w-auto md:w-1/3 flex items-center justify-end gap-4">
          <ThemeToggle />
          <SearchBar />
          <Favorite />
          <CartIcon />
          <Login />
        </div>
      </Container>
    </header>
  );
};

export default Header;
