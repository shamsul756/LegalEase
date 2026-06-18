"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Replace with actual auth state
  const isLoggedIn = true;
  const userRole = "lawyer"; // "client" | "lawyer" | "admin"

  const navLink = (href) =>
    `transition hover:text-blue-600 ${
      pathname === href
        ? "text-blue-600 font-semibold"
        : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
        <Logo/>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={navLink("/")}>
              Home
            </Link>

            <Link
              href="/lawyers"
              className={navLink("/lawyers")}
            >
              Browse Lawyers
            </Link>

            {/* Dashboard Dropdown */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() =>
                    setDashboardOpen(!dashboardOpen)
                  }
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                  <FaChevronDown size={12} />
                </button>

                {dashboardOpen && (
                  <div className="absolute top-12 left-0 w-52 bg-white border rounded-lg shadow-lg py-2">
                    {userRole === "client" && (
                      <Link
                        href="/dashboard/client"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Client Dashboard
                      </Link>
                    )}

                    {userRole === "lawyer" && (
                      <Link
                        href="/dashboard/lawyer"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Lawyer Dashboard
                      </Link>
                    )}

                    {userRole === "admin" && (
                      <Link
                        href="/dashboard/admin"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center border rounded-lg overflow-hidden bg-gray-50">
            <input
              type="text"
              placeholder="Search lawyer or specialization..."
              className="px-4 py-2 w-72 outline-none bg-transparent"
            />

            <button className="px-4 text-blue-600">
              <FaSearch />
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-2xl"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t py-4">
            {/* Search */}
            <div className="flex items-center border rounded-lg overflow-hidden mb-4">
              <input
                type="text"
                placeholder="Search lawyers..."
                className="flex-1 px-4 py-2 outline-none"
              />

              <button className="px-4 text-blue-600">
                <FaSearch />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className={navLink("/")}
              >
                Home
              </Link>

              <Link
                href="/lawyers"
                className={navLink("/lawyers")}
              >
                Browse Lawyers
              </Link>

              {isLoggedIn && (
                <>
                  <p className="font-semibold text-gray-800">
                    Dashboard
                  </p>

                  {userRole === "client" && (
                    <Link
                      href="/dashboard/client"
                      className="pl-4 text-gray-600"
                    >
                      Client Dashboard
                    </Link>
                  )}

                  {userRole === "lawyer" && (
                    <Link
                      href="/dashboard/lawyer"
                      className="pl-4 text-gray-600"
                    >
                      Lawyer Dashboard
                    </Link>
                  )}

                  {userRole === "admin" && (
                    <Link
                      href="/dashboard/admin"
                      className="pl-4 text-gray-600"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}

              {isLoggedIn ? (
                <button className="w-fit px-4 py-2 bg-red-500 text-white rounded-lg">
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-fit px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}