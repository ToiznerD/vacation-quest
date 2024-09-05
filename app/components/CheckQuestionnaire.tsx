"use client";

import { useEffect } from "react";
import useQuestionnaireModal from "../hooks/useQuestionnaireModal";
import { SafeUser } from "../types";

interface Props {
    user?: SafeUser | null;
}

const CheckQuestionnaire = ({ user }: Props) => {
    const { isOpen, dismissed, onOpen } = useQuestionnaireModal();

    useEffect(() => {
        // Open modal only if the user is logged in, has no questionnaire, and has not dismissed the modal
        if (user && !user.questionnaire && !isOpen && !dismissed) {
            onOpen();
        }
    }, [user, isOpen, dismissed, onOpen]);

    return null;
};

export default CheckQuestionnaire;
