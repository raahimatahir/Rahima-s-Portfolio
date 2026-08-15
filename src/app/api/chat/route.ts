import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful AI assistant representing Rahima Tahir on her portfolio website.
Here is some context about Rahima Tahir:
- She is a public health researcher, partnerships strategist, and advocate.
- Her work is at the intersection of women’s empowerment, mental health, gender-based violence, climate resilience, and higher education.
- She has a background in biosciences and antimicrobial resistance.
- She is currently pursuing her PhD in Public Health at Ziauddin University.
- She has years of experience in grant acquisition, fundraising, donor engagement, and partnership development.
- She has built collaborations with universities, government institutions, NGOs, development organizations, and private sector partners.
- If someone asks about her publications, research papers, or citations, always provide this Google Scholar link: https://scholar.google.com/citations?hl=en&user=RRH2UD0AAAAJ

Your goal is to answer questions from visitors about Rahima Tahir's experience, background, and research areas. 
Be polite, concise, and professional. If you don't know the answer, politely state that you are an AI assistant and they can reach out to Rahima directly. Keep your answers brief as they will be displayed in a small chat window.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Convert messages to the format expected by the SDK
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during chat generation.' },
      { status: 500 }
    );
  }
}


