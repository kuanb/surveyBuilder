var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);



surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {
  var addSupportObjects = function (fs) {
    var answerBase = {Text: ''};
    var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: angular.copy(answerBase) };
    fs.FlocktrackerProject.SurveyProject.Survey.Chapters = fs.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      chapter.Chapter.newQuestion = angular.copy(questionBase);
      return chapter;
    });
    return fs
  };

  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);

  $scope.flockSON = addSupportObjects(res);
  console.log($scope.flockSON);
});



surveyBuilder.controller('surveyController', function ($scope, $location, $http) {
  $scope.questionKinds = {
    IM: { verbose: 'Photo',           other: false, answers: false },
    MC: { verbose: 'Multiple Choice', other: true,  answers: true },
    CB: { verbose: 'Checkbox',        other: true,  answers: true },
    OT: { verbose: 'Open Text',       other: false, answers: false },
    ON: { verbose: 'Open Number',     other: false, answers: false },
    OL: { verbose: 'Ordered List',    other: false, answers: true },
    LP: { verbose: 'Loop',            other: false, answers: true },
  };
  var answerBase = {Text: ''};
  var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: answerBase };

  $scope.addChapter = function () {
    var title = document.getElementById('newChapter').value;
    document.getElementById('newChapter').value = '';
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.push({ Chapter: { Questions: [], Title: title, newQuestion: angular.copy(questionBase)} });
  };
  $scope.removeChapter = function (chapter) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.splice(chapter,1);
  }
  $scope.questionReady = function (question) {
    return  $scope.vetQuesID(question.ID) && 
            question.Text.length > 0 && 
            question.Kind.length > 0 ? true : false;
  }
  $scope.addQuestion = function (chapter) {
    var newQuestion = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion;
    var ok = $scope.questionReady(newQuestion);
    newQuestion.JumpID = newQuestion.JumpID ? newQuestion.JumpID : null;
    if (ok) {
      $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.push({Question: newQuestion}); 
      $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion = angular.copy(questionBase);
    }
  }

  $scope.vetQuesID = function (id) {
    if (id && id.length > 0) {
      var chapters = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters;
      var allIds = [];
      chapters.forEach(function (chapter) {
        chapter.Chapter.Questions.forEach(function (question) {
          allIds.push(question.Question.ID);
        })
      });
      if (allIds.indexOf(id) > -1) { return false } 
      else { return true }
    } else { return false; }
  }

  $scope.addAnswer = function (chapter) {
    var newAnswer = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.newAnswer;
    console.log(newAnswer);
    if (newAnswer.length > 0) {
      $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.Answers.push({Answer: newAnswer});
      $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.newAnswer = angular.copy(answerBase);
    }
  }

  $scope.removeQuestion = function (chapter, question) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
  }

  $scope.cleanQuestionID = function (stringID) {
    return stringID.split(' ').join('_').split('.').join(''); 
  }

});




