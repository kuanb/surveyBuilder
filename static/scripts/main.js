var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);



surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {
  var addSupportObjects = function (fs) {
    var answerBase = {Text: '', ID: ''};
    var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: answerBase };
    fs.FlocktrackerProject.SurveyProject.Survey.Chapters = fs.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      chapter.Chapter.newQuestion = questionBase;
      return chapter;
    });
    return fs
  };

  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);

  $scope.flockSON = addSupportObjects(res);
  console.log($scope.flockSON);

  $scope.test = function () {
    $scope.flockSON.survey.chapters[0].questions[0].answers.forEach(function (each) {
      console.log(each.text);  
    })
  }
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
  var answerBase = {Text: '', ID: ''};
  var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: answerBase };

  $scope.addChapter = function () {
    var title = document.getElementById('newChapter').value;
    document.getElementById('newChapter').value = '';
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.push({ Chapter: { Questions: [], Title: title, newQuestion: questionBase} });
  };
  $scope.removeChapter = function (chapter) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.splice(chapter,1);
  }
  $scope.addQuestion = function (chapter) {
    var newQuestion = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion;
    var ok = true;
    if (newQuestion) {
      if (!vetQuesID(newQuestion.ID)) { ok = false; }
      if (!newQuestion.Text) { ok = false; }
      if (!newQuestion.Kind) { ok = false; }
      if (!newQuestion.JumpID) { newQuestion.JumpID = null; }
      if (ok) { 
        $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.push({Question: newQuestion}); 
        $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion = questionBase;
      }
    }
  }
  var vetQuesID = function (id) {
    if (id) {
      return true;
    } else {
      return false;
    }
  }

  $scope.addAnswer = function (chapter) {
    var newAnswer = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.newAnswer;
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.Answers.push({Answer:newAnswer});
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion.newAnswer = answerBase;
  }

  $scope.removeQuestion = function (chapter, question) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
  }

  $scope.cleanQuestionID = function (stringID) {
    return stringID.split(' ').join('_').split('.').join(''); 
  }
});









