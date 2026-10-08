import { useRef, useState } from 'react';
import { Message } from '../Message/Message.jsx';
import { useChat } from '../../hooks/useChat.js';
import './chat.css';
import Options from '../Options/Options.jsx';
import Loading from '../Loading/Loading.jsx';

export const Chat = () => {
    const { messages, getAnswer, isLoading, error } = useChat();
    const inputRef = useRef();
    const [option, setOption] = useState('chat');
    const [language, setLanguage] = useState('engelska');

    const messageComponents = messages.map((message, index) => {
        const role = message.getType() === 'human' ? 'user' : 'assistant';

        return <Message key={index} content={message.content} role={role} />;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const userInput = inputRef.current.value;
        inputRef.current.value = '';

        console.log(option, language);

        getAnswer(userInput, option, language);
    };

    return (
        <main className="chat">
            <section className="chat__message">
                {messageComponents}

                {isLoading && <Loading />}
                {error && <p className="chat__error">{error}</p>}
            </section>
            <form className="chat__form" onSubmit={handleSubmit}>
                <div className="chat__input-wrapper">
                    <Options
                        value={option}
                        onChange={setOption}
                        language={language}
                        onLanguageChange={setLanguage}
                    />

                    <input
                        type="text"
                        className="chat__input"
                        ref={inputRef}
                        placeholder="Skriv ett meddelande..."
                    />

                    <button className="chat__submit">Skicka!</button>
                </div>
            </form>
        </main>
    );
};
