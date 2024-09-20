"use client";

import Modal from "./Modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import Heading from "../Heading";
import useQuestionnaireModal from "@/app/hooks/useQuestionnaireModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultiSelectInput from "../inputs/checkboxlist";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
    START = 0,
    TRAVEL = 1,
    LIFESTYLE = 2,
    TIMING = 3,
    FINISH = 4
}

type MultiSelectItem = {
    label: string;
    value: string;
}

const QuestionnaireModal = () => {
    const questionnaireModal = useQuestionnaireModal();
    const { data } = questionnaireModal;
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState<MultiSelectItem[]>([]);
    const [q5, setQ5] = useState('');
    const [q6, setQ6] = useState('');
    const [q7, setQ7] = useState('');
    const [step, setStep] = useState(STEPS.START);

    useEffect(() => {
        console.log(data);
        setQ1(data?.q1 || '');
        setQ2(data?.q2 || '');
        setQ3(data?.q3 || '');
        const values = data?.q4?.map((val: string) => ({label: val, value: val}));
        setQ4(values || []);
        setQ5(data?.q5 || '');
        setQ6(data?.q6 || '');
        setQ7(data?.q7 || '');
    }, [data])

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])
    
    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.FINISH) {
            return onNext();
        }
        
        let questionnaire = {
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7
        };
        console.log(questionnaire)
        const response = await axios.post('/api/questionnaire', questionnaire)
        questionnaireModal.setData(questionnaire);
        setStep(STEPS.START);
        questionnaireModal.onDismiss();
        questionnaireModal.onClose();
        if(response.data.success){
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
        
    }, [step, questionnaireModal, onNext, q1, q2, q3, q4, q5, q6, q7]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.FINISH){
            return 'Send';
        }

        return 'Next';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.START){
            return undefined;
        }

        return 'Back';
    }, [step] )

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Let's get to know you better!"
                subtitle="Answer the following questions to help us find your perfect trip!"
            />
            
        </div>
    )

    if (step === STEPS.TRAVEL) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Travel Preferences"
                    subtitle="Let's understand your travlling preferences"
                />
                <div className="text-lg flex flex-col gap-2">
                    <p>What is the purpose of your trip?</p>
                    <Select
                        value={q1}
                        onValueChange={(value: string) => setQ1(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Purpose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vacation">Vacation</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="adventure">Adventure</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-lg flex flex-col gap-2">
                    <p>Who are you traveling with?</p>
                    <Select
                        value={q2}
                        onValueChange={(value: string) => setQ2(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Partners" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="solo">Solo</SelectItem>
                            <SelectItem value="partner">Partner</SelectItem>
                            <SelectItem value="friends">Friends</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                            <SelectItem value="colleagues">Colleagues</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-lg flex flex-col gap-2">
                    <p>How frequently do you travel?</p>
                    <Select
                        value={q3}
                        onValueChange={(value: string) => setQ3(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rarely">Rarely (once a year)</SelectItem>
                            <SelectItem value="occasionally">Occasionally (2-3 times a year)</SelectItem>
                            <SelectItem value="frequently">Frequently (more than 4 times a year)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )
    }

    if (step === STEPS.LIFESTYLE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="Lifestyle and Interests?"
                    subtitle="What kinds of activities do you like?"
                />
                <div className="text-lg flex flex-col gap-2">
                    <p>What kind of activities do you enjoy during your trips? (Select all that apply)</p>
                    <MultiSelectInput
                        id="variant"
                        label="Activies"
                        value={q4}
                        list={[
                            {
                                label: "Sightseeing",
                                value: "sightseeing"
                            },
                            {
                                label: "Cultural",
                                value: "cultural"
                            },
                            {
                                label: "Hiking",
                                value: "hiking"
                            },
                            {
                                label: "Water sports",
                                value: "water_sports"
                            },
                            {
                                label: "Nightlife",
                                value: "nightlife"
                            },
                            {
                                label: "Shopping",
                                value: "shopping"
                            },
                            {
                                label: "Relaxing",
                                value: "relaxing"
                            }
                        ]}
                        onUpdate={setQ4}
                    />
                </div>
                <div className="text-lg flex flex-col gap-2">
                    <p>Do you prefer luxury or comfort when traveling?</p>
                    <Select
                        value={q5}
                        onValueChange={(value: string) => setQ5(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="luxury">Luxury</SelectItem>
                            <SelectItem value="comfort">Comfort</SelectItem>
                            <SelectItem value="no_preference">No preference</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )
    }

    if (step === STEPS.TIMING){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Timing and Duration"
                    subtitle="How long would you like to stay?"
                />
                <div className="text-lg flex flex-col gap-2">
                    <p>How long is your typical stay at a hotel?</p>
                    <Select
                        value={q6}
                        onValueChange={(value: string) => setQ6(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1-3">1-3 nights</SelectItem>
                            <SelectItem value="4-7">4-7 nights</SelectItem>
                            <SelectItem value="7+">More than a week</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-lg flex flex-col gap-2">
                    <p>Do you usually book in advance or at last minute?</p>
                    <Select
                        value={q7}
                        onValueChange={(value: string) => setQ7(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="advance">In advance (more than 1 month before)</SelectItem>
                            <SelectItem value="last_minute">Last minute (withing 1 month of travel)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        )
    }

    if (step === STEPS.FINISH){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Thank you for completing the questionnaire!"
                    subtitle="We hope to find the best trip for you!"
                />
            </div>
        )
    }

    const onClose = () => {
        questionnaireModal.onDismiss();
        questionnaireModal.onClose();
    }
    return ( 
        <Modal 
            isOpen={questionnaireModal.isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="Questionnaire"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.START ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default QuestionnaireModal;

