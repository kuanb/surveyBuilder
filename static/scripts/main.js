var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);


surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {

  console.log(flockSON);

  $scope.flockSON = flockSON;

$scope.test = function () {
  $scope.flockSON.survey.chapters[0].questions[0].answers.forEach(function (each) {
    console.log(each.text);  
  })
  
}
  

});









