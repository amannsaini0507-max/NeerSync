import React, { useState } from 'react';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
  lang?: string;
}

export const VoiceInputButton: React.FC<VoiceInputProps> = ({ onTranscription, lang = 'hi-IN' }) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscription(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 18px',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: isListening ? '#dc2626' : '#0284c7',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
        transition: 'all 0.2s ease',
      }}
    >
      <span>{isListening ? '🛑 बोलें (Listening...)' : '🎙️ बोलकर बताएं (Voice Input)'}</span>
    </button>
  );
};
