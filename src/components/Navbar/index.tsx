import React, { ReactNode } from "react";
import { DirectusUser } from "@directus/sdk";

const Navbar = ({
  children,
  user,
}: {
  children: ReactNode;
  user: DirectusUser;
}) => {
  console.log("🚀 ~ Navbar ~ user:", user);

  return (
    <>
      <nav className="flex items-center justify-between">
        <div>
          <h1>
            Hi! {user.first_name} {user.last_name}
          </h1>
        </div>
        <div>Right</div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
