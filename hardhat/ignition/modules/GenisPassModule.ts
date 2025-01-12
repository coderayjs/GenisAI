import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GenisPassModule = buildModule("GenisPassModule", (m) => {
    // Deploy the Genesis Pass NFT contract
    const genisPass = m.contract("GenisPass", []);

    // Set the base URI after deployment
    m.call(genisPass, "setBaseURI", ["https://raw.githubusercontent.com/coderayjs/GenisAI/master/metadata/"]);

    return { genisPass };
});

export default GenisPassModule; 