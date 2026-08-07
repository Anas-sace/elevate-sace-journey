/** Server-only machine translation used by the site-wide language switcher. */

const ENDPOINT = "https://ai.gateway.lovable.dev/v1/chat/completions";

export async function translateTexts(texts: string[], languageName: string): Promise<string[]> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey || texts.length === 0) return texts;

  const payload = Object.fromEntries(texts.map((t, i) => [String(i), t]));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            `You translate website interface copy from Australian English into ${languageName}. ` +
            "You receive a JSON object of id -> source string. Return ONLY a JSON object with the same ids " +
            "and translated strings. Keep names of people, the brand names SACE, IELTS, PTE, CELTA, TOEIC, " +
            "Cambridge and Adelaide untranslated. Preserve punctuation, capitalisation style, numbers and " +
            "leading/trailing spaces. Never add commentary.",
        },
        { role: "user", content: JSON.stringify(payload) },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) return texts;

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const raw = json.choices?.[0]?.message?.content;
  if (!raw) return texts;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return texts.map((t, i) => {
      const v = parsed[String(i)];
      return typeof v === "string" && v.trim() ? v : t;
    });
  } catch {
    return texts;
  }
}
