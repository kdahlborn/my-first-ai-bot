import { Select } from '@mantine/core';
import './options.css';

const Options = ({ value, onChange, language, onLanguageChange }) => {
    return (
        <div className="chat__options">
            <Select
                w={190}
                className="chat__select"
                value={value}
                onChange={onChange}
                data={[
                    { value: 'chat', label: 'Vanlig chat' },
                    { value: 'translate', label: 'Översätt' },
                    { value: 'grammar', label: 'Korrigera grammatik' },
                ]}
                allowDeselect={false}
            />

            {value === 'translate' && (
                <label className="chat__label">
                    till
                    <Select
                        w={110}
                        className="chat__select"
                        value={language}
                        onChange={onLanguageChange}
                        data={[
                            { value: 'svenska', label: 'Svenska' },
                            { value: 'engelska', label: 'Engelska' },
                            { value: 'tyska', label: 'Tyska' },
                            { value: 'spanska', label: 'Spanska' },
                            { value: 'franska', label: 'Franska' },
                            { value: 'ryska', label: 'Ryska' },
                        ]}
                        allowDeselect={false}
                    />
                </label>
            )}
        </div>
    );
};

export default Options;
