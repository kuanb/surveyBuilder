var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);



surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {
  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);
  $scope.flockSON = res; 
  console.log($scope.flockSON);

  $scope.test = function () {
    $scope.flockSON.survey.chapters[0].questions[0].answers.forEach(function (each) {
      console.log(each.text);  
    })
  }
});



surveyBuilder.controller('surveyController', function ($scope, $location, $http) {
  $scope.questionKinds = {
    IM: 'Photo',
    MC: 'Multiple Choice',
    CB: 'Checkbox',
    OT: 'Open Text',
    OL: 'Ordered List',
  };
  var questionBase = { ID: '', Text: '', Kind: '', JumpID: '' };

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
      if (!newQuestion.ID) { ok = false; }
      if (!newQuestion.Text) { ok = false; }
      if (!newQuestion.Kind) { ok = false; }
      if (!newQuestion.JumpID) { newQuestion.JumpID = null; }
      if (ok) { 
        $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.push({Question: newQuestion}); 
        $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.newQuestion = questionBase;
      }
    }
    }

  $scope.removeQuestion = function (chapter, question) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
  }

  $scope.cleanQuestionID = function (stringID) {
    return stringID.split(' ').join('_').split('.').join(''); 
  }
});









