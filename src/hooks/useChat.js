import { useEffect, useState } from 'react';
import { llm } from '../langchain/llm';
import {
    HumanMessage,
    AIMessage,
    SystemMessage,
} from '@langchain/core/messages';

export const useChat = () => {
    const [messages, setMessages] = useState(() => {
        // Hämtar chathistorik från localStorage om det finns, annars välkomstmeddelande
        const chatHistory = JSON.parse(localStorage.getItem('messages')) || [
            {
                role: 'assistant',
                content: 'Hej! Hur kan jag hjälpa dig?',
            },
        ];

        return chatHistory.map((message) => {
            if (message.role === 'user') {
                return new HumanMessage(message.content);
            } else {
                return new AIMessage(message.content);
            }
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // När messages uppdateras:
    useEffect(() => {
        // Tilldelar role på varje message baserat på getType:s värde
        const chatHistory = messages.map((message) => ({
            role: message.getType() === 'human' ? 'user' : 'assistant',
            content: message.content,
        }));

        // Lagrar historiken i localStorage
        localStorage.setItem('messages', JSON.stringify(chatHistory));
    }, [messages]);

    // Hämta svar
    const getAnswer = async (userInput, option, language) => {
        const userMessage = new HumanMessage(userInput);

        // Lagrar alla tidigare meddelanden samt nytt meddelande
        const history = [...messages, userMessage];

        setMessages(history);
        setIsLoading(true);
        setError(false);

        try {
            // Tilldelar riktlinjer baserat på användarens val
            const systemMessage =
                option === 'translate'
                    ? new SystemMessage(
                          `Översätt användarens text till ${language}. Svara endast i formatet: "Översättning: <översatt text>"`,
                      )
                    : option === 'grammar'
                      ? new SystemMessage(
                            'Korrigera grammatiken i användarens text och svara i formatet: "Korrigerad grammatik: <korrigerad text>"',
                        )
                      : new SystemMessage('Besvara användarens text.');

            // Lägger till AI:n's svar samt riktlinjer (systemMessage) i messages
            const answer = await llm.invoke([systemMessage, ...history]);

            const aiMessage = new AIMessage(answer.content);

            setMessages([...history, aiMessage]);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        getAnswer,
        isLoading,
        error,
    };
};
