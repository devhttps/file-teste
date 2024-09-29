const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurações do Express
app.use(cors());
app.use(bodyParser.json());

// Rota para receber mensagens do usuário
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log("Mensagem do usuário:", userMessage); // Log da mensagem do usuário

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer SEU_API_KEY`, // Substitua 'SEU_API_KEY' pelo seu token de API
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].message.content;
        console.log("Resposta da IA:", aiResponse); // Log da resposta da IA
        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Erro ao se comunicar com a IA:", error.response?.data || error.message); // Log do erro detalhado
        res.status(500).send('Erro ao se comunicar com a IA');
    }
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
