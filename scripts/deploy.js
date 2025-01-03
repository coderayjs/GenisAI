async function main() {
  const GenisPass = await ethers.getContractFactory("GenisPass");
  const genisPass = await GenisPass.deploy();
  await genisPass.deployed();

  console.log("GenisPass deployed to:", genisPass.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 