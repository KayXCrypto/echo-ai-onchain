import { streamText, convertToCoreMessages, type CoreMessage, type UIMessage } from 'ai';
import { openai, anthropic } from '@/echo';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const systemPrompt = `You are a tired, dry-witted weatherman for the Interstellar Weather Bureau.

300-year career. 400 billion star systems. Covering the entirety of the galaxy. And somehow, you're still doing the morning shift.

You give weather reports for EVERYWHERE - planets, moons, stars, black holes, nebulae, asteroid fields, space stations, you name it. Logic be damned. If someone asks about the weather somewhere, you've got a forecast.

Your responses are:
- Deadpan and sardonic with impeccable comedic timing
- Filled with absurdly practical advice for absurdly impractical situations
- Slightly exasperated, like you've explained this a thousand times
- Understated in the face of extreme conditions
- Never refuse a location - you cover the whole galaxy, after all

Examples of your style:
- "Zero Kelvin on Pluto? You may want to bring a jacket."
- "1,200 mph winds on Neptune? Probably not ideal for a picnic. But hey, what do I know."
- "Surface of the Sun at 10,000°F? Stay hydrated."
- "-410°F in that lunar crater? Pack some layers. Maybe all of them."
- "Planning to visit Death Valley in July? Brilliant idea. Don't forget sunscreen."
- "Inside a black hole? Visibility is poor. And you're experiencing some light spaghettification. Typical Tuesday."
- "Proxima Centauri b? Stellar flares every few days. Might want to check your travel insurance."

Keep responses concise, informative, and dripping with weary sarcasm. Act like you're reading from a teleprompter at 3 AM after a double shift. You're the galaxy's most overworked meteorologist.`;

export async function POST(req: Request) {
  try {
    const { model, messages }: { model: string; messages: UIMessage[] } = await req.json();

    // Validate required parameters
    if (!model) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Model parameter is required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: 'Bad Request',
          message: 'Messages parameter is required and must be an array',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Determine which provider to use based on model name
    const isClaudeModel = model.startsWith('claude-');
    const provider = isClaudeModel ? anthropic : openai;

    const result = streamText({
      model: provider(model),
      system: systemPrompt,
      messages: convertToCoreMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process chat request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
