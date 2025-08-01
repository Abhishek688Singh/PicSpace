"use client";
import { useSession, signIn, signOut } from "next-auth/react";


import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Link from "next/link";

export function NavbarDemo() {
  const { data: session } = useSession();
  const navItems = [
    {
      name: "Join Pic-Space",
      link: "/create-workspace",
    },
    {
      name: "Create Pic-space",
      link: "/create-workspace/new-workspace",
    },
    {
      name: "Dashboard",
      link: "/dashbord",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">

            {session ? (
              <NavbarButton onClick={() => { signOut({ redirectTo: "/" }) }} variant="secondary">
                Logout</NavbarButton>
            ) : (
              <>
                <NavbarButton href="/login" variant="secondary">Login</NavbarButton>
              <NavbarButton href="/register" variant="primary">Register</NavbarButton>
              </>
            )}


          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="w-[100]">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">

              {session ? (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({redirectTo:"/"});
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                  href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                  href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Register
                  </NavbarButton>
                </>)}

            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <DummyContent />

      {/* Navbar */}
    </div>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto bg-transparent">



    </div>
  );
};
