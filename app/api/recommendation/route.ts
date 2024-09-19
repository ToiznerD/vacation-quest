import axios from "axios";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { Recommendation } from "@prisma/client";
import { RecommendationItem } from "@/app/types";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { city, questionnaire, query, entityId, startDate, endDate, roomCount, adults } = body;

        const toEmbed = { city, questionnaire, query };

        const url = 'https://api.jina.ai/v1/embeddings';
        const token = process.env.JINAAI_TOKEN;

        const data = {
            model: 'jina-embeddings-v2-base-en',
            normalized: true,
            embedding_type: 'float',
            input: [JSON.stringify(toEmbed)], // Pass your embedding query
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });


        const embedding = response.data.data[0].embedding;


        const recommendations = await prisma.$runCommandRaw({
          aggregate: 'Recommendation',
          pipeline: [
            {
              $vectorSearch: {
                index: 'vector_index',
                path: 'embedding',
                queryVector: embedding,
                numCandidates: 100,
                limit: 3
              }
            },
            {
              $match: {
                city: city.toLowerCase()
              }
            },
            // Add the $group stage to ensure uniqueness based on hotelInfo
            {
              $group: {
                _id: "$hotelInfo.hotelId", // Use a unique identifier for hotelInfo
                hotelInfo: { $first: "$hotelInfo" },
                embedding: { $first: "$embedding" },
                // Include any other fields you want to retain
              }
            }
          ],
          cursor: {}
        });
        
          
          const recList: RecommendationItem[] = (recommendations.cursor as { firstBatch: RecommendationItem[] })?.firstBatch || [];

          const promises = recList.map(async (rec: RecommendationItem) => {
            const options = {
              method: 'GET',
              url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/getHotelPrices',
              params: {
                hotelId: rec.hotelInfo.hotelId,
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
              const response = await axios.request(options);
                rec.hotelInfo.price = response.data.data.cheapestPrice.price;
                rec.hotelInfo.rawPrice = response.data.data.cheapestPrice.rawPrice
            } catch (error) {
              console.error(error);
            }
          })


        await Promise.all(promises);



        return NextResponse.json({ success: true, recommendations: recList });

    } catch (error: any) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ success: false, error: error.message });
    }
}
