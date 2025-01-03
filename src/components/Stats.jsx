import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 4rem 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
`;

const StatAscii = styled.pre`
  font-size: 0.7rem;
  line-height: 1;
  margin-bottom: 1rem;
  white-space: pre;
  font-family: monospace;
  color: #DA498D;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #DA498D;
`;

const StatLabel = styled.div`
  color: #666;
`;

const Stats = () => {
  const stats = [
    { 
      ascii: `
   \\o/
    |
   / \\`,
      number: "100K+", 
      label: "Holders" 
    },
    { 
      ascii: `
   $$$
   $$$
   $$$`,
      number: "$4.20M", 
      label: "Market Cap" 
    },
    { 
      ascii: `
    🐦
   >-->
    ||`,
      number: "69K", 
      label: "Twitter Followers" 
    }
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatItem key={index}>
          <StatAscii>{stat.ascii}</StatAscii>
          <StatNumber>{stat.number}</StatNumber>
          <StatLabel>{stat.label}</StatLabel>
        </StatItem>
      ))}
    </StatsContainer>
  );
};

export default Stats; 