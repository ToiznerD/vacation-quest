"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useChangePasswordModal from "@/app/hooks/useChangePasswordModal";
import useQuestionnaireModal from "@/app/hooks/useQuestionnaireModal";

interface Props {
    currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser } : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const changePasswordModal = useChangePasswordModal();
    const { onOpen: openPasswordModal, setName } = changePasswordModal;
    const { setData, cancelDismiss, onOpen } = useQuestionnaireModal();
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const openQuestionnaire = () => {
        // console.log(currentUser?.questionnaire)
        setData(currentUser?.questionnaire)
        cancelDismiss();
        onOpen();
    }

    const changePassword = () => {
        setName(currentUser?.name || '');
        openPasswordModal();
    }


    return ( 
        <div className="relative">
            <div className="flex flex-row w-[10vh] items-center gap-3">

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
                <div className="absolute rounded-xl shadow-md w-[200px] md:full bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {
                            currentUser ? (
                                <>

                                    <MenuItem onClick={changePassword} label="Change password" />
                                    <hr />
                                    <MenuItem onClick={openQuestionnaire} label="My Questionnaire" />
                                    <hr />
                                    <MenuItem onClick={() => signOut()} label="Logout" />
                                </>   
                            ): (
                                 <>
                                    <MenuItem onClick={loginModal.onOpen} label="Login" />
                                    <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
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