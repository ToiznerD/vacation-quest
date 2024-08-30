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

export type district = {
    hierarchy: string;
    location: string;
    score: number;
    entityName: string;
    entityId: string;
    entityType: string;
    highlight: {
        entityName: string;
        hierarchy: string;
    };
    class: string;
    pois: {
        entityName: string;
        entityId: string;
        class: string;
    }[]; 
}

export type hotelCard = {
    id: string;
    name: string;
    stars: string;
    distance: string;
    relevantPoiDistance: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    pivot: boolean;
    images: string[];
    reviewsSummary: {
        score: number;
        imageUrl: string;
        scoreDesc: string;
        total: number;
        mostPopularWith: string | null;
    };
    confidentMessages: {
        type: string;
        score: number;
        icon: string;
        message: string;
    }[];
    minPriceDbookRoomId: string | null;
    minPriceDbookPartnerId: string | null;
    inbound: boolean;
    lowestPrice: {
        price: string;
        rawPrice: number;
        partnerId: string;
        partnerType: string;
        partnerName: string;
        partnerLogo: string;
        isOfficial: boolean;
        funnelType: string;
        cug: string | null;
        discount: string | null;
        amenities: string[] | null;
    };
    otherPrices: string[] | null;
    isUpSorted: boolean;
    hotelId: string;
}

export type hotelInfo = {
    general: {
        name: string;
        stars: number;
    };
    goodToKnow: {
        title: string;
        checkInTime: {
            title: string;
            time: string;
        };
        checkOutTime: {
            title: string;
            time: string;
        };
        description: {
            title: string;
            content: string;
            image: string;
            translated: boolean;
            needTranslation: boolean;
            local: string;
        };
        policies: {
            title: string;
            content: string[] | null;
        };
        location: {
            title: string;
            shordAddress: string;
            address: string;
            rawAddress: {
                nation: string;
                city: string;
                street_address: string;
                adm1: string;
                district: string;
                postcode: string;
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
                    icon: string;
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
            numberOfReviewsText: string;
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
        };
        status: boolean;
        message: string;
    }
}

export type hotelPrices = {
    metaInfo: {
        ratesCta: string;
        rates: {
            partnerName: string;
            partnerLogo: string;
            partnerId: string;
            roomType: string;
            roomPolicies: string;
            deeplink: string;
            rawPrice: number;
            rawPriceGbp: number;
            price: string;
            rateBriefFeatures: string[];
            isOfficial: boolean;
            isShowHotelName: boolean;
        }[];
        roomTypes: string[] | null;
        cheapestPrice: {
            price: string;
            totalWithTaxes: string;
            funnelType: string;
            partnerId: string;
            rateAttributes: string[] | null;
            rawPrice: number;
        }
        exclusiveDeal: string | null;
        mostPopularRates: {
            partnerName: string;
            partnerLogo: string;
            partnerId: string;
            roomType: string;
            roomPolicies: string;
            deeplink: string;
            rawPrice: number;
            rawPriceGbp: number;
            price: string;
            rateBriefFeatures: string[];
            isOfficial: boolean
            isShowHotelName: boolean;
            cugRate: {
                priceWithoutDiscount: string;
                icons: {

                }
                discount: string;
                cugWithoutLabel: string | null;
                FSSInfo: string | null;
                saveAmount: string;
                rawSaveAmount: number;
                type: string;
            }
            funnelType: string;
        }[];
        noOfferPartners: {
            partner_type: string;
            logo: string;
            name: string;
            website_id: string;
            is_dbook: boolean;
            is_official: boolean;
        }[];
        isShowMostPopularSeeAll: boolean;
        policyInfo: string;
        otaRates: {
            partnerName: string;
            partnerLogo: string;
            partnerId: string;
            roomType: string;
            roomPolicies: string;
            deeplink: string;
            rawPrice: number;
            rawPriceGbp: number;
            price: string;
            rateBriefFeatures: string[];
            isOfficial: boolean;
            isShowHotelName: boolean;
            cugRate: {
                priceWithoutDiscount: string;
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
        localCurrency: string;
        searchId: string;
        requestId: string;
    }
    status: boolean;
    message: string;
}