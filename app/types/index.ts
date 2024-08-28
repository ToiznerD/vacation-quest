import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};


export type itinerary = {
    id: string;
    price: {
        raw: number;
        formatted: string;
        pricingOptionId: string;
    };
    legs: {
        id: string;
        origin: {
            id: string;
            entityId: string;
            name: string;
            displayCode: string;
            city: string;
            country: string;
            isHighlighted: boolean;
        };
        destination: {
            id: string;
            entityId: string;
            name: string;
            displayCode: string;
            city: string;
            country: string;
            isHighlighted: boolean;
        };
        durationInMinutes: number;
        stopCount: number;
        isSmallestStops: boolean;
        departure: string;
        arrival: string;
        timeDeltaInDays: number;
        carriers: {
            operationType: string;
            marketing: {
                id: number;
                logoUrl: string;
                name: string;
            }[];
        };
        segments: {
            id: string;
            origin: {
                flightPlaceId: string;
                displayCode: string;
                parent: {
                    flightPlaceId: string;
                    displayCode: string;
                    name: string;
                    type: string;
                };
                name: string;
                type: string;
                country: string;
            };
            destination: {
                flightPlaceId: string;
                displayCode: string;
                parent: {
                    flightPlaceId: string;
                    displayCode: string;
                    name: string;
                    type: string;
                };
                name: string;
                type: string;
                country: string;
            };
            departure: string;
            arrival: string;
            durationInMinutes: number;
            flightNumber: string;
            marketingCarrier: {
                id: number;
                name: string;
                alternateId: string;
                allianceId: number;
                displayCode: string;
            };
            operatingCarrier: {
                id: number;
                name: string;
                alternateId: string;
                allianceId: number;
                displayCode: string;
            };
        }[];
    }[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: {
        isChangeAllowed: boolean;
        isPartiallyChangeable: boolean;
        isCancellationAllowed: boolean;
        isPartiallyRefundable: boolean;
    };
    fareAttributes: {};
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
    tags?: string[];

}

export type FlightDetails = {
    id: string;
    legs: {
        id: string;
        origin: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
        };
        destination: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
        };
        departure: string;
        arrival: string;
        duration: number;
        stopCount: number;
        dayChange: number
        segments: {
            id: string;
            origin: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            destination: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            departure: string;
            arrival: string;
            duration: number;
            flightNumber: string;
            dayChange: number;
            marketingCarrier: {
                id: number;
                name: string;
                displayCode: string;
                displayCodeType: string;
                logo: string;
                altId: string;
            };
            operatingCarrier: {
                id: number;
                name: string;
                displayCode: string;
                displayCodeType: string;
                logo: string;
                altId: string;
            };
            goodToKnowItems: {
                icon: string;
                body: {
                    value: string;
                    isHighlighted: boolean;
                    position: number;
                };
                badge?: {
                    value: string;
                    isHighlighted: boolean;
                    position: number;
                }
            }[];
        }[];
        layovers: {
            segmentId: string;
            origin: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            destination: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            duration: number;
        }[];
    }[];
    pricingOptions: {
        agents: {
            id: string;
            name: string;
            isCarrier: boolean;
            bookingProposition: string;
            url: string;
            price: number;
            rating: {
                value: number;
                count: number;
            };
            updateStatus: string;
            segments: {
                id: string;
                origin: {
                    id: string;
                    name: string;
                    displayCode: string;
                    city: string;
                };
                destination: {
                    id: string;
                    name: string;
                    displayCode: string;
                    city: string;
                };
                departure: string;
                arrival: string;
                duration: number;
                flightNumber: string;
                dayChange: number;
                marketingCarrier: {
                    id: string;
                    name: string;
                    displayCode: string;
                    displayCodeType: string;
                    logo: string;
                    altId: string;
                };
                operatingCarrier: {
                    id: string;
                    name: string;
                    displayCode: string;
                    displayCodeType: string;
                    logo: string;
                    altId: string;
                };
                goodToKnowItems?: {
                    icon: string;
                    body: {
                        value: string;
                        isHighlighted: boolean;
                        position: number;
                    };
                    badge?: {
                        value: string;
                        isHighlighted: boolean;
                        position: number;
                    }
                }[];
            }[];
            isDirectDBookUrl: boolean;
            quoteAge: number;
        }[];
        totalPrice: number;
        fare: {
            leg_details: any[];
        };
        id: string;
    }[];
    isTransferRequired: boolean;
    destinationImage: string;
    operatingCarrierSafetyAttributes: {
        carrierID: string;
        carrierName: string;
        faceMasksCompulsory?: any;
        aircraftDeepCleanedDaily?: any;
        attendantsWearPPE?: any;
        cleaningPacksProvided?: any;
        foodServiceChanges?: any;
        safetyUrl?: any;
    }[];
    flexibleTicketPolicies?: any[];
    transferProtectionDetails: {
        title: string;
        body: string;
        url: string;
        urlTitle: string;
    };
    pollingCompleted: boolean;
    bookingSessionId: string;
}

export type FlightOption = {
    agents: {
        id: string;
        name: string;
        isCarrier: boolean;
        bookingProposition: string;
        url: string;
        price: number;
        rating: {
            value: number;
            count: number;
        };
        updateStatus: string;
        segments: {
            id: string;
            origin: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            destination: {
                id: string;
                name: string;
                displayCode: string;
                city: string;
            };
            departure: string;
            arrival: string;
            duration: number;
            flightNumber: string;
            dayChange: number;
            marketingCarrier: {
                id: string;
                name: string;
                displayCode: string;
                displayCodeType: string;
                logo: string;
                altId: string;
            };
            operatingCarrier: {
                id: string;
                name: string;
                displayCode: string;
                displayCodeType: string;
                logo: string;
                altId: string;
            };
            goodToKnowItems?: {
                icon: string;
                body: {
                    value: string;
                    isHighlighted: boolean;
                    position: number;
                };
                badge?: {
                    value: string;
                    isHighlighted: boolean;
                    position: number;
                }
            }[];
        }[];
        isDirectDBookUrl: boolean;
        quoteAge: number;
    }[];
    totalPrice: number;
    fare: {
        leg_details: any[];
    };
    id: string;
}