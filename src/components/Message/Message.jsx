import './message.css';

export const Message = ({ role, content }) => {
    return (
        <article className={`message message--${role}`}>
            {role !== 'system' && (
                <section className="message__bubble">
                    <span className="message__sender">{role}</span>
                    <p className="message__text">{content}</p>
                </section>
            )}
        </article>
    );
};
