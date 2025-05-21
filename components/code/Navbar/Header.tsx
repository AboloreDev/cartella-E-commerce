import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Favorite from "./Favorite";
import CartIcon from "./CartIcon";
import ThemeToggle from "../ThemeToggle";

import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Login from "./Login";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="py-3 sticky top-0 z-50 backdrop-blur-md">
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
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && <Login />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
