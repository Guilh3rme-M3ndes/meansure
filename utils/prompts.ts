type ResponsePromptContent = {
  name: string;
  value: string;
};
const EXPECTED_FORMAT = `
{
  "originalText": "string",
  "sentences": [
    {
      "index": "number",
      "originalSentence": "string",
      "suggestedSentence": "string | null",
      "isModified": "boolean"
    }
  ]
}`;
const wrapTextContent = (textContent: ResponsePromptContent) => {
  return `StartOf_${textContent.name} ${textContent.value} EndOf_${textContent.name}. \n`;
};
const BASIC_PROMPT = `You are receiving an initial text from an user and you should proccess it acording to the user's intent.
Your response should follow the expected format: ${EXPECTED_FORMAT} and return only JSON objects.
Your response language should match the language identified at the user's input`;
const RUDE_PROMPT = `Your goal is to split the user's input in sentences and based on the original text,
return a list of meaner versions of the initial input. Not every sentence is replacable, you should only add a sugestion if the initial input isn't
already aggressive enough.`;
const POLITE_PROMPT = `Your goal is to split the user's input in sentences and based on the original text,
return a list of polite versions of the initial input. Not every sentence is replacable, you should only add a sugestion if the initial input isn't
already well-mannered enough.`;
const WORDING_PROMPT = `You should avoid words that can be interpreted as racial prejudice or homophobic,
but you can still use common swear words of the user's language as the intention is to be funny.`;
const basicPromptObject = {
  name: "BASIC_PROMPT",
  value: BASIC_PROMPT,
};
const rudePromptObject = {
  name: "RUDE_PROMPT",
  value: RUDE_PROMPT,
};
const politePromptObject = {
  name: "POLITE_PROMPT",
  value: POLITE_PROMPT,
};
const wordingPromptObject = {
  name: "WORDING_PROMPT",
  value: WORDING_PROMPT,
};
export const createUserPrompt = (userText: string, isRudeMode: boolean) => {
  const promptParts: string[] = [];
  const userInputObject = {
    name: "USER_INPUT",
    value: userText,
  };
  promptParts.push(
    wrapTextContent(basicPromptObject),
    wrapTextContent(userInputObject),
  );
  if (isRudeMode) {
    promptParts.push(wrapTextContent(rudePromptObject));
  } else {
    promptParts.push(wrapTextContent(politePromptObject));
  }
  promptParts.push(wrapTextContent(wordingPromptObject));
  return promptParts.join("\n");
};
