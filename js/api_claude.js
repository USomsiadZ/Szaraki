function apiClaude(prompt, model, klucz) {
    const requestBody = {
        model: model,
        max_tokens: 1024,
        messages: [
            {
                role: "user",
                content: prompt,
            },
            {
                role: "assistant",
                content: "{",
            },
        ],
    };

    return fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": klucz,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify(requestBody),
    })
        .then((r) => r.json())
        .then((d) => "{" + d.content[0].text);
}
