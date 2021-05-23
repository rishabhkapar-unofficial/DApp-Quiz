pragma solidity >=0.4.22 <0.9.0;

library Quiz {

  struct _Quiz {
    string title;
    string[] questions;
    address[] allowedStudents;
    mapping(address => mapping(uint => string)) studentResponses;
    bool live;
  }

  modifier isLive(bool _live) {
    require(_live == true);
    _;
  }

  function setTitle(_Quiz storage quiz, string memory title) public {
    quiz.title = title;
  }

  function getTitle(_Quiz storage quiz) public view returns(string memory) {
    return quiz.title;
  }

  function addQuestion(_Quiz storage quiz, string memory questionInJson) public {
    quiz.questions.push(questionInJson);
  }

  function getQuestion(_Quiz storage quiz, uint idx) public view returns(string memory) {
    return quiz.questions[idx];
  }

  function getNumberOfQuestions(_Quiz storage quiz) public view returns(uint) {
    return quiz.questions.length;
  }

  function addStudent(_Quiz storage quiz, address student) public {
    quiz.allowedStudents.push(student);
  }

  function isStudentAllowed(_Quiz storage quiz) public view returns(bool) {
    for(uint i = 0; i < quiz.allowedStudents.length; i++)
      if(quiz.allowedStudents[i] == msg.sender)
        return true;

    return false;
  }

  function setAnswer(_Quiz storage quiz, uint qid, string memory answer) isLive(quiz.live) public {
    if(isStudentAllowed(quiz))
      quiz.studentResponses[msg.sender][qid] = answer;
  }

  function getAnswer(_Quiz storage quiz, uint qid, address student) public view returns(string memory) {
    string memory ans = quiz.studentResponses[student][qid];
    bytes memory checkAns = bytes(ans);
    if(checkAns.length == 0)
      return '[]';
    else
      return ans;
  }

  function getAnswers(_Quiz storage quiz, address student) public view returns(string memory) {
    string memory response = '[';
    for(uint i = 0; i < getNumberOfQuestions(quiz); i++) {
      response = concatenate(response, getAnswer(quiz, i, student));
      if(i != getNumberOfQuestions(quiz)-1)
        response = concatenate(response, ',');
    }
    response = concatenate(response, ']');

    return response;
  }

  function concatenate(string memory a, string memory b) private view returns(string memory) {
    return string(abi.encodePacked(a, b));
  }

  function setLive(_Quiz storage quiz, bool live) public {
    quiz.live = live;
  }

  function getLive(_Quiz storage quiz) public view returns(bool) {
    return quiz.live;
  }
}

