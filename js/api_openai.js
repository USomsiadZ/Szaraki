// API dla OpenAI
function apiOpenai(prompt, model, klucz) {
    const requestBody = {
        model: model,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: { type: "json_object" }
    };

    return fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + klucz,
        },
        body: JSON.stringify(requestBody),
    })
        .then((r) => r.json())
        .then((d) => d.choices[0].message.content);
}
