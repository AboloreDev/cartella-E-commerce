import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Favorite from "./Favorite";
import CartIcon from "./CartIcon";
import ThemeToggle from "../ThemeToggle";

import MobileMenu from "./MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Login from "./Login";
import { Logs } from "lucide-react";
import Link from "next/link";
import { getAllOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getAllOrders(userId);
  }

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
              <Link href={"/orders"} className="relative hoverEffect group">
                <Logs strokeWidth={3} />
                <span className="absolute top-3 -right-1 h-4 w-4 rounded-full bg-white dark:bg-black text-xs flex items-center font-semibold justify-center">
                  {orders?.length ? orders.length : 0}
                </span>
              </Link>
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
