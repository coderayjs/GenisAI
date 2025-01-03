import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
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
  border-top-color: #FF6B6B;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const RewardContainer = styled.div`
  text-align: center;
  font-size: 2rem;
  color: #FF6B6B;
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

const AIAdvice = ({ question, answer, onRewardEarned }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const generateAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/generate-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAdvice(data.advice);
      setShowReward(true);
      if (onRewardEarned) {
        onRewardEarned(5000); // Reward 5000 XP for completing mental health check
      }
    } catch (error) {
      console.error('Error generating advice:', error);
      setAdvice('Sorry, I had trouble generating advice. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <AdviceContainer>
      {loading ? (
        <LoadingSpinner />
      ) : advice ? (
        <>
          <AdviceText>{advice}</AdviceText>
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