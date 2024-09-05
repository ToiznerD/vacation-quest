import { NextResponse } from "next/server";
import axios from 'axios';

export async function GET(req: Request){
    const { searchParams } = new URL(req.url);
    const itineraryId = searchParams?.get('id')
    const token = searchParams?.get('token')
    let decodedItineraryId = decodeURIComponent(itineraryId || '');
    const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/detail',
        params: {
          token: token,
          itineraryId: decodedItineraryId,
        },
        headers: {
          'x-rapidapi-key': '5cafd19031msh154445f4f635b20p1f63a7jsn09b9bc3ba2ea',
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          return NextResponse.json(response.data)
      } catch (error) {
          console.error(error);
      }
    return NextResponse.json({ success: true })
}