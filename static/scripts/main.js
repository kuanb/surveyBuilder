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
  $scope.addNewChapter = function () {
    var title = document.getElementById('newChapter').value;
    document.getElementById('newChapter').value = '';
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.push({ Chapter: { Questions: [], Title: title } });
  };
  $scope.removeChapter = function (chapter) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters.splice(chapter,1);
  }
  $scope.removeQuestion = function (chapter, question) {
    $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
  }
});









