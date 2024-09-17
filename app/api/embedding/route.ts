import axios from "axios";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
// Define the expected structure of the request body
interface RequestBody {
  city: string;
  hotelInfo: {
    hotelId: string;
    heroImage: string;
    name: string;
    stars: number;
    // Add other fields as necessary
  };
  questionnaire: {
    id: string;
    userId: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string[];
    q5: string;
    q6: string;
    q7: string;
  };
}

interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function POST(request: Request): Promise<NextResponse<APIResponse>> {
  try {
    // Parse the incoming JSON body and ensure it matches the RequestBody type
    const body: RequestBody = await request.json();

    const { city, hotelInfo, questionnaire } = body;
    const toEmbed = { city, questionnaire };

    const url = 'https://api.jina.ai/v1/embeddings';
    const token = process.env.JINAAI_TOKEN;

    const data = {
      model: 'jina-embeddings-v2-base-en',
      normalized: true,
      embedding_type: 'float',
      input: [JSON.stringify(toEmbed)],
    };

    // Make the POST request using axios
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    });
    const embedding = response.data.data[0].embedding;

    await prisma.recommendation.create({
        data: {
          city: city.toLowerCase(),
          embedding,
          hotelInfo
        },
      });

    console.log("API response:", response.data);
    // Return the API response to the client
    return NextResponse.json({ success: true, data: response.data });
  
  } catch (error: any) {
    console.error('Error:', error.response ? error.response.data : error.message);
    // Return error response to the client
    return NextResponse.json({ success: false, error: error.message });
  }
}
