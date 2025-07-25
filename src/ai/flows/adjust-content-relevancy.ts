'use server';

/**
 * @fileOverview Adjusts displayed content based on user interests.
 *
 * - adjustContent - A function that adjusts the content based on user interests.
 * - AdjustContentInput - The input type for the adjustContent function.
 * - AdjustContentOutput - The return type for the adjustContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustContentInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A description of the users interests.'),
  contentList: z
    .string()
    .array()
    .describe('A list of content snippets to be adjusted.'),
});
export type AdjustContentInput = z.infer<typeof AdjustContentInputSchema>;

const AdjustContentOutputSchema = z.object({
  adjustedContentList: z
    .string()
    .array()
    .describe('The content list adjusted based on user interests.'),
});
export type AdjustContentOutput = z.infer<typeof AdjustContentOutputSchema>;

export async function adjustContent(input: AdjustContentInput): Promise<AdjustContentOutput> {
  return adjustContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustContentPrompt',
  input: {schema: AdjustContentInputSchema},
  output: {schema: AdjustContentOutputSchema},
  prompt: `You are an AI assistant that personalizes content based on user interests.

Given the following user interests:

{{userInterests}}

And the following list of content snippets:

{{#each contentList}}{{{this}}}\n{{/each}}

Adjust the order of the content snippets so that the most relevant content appears first, and return the adjusted list.
Ensure that all content snippets from the original list are present in the adjusted list.
`,
});

const adjustContentFlow = ai.defineFlow(
  {
    name: 'adjustContentFlow',
    inputSchema: AdjustContentInputSchema,
    outputSchema: AdjustContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
