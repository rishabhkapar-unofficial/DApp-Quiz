const Quiz = artifacts.require("Quiz");
const Quizzes = artifacts.require("Quizzes");

module.exports = async function (deployer) {
  await deployer.deploy(Quiz);
  await deployer.link(Quiz, Quizzes);
  await deployer.deploy(Quizzes);
};
