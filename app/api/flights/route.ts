import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    const { searchParams } = new URL(req.url);
    const originPosition = JSON.parse(searchParams.get('originPosition') || '[0, 0]');
    const position = JSON.parse(searchParams.get('position') || '[0, 0]');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let originSkyId;
    let originEntityId;
    let destinationSkyId;
    let destinationEntityId;

    const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports',
        params: {
          lat: originPosition[0],
          lng: originPosition[1],
          locale: 'en-US'
        },
        headers: {
          'x-rapidapi-key': '9e6bf754e0mshecdf4e6503bf1f1p1ed06fjsnd6ef57b116b4',
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
      };
    
    try {
        const response = await axios.request(options);
        originSkyId = response.data.data.current.skyId;
        originEntityId = response.data.data.current.entityId;
    } catch (error) {
        console.error(error);
    }

    const options2 = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports',
        params: {
          lat: position[0],
          lng: position[1],
          locale: 'en-US'
        },
        headers: {
          'x-rapidapi-key': '9e6bf754e0mshecdf4e6503bf1f1p1ed06fjsnd6ef57b116b4',
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
      };
    
    try {
        const response = await axios.request(options2);
        destinationSkyId = response.data.data.current.skyId;
        destinationEntityId = response.data.data.current.entityId;
    } catch (error) {
        console.error(error);
    }

    const options3 = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
        params: {
          originSkyId,
          destinationSkyId,
          originEntityId,
          destinationEntityId,
          date: startDate,
          returnDate: endDate,
          cabinClass: 'economy',
          adults: '1',
          sortBy: 'best',
          currency: 'USD',
          market: 'en-US',
          countryCode: 'US'
        },
        headers: {
            'x-rapidapi-key': '9e6bf754e0mshecdf4e6503bf1f1p1ed06fjsnd6ef57b116b4',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }
      };
      
      try {
          const response = await axios.request(options3);
          console.log(response.data);
          return NextResponse.json(response.data);
      } catch (error) {
          console.error(error);
      }

    console.log(originPosition, position);
    return NextResponse.json({originPosition, position});
}