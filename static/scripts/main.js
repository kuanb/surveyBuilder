var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);


surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {

  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);
  $scope.flockSON = res;


  $scope.addNewChapter = function () {
    var title = document.getElementById('newChapter').value;
    document.getElementById('newChapter').value = '';

  }

  $scope.test = function () {
    $scope.flockSON.survey.chapters[0].questions[0].answers.forEach(function (each) {
      console.log(each.text);  
    })
  }

});


surveyBuilder.controller('surveyController', function ($scope, $location, $http) {


  $scope.addNewChapter = function () {
    var title = document.getElementById('newChapter').value;
    document.getElementById('newChapter').value = ''; console.log('ff')

  }

});









