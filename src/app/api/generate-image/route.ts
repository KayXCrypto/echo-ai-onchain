import { experimental_generateImage as generateImage, generateText } from 'ai';
import { openai, google } from '@/echo';
import { NextRequest } from 'next/server';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { prompt, model = 'gpt-image-1' } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let imageUrl: string;

    // Google/Gemini models use generateText with files
    if (model.startsWith('gemini-')) {
      const result = await generateText({
        model: google(model),
        prompt,
      });

      const imageFile = result.files?.find(file =>
        file.mediaType?.startsWith('image/')
      );

      if (!imageFile) {
        return Response.json(
          { error: 'No image generated' },
          { status: 500 }
        );
      }

      imageUrl = `data:${imageFile.mediaType};base64,${imageFile.base64}`;
    } else {
      // OpenAI uses generateImage
      const result = await generateImage({
        model: openai.image('gpt-image-1'),
        prompt,
      });

      const imageData = result.image;
      imageUrl = `data:${imageData.mediaType};base64,${imageData.base64}`;
    }

    const generationTime = (Date.now() - startTime) / 1000;

    return Response.json({
      imageUrl,
      generationTime,
      model,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return Response.json(
      { error: 'Failed to generate image', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

