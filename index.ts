import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { createWordsSet } from './spamWords.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SpamAnalysisResult {
  isSpam: boolean;
  confidence: number;
  message: string;
}

// Initialize spam words set
const spamWords = createWordsSet();

// Function to analyze text for spam
function analyzeText(text: string): SpamAnalysisResult {
  const words = text.toLowerCase().split(/\s+/);
  let spamWordCount = 0;

  for (const word of words) {
    if (spamWords.has(word)) {
      spamWordCount++;
    }
  }

  const confidence = (spamWordCount / words.length) * 100;
  const isSpam = confidence > 30; // Threshold for spam detection

  return {
    isSpam,
    confidence,
    message: isSpam 
      ? `Found ${spamWordCount} spam indicators in the text`
      : 'Text appears to be legitimate'
  };
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { text } = await req.json();
    
    if (!text) {
      throw new Error('No text provided for analysis');
    }

    const result = analyzeText(text);

    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});