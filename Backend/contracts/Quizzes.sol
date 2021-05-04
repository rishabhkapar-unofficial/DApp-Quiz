pragma solidity >=0.4.22 <0.9.0;

import "./Quiz.sol";

contract Quizzes {

  using Quiz for Quiz._Quiz;

  address public owner;
  mapping(string => Quiz._Quiz) public quizzes;

  constructor() public {
    owner = msg.sender;
  }
  
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function setTitle(string memory quiz_id, string memory title) onlyOwner public {
    quizzes[quiz_id].setTitle(title);
  }

  function addQuestion(string memory quiz_id, string memory question) onlyOwner public {
    quizzes[quiz_id].addQuestion(question);
  }

  function addStudent(string memory quiz_id, address student) onlyOwner public {
    quizzes[quiz_id].addStudent(student);
  }

  function getStudentResponse(string memory quiz_id, address student) onlyOwner public view returns(string memory) {
    return quizzes[quiz_id].getAnswers(student);
  }

  function setLive(string memory quiz_id, bool live) onlyOwner public {
    quizzes[quiz_id].setLive(live);
  }

  function getQuizDetails(string memory quiz_id) public view returns(string memory) {
    string memory response = "{";
    response = concatenate(response, keyValToJson("title", quizzes[quiz_id].getTitle()));
    response = concatenate(response, ",");
    if(quizzes[quiz_id].getLive())
      response = concatenate(response, keyValToJson("live", "true"));
    else
      response = concatenate(response, keyValToJson("live", "false"));
    response = concatenate(response, ",");
    response = concatenate(response, keyValToJson("question_count", uintToString(quizzes[quiz_id].getNumberOfQuestions())));
    response = concatenate(response, "}");
    return response;
  }

  function amIAllowed(string memory quiz_id) public view returns(bool) {
    return quizzes[quiz_id].isStudentAllowed();
  }

  function getNumberOfQuestions(string memory quiz_id) public view returns(uint) {
    return quizzes[quiz_id].getNumberOfQuestions();
  }

  function getQuestion(string memory quiz_id, uint ques_id) public view returns(string memory) {
    return quizzes[quiz_id].getQuestion(ques_id);
  }

  function setAnswer(string memory quiz_id, uint ques_id, string memory answer) public {
    quizzes[quiz_id].setAnswer(ques_id, answer);
  }
  
  function getTitle(string memory quiz_id) public view returns(string memory) {
    return quizzes[quiz_id].getTitle();
  }

  function getLive(string memory quiz_id) public view returns(bool) {
    return quizzes[quiz_id].getLive();
  }

  function getAnswer(string memory quiz_id, uint ques_id) public view returns(string memory) {
    return quizzes[quiz_id].getAnswer(ques_id, msg.sender);
  }

  function getAnswers(string memory quiz_id) public view returns(string memory) {
    return quizzes[quiz_id].getAnswers(msg.sender);
  }

  function keyValToJson(string memory key, string memory value) private view returns(string memory) {
    string memory str = '"';
    str = concatenate(str, key);
    str = concatenate(str, '":"');
    str = concatenate(str, value);
    str = concatenate(str, '"');
    return str;
  } 


  function concatenate(string memory a, string memory b) private view returns(string memory) {
    return string(abi.encodePacked(a, b));
  }


  function uintToString(uint v) private view returns (string memory str) {
      uint maxlength = 100;
      bytes memory reversed = new bytes(maxlength);
      uint i = 0;
      while (v != 0) {
          uint remainder = v % 10;
          v = v / 10;
          reversed[i++] = byte(uint8(48 + remainder));
      }
      bytes memory s = new bytes(i + 1);
      for (uint j = 0; j <= i; j++) {
          s[j] = reversed[i - j];
      }
      str = string(s);
      return str;
  }

}

