"use server";
export async function handleAnalyze(formData: FormData) {
  const text = formData.get("userText");
  const isRudeMode = formData.get("isRudeMode") === "true";
  console.log("data obtained: ", text);
  //todo: server-action for llm text processing;
}
