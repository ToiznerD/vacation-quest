"use client";

import Image from "next/image";
import Search from "./Search";
import Logo from "./logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import useQuestionnaireModal from "@/app/hooks/useQuestionnaireModal";

interface Props {
    currentUser?: SafeUser | null
}

const Navbar = ({currentUser} : Props) => {
    return ( 
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 px-3 flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu  currentUser={currentUser} />
            </div>
        </div>
     );
}
 
export default Navbar;