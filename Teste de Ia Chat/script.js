document.getElementById('enviarBtn').addEventListener('click', enviarMensagem);

async function enviarMensagem() {
    const input = document.getElementById('mensagemInput');
    const mensagem = input.value;
    if (mensagem.trim() !== '') {
        const caixaChat = document.getElementById('caixaChat');
        adicionarMensagem('Você: ' + mensagem);
        input.value = ''; // Limpa o campo de entrada
        caixaChat.scrollTop = caixaChat.scrollHeight; // Rola para a parte inferior
        
        console.log("Enviando mensagem para a IA:", mensagem); // Log da mensagem enviada

        // Resposta da IA
        try {
            const respostaIA = await obterRespostaIA(mensagem);
            adicionarMensagem('IA: ' + respostaIA);
            caixaChat.scrollTop = caixaChat.scrollHeight; // Rola para a parte inferior
        } catch (error) {
            adicionarMensagem('IA: Desculpe, não consegui obter uma resposta.');
        }
    }
}

function adicionarMensagem(mensagem) {
    const caixaChat = document.getElementById('caixaChat');
    const novaMensagem = document.createElement('div');
    novaMensagem.className = 'mensagem';
    novaMensagem.textContent = mensagem;
    caixaChat.appendChild(novaMensagem);
}

async function obterRespostaIA(mensagem) {
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: mensagem })
    });

    if (!response.ok) {
        throw new Error('Erro na resposta da IA');
    }

    const data = await response.json();
    return data.response; // Ajuste conforme a estrutura da resposta da sua API
}