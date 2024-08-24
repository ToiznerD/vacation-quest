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