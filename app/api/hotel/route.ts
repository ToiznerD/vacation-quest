import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const hotelId = searchParams.get('hotelId');
    let entityId = searchParams.get('entityId');
    const roomCount = searchParams.get('roomCount');
    const adults = searchParams.get('adults');
    let destination;
    
    if(!entityId || entityId === ''){
        destination = searchParams.get('destination');
        const options = {
            method: 'GET',
            url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel',
            params: {query: destination},
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
            }
        };
        
        try {
            const response = await axios.request(options);
            entityId = response.data.data[0].entityId;
        } catch (error) {
            console.error(error);
        }
    }

    let hotelDetails;
    let hotelPrices = [];

    const options1 = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelDetails',
      params: {
        hotelId,
        entityId,
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options1);
        hotelDetails = response.data.data;
    } catch (error) {
        console.error(error);
    }

    const options2 = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelPrices',
    params: {
        hotelId,
        entityId,
        checkin: startDate,
        checkout: endDate,
        adults,
        rooms: roomCount,
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
    },
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options2);
        hotelPrices = response.data.data.otaRates || [];
    } catch (error) {
        console.error(error);
    }

    return NextResponse.json({hotelDetails, hotelPrices});

}