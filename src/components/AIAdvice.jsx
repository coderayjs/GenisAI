import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #DA498D, #FF8E53);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  margin: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const AdviceContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AdviceText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #DA498D;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const RewardContainer = styled.div`
  text-align: center;
  font-size: 2rem;
  color: #DA498D;
  margin: 2rem 0;
  animation: slideIn 1s ease;
  font-family: 'Montserrat', sans-serif;

  .points {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .message {
    font-size: 1.5rem;
    color: #333;
    margin-top: 1rem;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AudioControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const AudioButton = styled.button`
  padding: 0.5rem 1rem;
  background: #DA498D;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #FF8E53;
  }
`;

const AIAdvice = ({ question, answer, onRewardEarned }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const generateAdvice = async () => {
    setLoading(true);
    try {
      console.log('Attempting to connect to API...', {
        question,
        answer
      });
      
      const response = await fetch('https://genis-five.vercel.app/api/generate-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          question,
          answer
        }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      if (data.advice) {
        setAdvice(data.advice);
        setShowReward(true);
        if (onRewardEarned) {
          onRewardEarned(5000);
        }
      } else {
        throw new Error('No advice received from API');
      }
    } catch (error) {
      console.error('Error connecting to server:', error);
      setAdvice('The AI service is currently unavailable. Please try again later.');
    }
    setLoading(false);
  };

  const handleSpeak = () => {
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Find a female English voice (preferably Samantha or similar)
    const femaleVoice = voices.find(voice => 
      (voice.name.includes('Samantha') || 
       voice.name.includes('Female') ||
       voice.name.includes('Victoria')) && 
      voice.lang.includes('en')
    ) || voices[0]; // Fallback to first available voice

    const utterance = new SpeechSynthesisUtterance(advice);
    utterance.voice = femaleVoice;
    utterance.rate = 0.9; // Slightly slower
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: advice }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'advice.mp3';
      a.click();
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  // Add voice loading on component mount
  useEffect(() => {
    // Load voices
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  return (
    <AdviceContainer>
      {loading ? (
        <LoadingSpinner />
      ) : advice ? (
        <>
          <AdviceText>{advice}</AdviceText>
          <AudioControls>
            <AudioButton onClick={handleSpeak}>
              🔊 Play
            </AudioButton>
            <AudioButton onClick={handleDownload}>
              ⬇️ Download MP3
            </AudioButton>
          </AudioControls>
          {showReward && (
            <RewardContainer>
               Mental Health Check Complete! 
              <div className="points">+5,000 XP</div>
              <div className="message">
                Thank you for being open about your mental health. Your well-being matters!
              </div>
            </RewardContainer>
          )}
        </>
      ) : (
        <Button onClick={generateAdvice}>Get AI Advice</Button>
      )}
    </AdviceContainer>
  );
};

export default AIAdvice; 