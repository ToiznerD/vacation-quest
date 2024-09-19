import { User } from "@prisma/client";


export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    questionnaire?: {
        userId: string;
        q1: string;
        q2: string;
        q3: string;
        q4: string[];
        q5: string;
        q6: string;
        q7: string;
    } | null;
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
    pollingCompleted?: boolean;
    bookingSessionId?: string;
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

export type district = {
    hierarchy: string;
    location: string;
    score: number;
    entityName: string;
    entityId: string;
    entityType: string;
    suggestItem: string;
    class: string;
    pois: {
        entityName: string;
        entityId: string;
        class: string;
    }[]; 
}

export type hotelCard = {
    hotelId?: string;
    heroImage?: string;
    name?: string;
    stars?: number;
    brandIds?: string[];
    distance?: string;
    relevantPoiDistance?: string;
    coordinates?: number[];
    price?: string;
    cug?: {
        cugWithoutLabel: string | null;
        rawType: string;
        type: string;
        icons: string[] | null;
        discount: string | null;
        priceWithoutDiscount: string | null;
    };
    cheapestOfferPartnerId?: string;
    cheapestOfferRateId?: string | null;
    rawPrice?: number;
    rating?: {
        description: string;
        count: number;
        value: string;
        color: string;
    } | null;
    reviewSummary?: {
        description: string;
        count: number;
        formatCount: string;
        value: string;
        formatValue: string;
        color: string;
        taImage: string | null;
        confidenceBadge?: {
            type: string;
            score: number;
            icon: string;
            color: {
                light: string;
                dark: string;
            }
            message: string;
        };
    }
    cheapestOffer?: string;
    offerTypes?: string;
    guestType?:  string | null;
    exclusiveDealLabel?:  string | null;
    pricesFrom?: string | null;
    images?: string[];
    otherRates?: {
        partnerId: string;
        partnerName: string;
        rawPrice: number;
        price: string;
    }[];
    priceDescription?: string;
    rateFeatures?: {
        taxPolicy?: string;
        key: string;
        text: string;
        color: {
            light: string;
            dark: string;
        }
    }[];
    cheapestOfferPartnerName?: string | null;
}

export type hotelInfo = {
    general: {
        name: string;
        stars: number;
    };
    goodToKnow: {
        title: string;
        checkinTime: {
            title: string;
            time: string;
        };
        checkoutTime: {
            title: string;
            time: string;
        };
        description: {
            title: string;
            content: string;
            image: string;
            translated: boolean;
            needTranslation: boolean;
            locale: string;
        };
        policies: {
            title: string;
            content: {
                icon: string;
                translated: boolean;
                needTranslation: boolean;
                locale: string;
                key: string;
                type: string;
                values: {
                    content: string;
                }[];
            }[];
        };
    }
    childrenAndExtraBed: {
        title: string;
        content: string[] | null; //?????
    };
    location: {
        title: string;
        shortAddress: string;
        address: string;
        rawAddress: {
            district: string;
            street_address: string;
            nation: string;
            adm1: string;
            postcode: string;
            city: string;
            cityId: string;
        };
        coordinates: {
            latitude: number;
            longitude: number;
        };
        cta: string;
    }
    gallery: {
        images: {
            category: string;
            thumbnail: string;
            gallery: string;
            dynamic: string;
        }[];
        categories: {
            name: string;
            count: number;
            displayName: string;
        }[];
    };
    amenities: {
        title: string;
        ctaAll: string;
        ctaLess: string;
        content: {
            icon: string;
            description: string;
        }[];
        contentV2: {
            id: string;
            category: string;
            items: {
                id: string;
                description: string;
            }[];
        }[];
    };
    reviews: {
        title: string;
        newTitle: string;
        cta: string;
        summaryDescription: string;
        rating: number;
        ratingDescription: string;
        ratingDescriptionText: string;
        numberOfReviewsLabel: string;
        numberOfReviewsLabelExpanded: string;
        badges: string[] | null;
        guests: {
            title: string;
            entries: string[] | null;
        };
        categories: {
            title: string;
            entries: string[] | null;
        };
        explanations: {
            title: string;
            content: string;
        }[];
    };
    distance: string;
    reviewRatingSummary: {
        scoreLogoImageUrl: string;
        score: string;
        formatScore: string;
        totalScore: string;
        count: string;
        countNumber: number
        formatCountString: string;
        color: string;
        scoreDesc: string;
        highlights: string;
        categories: {
            type: string;
            score: string;
            formatScore: string;
            color: string;
            name: string;
            highlights: string;
            description: string;
        }[];
        cleanlinessMessage: string;
        locationMessage: string;
        highScoreReviews: {
            type: string;
            score: string;
            icon: string;
            text: string;
        }[];
    }
}

export type hotelPrice = {
    partnerName: string;
    partnerLogo: string;
    partnerId: string;
    roomType: string;
    roomPolicies?: string;
    deeplink?: string;
    rawPrice: number;
    rawPriceGbp?: number;
    price: string;
    rateBriefFeatures?: string[];
    isOfficial?: boolean;
    isShowHotelName?: boolean;
    cugRate?: {
        priceWithoutDiscount:string;
        icons: string[];
        discount: string;
        cugWithoutLabel: string | null;
        FSSInfo: string | null;
        saveAmount: string;
        rawSaveAmount: number;
        type: string;
    }
    funnelType: string;
}

export type similarHotel = {
    hotelId: string;
    heroImage: string;
    name: string;
    stars: number;
    distance: string;
    distanceFromHotel: string;
    exclusiveInfo: string | null;
    price: string;
    cug?: {
        type: string;
        priceWithoutDiscount: string;
        icons: string[];
        discount: string;
        rawDiscountPercentage: number;
        rawType: string;
    }
    cheapestOfferPartnerId: string;
    rawPrice: number;
    rating: {
        description: string;
        count: number;
        value: string;
        formatValue: string;
        color: string;
        taImage: string;
    }
    coordinate: {
        longitude: number;
        latitude: number;
    }
}

export type RecommendationItem = {
    id: string;
    city: string;
    embedding: number[];
    hotelInfo: hotelCard;
}