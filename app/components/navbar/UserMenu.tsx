"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar"
import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import MenuItem from "./MenuItem";

interface Props {
    currentUser?: any | null;
}

const UserMenu = ({ currentUser } : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])


    return ( 
        <div className="relative w-[10vw]">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {
                            currentUser ? (
                                <>
                                    <MenuItem onClick={() => router.push('/trips')} label="My trips" />
                                    <MenuItem onClick={() => { }} label="My favorites" />
                                    <MenuItem onClick={() => router.push('/reservations')} label="My reservations" />
                                    <MenuItem onClick={() => { }} label="My properties" />
                                    <MenuItem onClick={() => {}} label="Airbnb my home" />
                                    <hr />
                                    <MenuItem onClick={() => {}} label="Logout" />
                                </>   
                            ): (
                                 <>
                                    <MenuItem onClick={() => {}} label="Login" />
                                    <MenuItem onClick={() => {}} label="Sign Up" />
                                </>   
                            )
                        }
                        
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default UserMenu;