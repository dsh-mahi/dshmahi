'use server';

/**
 * @fileOverview A personalized greeting AI agent.
 *
 * - personalizeGreeting - A function that personalizes a greeting for a user.
 * - PersonalizeGreetingInput - The input type for the personalizeGreeting function.
 * - PersonalizeGreetingOutput - The return type for the personalizeGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeGreetingInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  location: z.string().optional().describe('The location of the user.'),
  interests: z.string().optional().describe('The interests of the user.'),
});
export type PersonalizeGreetingInput = z.infer<typeof PersonalizeGreetingInputSchema>;

const PersonalizeGreetingOutputSchema = z.object({
  greeting: z.string().describe('A personalized greeting for the user.'),
});
export type PersonalizeGreetingOutput = z.infer<typeof PersonalizeGreetingOutputSchema>;

export async function personalizeGreeting(input: PersonalizeGreetingInput): Promise<PersonalizeGreetingOutput> {
  return personalizeGreetingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeGreetingPrompt',
  input: {schema: PersonalizeGreetingInputSchema},
  output: {schema: PersonalizeGreetingOutputSchema},
  prompt: `You are a personalized greeting assistant. You will generate a personalized greeting for the user based on their name, location, and interests.

User Name: {{{name}}}
User Location: {{{location}}}
User Interests: {{{interests}}}

Greeting:`,
});

const personalizeGreetingFlow = ai.defineFlow(
  {
    name: 'personalizeGreetingFlow',
    inputSchema: PersonalizeGreetingInputSchema,
    outputSchema: PersonalizeGreetingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
