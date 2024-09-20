"use client";

import { useEffect } from "react";
import useQuestionnaireModal from "../hooks/useQuestionnaireModal";
import { SafeUser } from "../types";

interface Props {
    user?: SafeUser | null;
}

const CheckQuestionnaire = ({ user }: Props) => {
    const { setData, isOpen, dismissed, onOpen } = useQuestionnaireModal();

    useEffect(() => {
        // Open modal only if the user is logged in, has no questionnaire, and has not dismissed the modal
        if(user && user.questionnaire){
            // console.log(user.questionnaire)
            setData(user.questionnaire)
        }
        if (user && !user.questionnaire && !isOpen && !dismissed) {
            onOpen();
        }
    }, [user, isOpen, dismissed, onOpen, setData]);

    return null;
};

export default CheckQuestionnaire;
