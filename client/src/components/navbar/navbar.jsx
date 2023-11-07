import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import Toggle from "./swicth/switch.jsx";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/users/userActions.js";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const isServerError = location.pathname === "/server-error";

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "Find Loads", to: "/find-loads" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white dark:bg-[#09090b] max-sm:dark:bg-[#09090b] py-2"
      isBlurred={true}
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className=" sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          {/* <Link
            to="/"
            className="font-bold text-primary dark:text-inherit max-sm:hidden "
          >
            Central Brokage
          </Link> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {!isServerError ? (
            <Link color="foreground" to="/">
              Home
            </Link>
          ) : (
            <button disabled>Home</button>
          )}
        </NavbarItem>
        <NavbarItem isActive>
          {!isServerError ? (
            <Link to="/find-loads" color="foreground">
              Find Loads
            </Link>
          ) : (
            <button disabled>Find-Loads</button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Toggle />
        </NavbarItem>
        {user ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform text-gray-700"
                  name="Jason Hughes"
                  size="sm"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6AWUUXiN_RnSlp_wNVxrmqT69c9dttzW1g&usqp=CAU"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="signed-in"
                  className="h-14 gap-2"
                  textValue="signed im as"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="profile" textValue="profile">
                  <Link
                    to="/profile"
                    className="text-black/70 dark:text-white/70"
                  >
                    My Profile
                  </Link>
                </DropdownItem>
                <DropdownItem key="my-bookings" textValue="My bookings">
                  <Link
                    to="/my-bookings"
                    className="text-black/70 dark:text-white/70"
                  >
                    My Bookings
                  </Link>
                </DropdownItem>
                <DropdownItem key="reset-password" textValue="Reset Password">
                  <Link
                    to="/reset-password"
                    className="text-black/70 dark:text-white/70"
                  >
                    Reset Password
                  </Link>
                </DropdownItem>
                <DropdownItem key="change-password" textValue="Change Password">
                  <Link
                    to="/change-password"
                    className="text-black/70 dark:text-white/70"
                  >
                    Change Password
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  textValue="log out"
                  className="text-black/70 dark:text-white/70"
                >
                  <button
                    onClick={() => dispatch(logoutUser())}
                    className="text-danger-400 font-semibold"
                  >
                    Log Out
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem>
            {!isServerError ? (
              <Link
                to="/login"
                className="px-6 py-2 rounded-lg text-sm text-white dark:text-black bg-white"
              >
                Sign In
              </Link>
            ) : (
              <button
                className="px-6 py-2 disabled:bg-white/70 rounded-lg text-sm text-white dark:text-black bg-white"
                disabled
              >
                Sign in
              </button>
            )}
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            {!isServerError ? (
              <Link
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                color="foreground"
                className="w-full text-start"
                size="lg"
                to={item.to}
              >
                {item.name}
              </Link>
            ) : (
              <button>{item.name}</button>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
