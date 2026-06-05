function apiGemini(prompt, model, klucz) {
    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt },
                ],
            },
        ],
        generationConfig: { responseMimeType: "application/json" },
    };

    const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + klucz;

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then((r) => r.json())
        .then((d) => d.candidates[0].content.parts[0].text);
}
