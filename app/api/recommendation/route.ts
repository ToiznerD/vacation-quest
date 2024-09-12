import axios from "axios";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { Recommendation } from "@prisma/client";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { city, questionnaire, query } = body;

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
                limit: 5
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
        
          
          const recList: Recommendation[] = (recommendations.cursor as { firstBatch: Recommendation[] })?.firstBatch || [];

        return NextResponse.json({ success: true, recommendations: recList });

    } catch (error: any) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return NextResponse.json({ success: false, error: error.message });
    }
}
