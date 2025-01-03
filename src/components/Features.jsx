import styled from 'styled-components';

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AsciiArt = styled.pre`
  font-size: 0.7rem;
  line-height: 1;
  margin-bottom: 1rem;
  white-space: pre;
  font-family: monospace;
`;

const Features = () => {
  const features = [
    {
      ascii: `
    🤝
   /|\\
   / \\`,
      title: "Community Driven",
      description: "Join our vibrant community of holders and believers"
    },
    {
      ascii: `
   $$$
   $ 0
   $$$`,
      title: "Zero Tax",
      description: "Fair tokenomics with no hidden fees"
    },
    {
      ascii: `
   🔒
  [===]
   | |`,
      title: "LP Locked",
      description: "Liquidity locked for 69 years"
    }
  ];

  return (
    <FeaturesGrid>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <AsciiArt>{feature.ascii}</AsciiArt>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </FeatureCard>
      ))}
    </FeaturesGrid>
  );
};

export default Features; 