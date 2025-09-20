// utils/translate.js
export async function translateText(text, targetLang = "en") {
  try {
    const res = await fetch("/translate", {
      method: "POST",
      body: JSON.stringify({ q: text, target: targetLang }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error("Error HTTP:", res.status, res.statusText);
      return text; // fallback al original
    }

    const data = await res.json();
    return data?.translatedText || text;
  } catch (err) {
    console.error("Error en translateText:", err);
    return text; // fallback → si falla, devolvemos el original
  }
}
