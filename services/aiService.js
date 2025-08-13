import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callAI = async (prompt, maxTokens) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens,
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
};

export const getDescription = async ({
  title,
  category,
  siteUrl,
  additionalContext,
}) => {
  let prompt = `Generate a short, engaging description (2-3 sentences) for a website with the title "${title}" in the "${category}" category. Make it informative, concise, and appealing to users.`;

  if (siteUrl) prompt += ` The website URL is: ${siteUrl}`;
  if (additionalContext) prompt += ` Additional context: ${additionalContext}`;

  return await callAI(prompt, 150);
};

export const getMultipleDescriptions = async ({
  title,
  category,
  count,
  siteUrl,
  additionalContext,
}) => {
  let prompt = `Generate ${count} different short, engaging descriptions (2-3 sentences each) for a website with the title "${title}" in the "${category}" category. Make them informative, concise, and appealing to users. Each description should have a different tone or focus.`;

  if (siteUrl) prompt += ` The website URL is: ${siteUrl}`;
  if (additionalContext) prompt += ` Additional context: ${additionalContext}`;
  prompt += ` Please number each description (1, 2, 3, etc.) and separate them with line breaks.`;

  return await callAI(prompt, 500);
};

export const getTitleSuggestions = async ({
  currentTitle,
  category,
  count,
}) => {
  const prompt = `Generate ${count} SEO-friendly title suggestions for a website currently titled "${currentTitle}" in the "${category}" category. Make them catchy, descriptive, and optimized for search engines. Keep them under 60 characters each. Please number each suggestion and separate them with line breaks.`;

  return await callAI(prompt, 200);
};
