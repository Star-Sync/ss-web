"use client";

import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Image from "next/image";
import logo from "../../assets/web/logo.png";
import { useRouter } from "next/router";

const WebNavbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in by looking for an access token
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, []);

    // Define authentication routes where the auth button should be hidden.
    const authRoutes = ["/signin", "/signup"];
    const shouldHideAuthButton = authRoutes.includes(router.pathname);

    const handleAuthButtonClick = () => {
        if (isLoggedIn) {
            // If logged in, navigate to dashboard
            router.push("/dashboard");
        } else {
            // If not logged in, navigate to sign in page
            router.push("/signin");
        }
    };

    return (
        <div className="scheduler_navbar">
            <div className="scheduler_navbar-links">
                <div className="scheduler_navbar-links_logo">
                    <Image src={logo} alt="logo" width={100} height={100} />
                </div>
                <div className="scheduler_navbar-links_container">
                    <p>
                        <a href="#home">Home</a>
                    </p>
                    <p>
                        <a href="#guide">User Guide</a>
                    </p>
                    <p>
                        <a href="#faq">FAQ</a>
                    </p>
                </div>
            </div>

            {/* Show auth button only if the current route is not the login/signup. */}
            <div className="scheduler_navbar-sign">
                {!shouldHideAuthButton && (
                    <button type="button" onClick={handleAuthButtonClick}>
                        {isLoggedIn ? "Open App" : "Sign in"}
                    </button>
                )}
            </div>

            <div className="scheduler_navbar-menu">
                {toggleMenu ? (
                    <RiCloseLine
                        color="#fff"
                        size={27}
                        onClick={() => setToggleMenu(false)}
                    />
                ) : (
                    <RiMenu3Line
                        color="#fff"
                        size={27}
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <div className="scheduler_navbar-menu_container scale-up-center">
                        <div className="scheduler_navbar-menu_container-links">
                            <p>
                                <a href="#home">Home</a>
                            </p>
                            <p>
                                <a href="#guide">User Guide</a>
                            </p>
                            <p>
                                <a href="#faq">FAQ</a>
                            </p>
                        </div>
                        <div className="scheduler_navbar-menu_container-links-sign">
                            {!shouldHideAuthButton && (
                                <button type="button" onClick={handleAuthButtonClick}>
                                    {isLoggedIn ? "Open App" : "Sign in"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebNavbar;
