import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Call Pollinations.ai text API
        // Format: https://text.pollinations.ai/PROMPT
        // It returns raw text.
        const prompt = encodeURIComponent(`You are CodeLearn AI, a helpful coding assistant. Keep answers concise and helpful for students. \n\nUser: ${message}\nAI:`);
        const response = await fetch(`https://text.pollinations.ai/${prompt}`);

        if (!response.ok) {
            throw new Error('Failed to fetch from AI provider');
        }

        const data = await response.text();

        return NextResponse.json({ response: data });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response', details: (error as Error).message },
            { status: 500 }
        );
    }
}
