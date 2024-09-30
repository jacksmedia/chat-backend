app.post('/review', async (req, res) => {
    const { documentText } = req.body;

    const prompt = `Review the following legal document. Identify any missing or ambiguous clauses such as confidentiality, indemnity, or termination clauses. Document:\n\n${documentText}`;

    try {
        const response = await openai.Completion.create({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 500,
        });
        
        const analysis = response.choices[0].text;
        res.json({ analysis });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing document' });
    }
});
