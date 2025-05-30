import NoAccess from "@/components/code/NoAccess";

import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import FavoriteItems from "@/components/code/FavoriteItems";

const FavoritePage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <FavoriteItems />
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don’t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default FavoritePage;
