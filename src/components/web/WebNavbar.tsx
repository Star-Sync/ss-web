"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../assets/web/logo.png";

const WebNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, []);

    const authRoutes = ["/signin", "/signup"];
    const shouldHideAuthButton = authRoutes.includes(router.pathname);

    const handleAuthButtonClick = () => {
        if (isLoggedIn) {
            router.push("/dashboard");
        } else {
            router.push("/signin");
        }
    };

    const handleSignInClick = () => {
        router.push("/signin");
    };

    const handleSignUpClick = () => {
        router.push("/signup");
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="mt-4 border-b bg-white min-h-[6vw]">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <div className="flex items-center space-x-4">
                    <div onClick={() => handleNavigation("/")} className="cursor-pointer">
                        <Image src={logo} alt="logo" width={75} height={75} />
                    </div>
                    <NavigationMenu>
                        <NavigationMenuList>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    {!shouldHideAuthButton && !isLoggedIn && (
                        <>
                            <Button onClick={handleSignInClick} variant="outline">
                                Sign in
                            </Button>
                            <Button onClick={handleSignUpClick} variant="default">
                                Sign up
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button onClick={handleAuthButtonClick} variant="default">
                            Open App
                        </Button>
                    )}

                    {/* Mobile Menu */}
                    <Sheet >
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-white p-4">
                            <div className="flex flex-col space-y-4 mt-4">
                                <Button 
                                    variant="ghost" 
                                    className="justify-start" 
                                    onClick={() => handleNavigation("/")}
                                >
                                    Home
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="justify-start" 
                                    onClick={() => handleNavigation("/guide")}
                                >
                                    User Guide
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className="justify-start" 
                                    onClick={() => handleNavigation("/faq")}
                                >
                                    FAQ
                                </Button>
                                {!shouldHideAuthButton && (
                                    <>
                                        <Button onClick={handleSignInClick} variant="outline" className="w-full">
                                            Sign in
                                        </Button>
                                        <Button onClick={handleSignUpClick} variant="default" className="w-full">
                                            Sign up
                                        </Button>
                                    </>
                                )}
                                {isLoggedIn && (
                                    <Button onClick={handleAuthButtonClick} className="w-full">
                                        Open App
                                    </Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default WebNavbar;
