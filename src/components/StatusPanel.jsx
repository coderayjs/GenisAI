import styled from 'styled-components';

const PanelContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  font-family: monospace;
  z-index: 1000;
  border: 2px solid transparent;
  background-image: linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)), 
                    linear-gradient(45deg, #DA498D, #FF8E53);
  background-origin: border-box;
  background-clip: content-box, border-box;
  width: 280px;
`;

const AsciiHeader = styled.pre`
  color: #DA498D;
  font-size: 0.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const StatusItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #DA498D, #FF8E53);
  border-radius: 2px;
`;

const StatusPanel = () => {
  return (
    <PanelContainer>
      <AsciiHeader>
{`
╔═════════════════════╗
║    MENTAL STATUS   ║
╚═════════════════════╝
`}
      </AsciiHeader>

      <StatusItem>
{`
┌─ HEALTH SCORE
└─➤ 85/100
`}
        <ProgressBar>
          <Progress progress={85} />
        </ProgressBar>
      </StatusItem>

      <StatusItem>
{`
┌─ MEDITATION STREAK
└─➤ Day 3 of 7
`}
        <ProgressBar>
          <Progress progress={42} />
        </ProgressBar>
      </StatusItem>

      <StatusItem>
{`
┌─ WEEKLY GOALS
└─➤ 4/5 Complete
`}
        <ProgressBar>
          <Progress progress={80} />
        </ProgressBar>
      </StatusItem>
    </PanelContainer>
  );
};

export default StatusPanel; 