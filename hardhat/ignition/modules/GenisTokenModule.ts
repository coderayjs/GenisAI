import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GenisTokenModule = buildModule("GenisTokenModule", (m) => {
    // Deploy the Genesis Token contract
    const genisToken = m.contract("GenisToken", []);

    // Optional: You could add post-deployment steps
    // For example, to pause the contract initially:
    // m.call(genisToken, "pause", []);
    
    return { genisToken };
});

export default GenisTokenModule; 