import styled from 'styled-components';
import { useState } from 'react';
import AIAdvice from './components/AIAdvice';
import Census from './components/Census';
import { UserProvider, useUser } from './context/UserContext';
import UserHeader from './components/UserHeader';
import InfoLinks from './components/InfoLinks';
import Footer from './components/Footer';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.pre`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  white-space: pre;
  font-family: monospace;
  line-height: 1;
`;

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

const QuestionContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Description = styled.p`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 2rem auto;
  line-height: 1.8;
  color: #555;
  font-family: 'Montserrat', sans-serif;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid #ddd;
  font-family: 'Montserrat', sans-serif;
  resize: vertical;
`;

const CensusPrompt = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, #DA498D, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PromptTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const PromptDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;

  span {
    color: #DA498D;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  ${Button} {
    min-width: 120px;
  }
`;

const PreviewText = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const AppContent = ({ children }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCensusPrompt, setShowCensusPrompt] = useState(false);
  const [showCensus, setShowCensus] = useState(false);
  const [modalQuestion, setModalQuestion] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  
  const { updateUserXP } = useUser();

  const handleGetStarted = () => {
    setShowCensusPrompt(true);
  };

  const handleCensusResponse = (response) => {
    if (response === 'yes') {
      setShowCensus(true);
    } else {
      setShowQuestions(true);
    }
    setShowCensusPrompt(false);
  };

  const handleCensusComplete = () => {
    updateUserXP(10000);
    setShowQuestions(true);
  };

  const handleMentalHealthReward = (points) => {
    updateUserXP(points);
  };

  const openModal = (question) => {
    setModalQuestion(question);
    setShowModal(true);
  };

  const handleSubmit = () => {
    setCurrentQuestion(modalQuestion);
    setCurrentAnswer(answer);
    setShowModal(false);
    setAnswer('');
  };

  return (
    <>
      <UserHeader />
      <div style={{ 
        backgroundColor: '#ffffff', 
        color: '#333', 
        lineHeight: 1.6,
        paddingTop: '80px'
      }}>
        <Container>
          <Logo>
{`
 ██████╗ ███████╗███╗   ██╗██╗███████╗     █████╗ ██╗
██╔════╗ ██╔════╝████╗  ██║██║██╔════╝    ██╔══██╗██║
██║  ███╗█████╗  ██╔██╗ ██║██║███████╗    ███████║██║
██║   ██║██╔══╝  ██║╚██╗██║██║╚════██║    ██╔══██║██║
╚██████╔╝███████╗██║ ╚████║██║███████║    ██║  ██║██║
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝
                    MENTAL HEALTH AI
`}
          </Logo>

          <Description>
            Welcome to GENIS, an AI-powered mental health awareness platform dedicated to helping men become better versions of themselves. 
            We provide a safe, judgment-free space to discuss personal growth, emotional well-being, and mental health. 
            Our goal is to break down stigmas and empower men to embrace vulnerability, seek support, and foster positive personal development.
          </Description>

          {!showCensusPrompt && !showCensus && !showQuestions && (
            <Button onClick={handleGetStarted}>
              JOIN CENSUS
            </Button>
          )}

          {showCensusPrompt && (
            <CensusPrompt>
              <PromptTitle>Would you like to participate in our census?</PromptTitle>
              <PromptDescription>
                Complete the census to earn <span>10,000 XP</span> and join our community of mental health advocates!
              </PromptDescription>
              <ButtonGroup>
                <Button onClick={() => handleCensusResponse('yes')}>Yes, I'm In!</Button>
                <Button 
                  onClick={() => handleCensusResponse('no')}
                  style={{ 
                    background: 'white',
                    color: '#DA498D',
                    border: '2px solid #DA498D'
                  }}
                >
                  USE GENIS AI
                </Button>
              </ButtonGroup>
            </CensusPrompt>
          )}

          {showCensus && (
            <Census onComplete={handleCensusComplete} />
          )}

          {showQuestions && !showModal && (
            <QuestionContainer>
              <Button onClick={() => openModal("How do you feel about your mental health today?")}>
                Mental Health Check-in
              </Button>
              <Button onClick={() => openModal("What's challenging you the most right now?")}>
                Current Challenges
              </Button>
            </QuestionContainer>
          )}

          {showModal && (
            <Modal>
              <ModalContent>
                <h2>{modalQuestion}</h2>
                <Input 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Share your thoughts..."
                />
                {answer && (
                  <PreviewText>
                    Your response: {answer}
                  </PreviewText>
                )}
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => setShowModal(false)}>Close</Button>
              </ModalContent>
            </Modal>
          )}

          {currentAnswer && currentQuestion && (
            <AIAdvice 
              question={currentQuestion} 
              answer={currentAnswer}
              onRewardEarned={handleMentalHealthReward}
            />
          )}
        </Container>
        <InfoLinks />
        <Footer />
      </div>
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App; 