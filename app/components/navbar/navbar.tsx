"use client";

import Image from "next/image";
import Search from "./Search";
import Logo from "./logo";
import UserMenu from "./UserMenu";

interface Props {
    searchValues: {
        destination: string;
        when: {
            from: Date;
            to: Date;
        };
        guestCount: number;
    }
}

const Navbar = ({ searchValues } : Props) => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 px-3 flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search searchValues={searchValues}/>
                        <UserMenu  />
            </div>
        </div>
     );
}
 
export default Navbar;