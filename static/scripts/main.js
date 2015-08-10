var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);



surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {
  // initialization
  var addSupportObjects = function (fs) {
    var answerBase = {Text: ''};
    var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: angular.copy(answerBase) };
    fs.FlocktrackerProject.SurveyProject.Survey.Chapters = fs.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      chapter.Chapter.newQuestion = angular.copy(questionBase);
      return chapter;
    });
    var trackerPortions = ['StartSurvey', 'EndSurvey'];
    trackerPortions.forEach(function (trackerPortion) {
      fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters = fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters.map(function (chapter) {
        chapter.Chapter.newQuestion = angular.copy(questionBase);
        return chapter;
      });
    });
    return fs
  };
  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);
  $scope.flockSON = addSupportObjects(res);
  $scope.currentTab = 'SurveyProject';

  // join survey operations
  var getAllQuestions = function () {
      var surveyChaps = $scope.flockSON.FlocktrackerProject.SurveyProject.Survey.Chapters;
      var trackerChaps1 = $scope.flockSON.FlocktrackerProject.TrackerProject.StartSurvey.Survey.Chapters;
      var trackerChaps2 = $scope.flockSON.FlocktrackerProject.TrackerProject.EndSurvey.Survey.Chapters;
      return surveyChaps.concat(trackerChaps1).concat(trackerChaps1);
  }
  $scope.vetQuesID = function (id) {
    if (id && id.length > 0) {
      var chapters = getAllQuestions();
      var allIds = [];
      chapters.forEach(function (chapter) {
        chapter.Chapter.Questions.forEach(function (question) {
          allIds.push(question.Question.ID);
        })
      });
      if (allIds.indexOf(id) > -1 && isNaN(Number(id[0]))) { 
        return false 
      } 
      else { return true }
    } else { return false; }
  }


  $scope.checkJump = function (id) {
    if (id && id.length > 0) {
      var chapters = getAllQuestions();
      allIds = {questions: [], answers: []};
      chapters.forEach(function (chapter) {
        chapter.Chapter.Questions.forEach(function (question) {
          if (id == question.Question.JumpID) { 
            allIds.questions.push(question) 
          }
          if (question.Question.Answers) {
            question.Question.Answers.forEach(function (answer) {
              if (id == answer.Answer.JumpID) { 
                allIds.answers.push(answer) 
              }
            });
          }
        })
      });
      if (allIds.questions.length > 0 || allIds.answers.length > 0) { 
        var string = [];
        allIds.questions.forEach(function (question) {
          string.push(' Question ' + question.Question.ID + ' (' + question.Question.Kind + ')');
        });
        allIds.answers.forEach(function (answer) {
          string.push(' Answer ' + answer.Question.ID);
        });
        alert('The JumpIDs need to be changed before this can be removed: ' + string);
        return false;
      } else { 
        return true;
      }
    } else { return false; }
  }

  $scope.questionReady = function (question) {
    return  $scope.vetQuesID(question.ID) && 
            question.Text.length > 0 && 
            question.Kind.length > 0 ? true : false;
  }

  $scope.cleanText = function (string) { 
    if (string) {
      while (!isNaN(Number(string[0])) || string[0] == ' ') {
        string = string.substr(1);
      }
      return string.split(' ').join('_').split('.').join(''); 
    } else {
      return string;
    }
  }

  $scope.submit = function () {
    var submit = angular.copy($scope.flockSON);
    submit.FlocktrackerProject.SurveyProject.Survey.Chapters = submit.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      delete chapter.Chapter.newQuestion;
      return chapter;
    });
    var trackerPortions = ['StartSurvey', 'EndSurvey'];
    trackerPortions.forEach(function (trackerPortion) {
      submit.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters = submit.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
        delete chapter.Chapter.newQuestion;
        return chapter;
      });
    });
    console.log(submit);
  }

  $scope.tests = function () {
    console.log($scope);
  }
});


surveyBuilder.controller('counterController', function ($scope) {
  $scope.vetCounter = function (part, text) {
    var tempArray = [];
    if (part == 'name') {
      $scope.flockSON.FlocktrackerProject.CountersProject.Counters.forEach(function (counter) {
        tempArray.push(counter.Counter.Name);
      });
    } else if (part == 'id') {
      $scope.flockSON.FlocktrackerProject.CountersProject.Counters.forEach(function (counter) {
        tempArray.push(counter.Counter.ID);
      });
    } else {
      throw new Error('$scope.vetCounter received invalid input.');
    }
    if (tempArray.indexOf(text) > -1) {
      return false;
    } else {
      return true;
    }
  };

  $scope.addCounter = function (newCounter) {
    $scope.flockSON.FlocktrackerProject.CountersProject.Counters.push({Counter: newCounter});
  }

  $scope.removeCounter = function (index) {
    $scope.flockSON.FlocktrackerProject.CountersProject.Counters.splice(index, 1);
  }
});


surveyBuilder.controller('surveyController', function ($scope, $location, $http) {

  $scope.trackerPortion = 'StartSurvey';
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

  var ref = function () {
    var obj = $scope.flockSON.FlocktrackerProject;
    var str;
    if ($scope.currentTab=='SurveyProject') {
      str = 'SurveyProject';
    } else if ($scope.currentTab=='TrackerProject') {
      str = 'TrackerProject.' + $scope.trackerPortion;
    } else {
      throw new Error('$scope not tracker or survey...');
    }
    return str.split('.').reduce(function(o, x) { return o[x] }, obj);
  };

  $scope.addChapter = function () {
    var id = 'newChapter_' + $scope.currentTab;
    var title = document.getElementById(id).value;
    document.getElementById(id).value = '';
    ref().Survey.Chapters.push({ Chapter: { Questions: [], Title: title, newQuestion: angular.copy(questionBase)} });
  };
  $scope.removeChapter = function (chapter) {
    ref().Survey.Chapters.splice(chapter,1);
  }
  $scope.addQuestion = function (chapter) {
    var newQuestion = ref().Survey.Chapters[chapter].Chapter.newQuestion;
    var ok = $scope.questionReady(newQuestion);
    newQuestion.JumpID = newQuestion.JumpID ? newQuestion.JumpID : null;
    if (ok) {
      ref().Survey.Chapters[chapter].Chapter.Questions.push({Question: newQuestion}); 
      ref().Survey.Chapters[chapter].Chapter.newQuestion = angular.copy(questionBase);
    }
  }
  $scope.addAnswer = function (chapter) {
    var newAnswer = ref().Survey.Chapters[chapter].Chapter.newQuestion.newAnswer;
    if (newAnswer.Text.length > 0) {
      ref().Survey.Chapters[chapter].Chapter.newQuestion.Answers.push({Answer: newAnswer});
      ref().Survey.Chapters[chapter].Chapter.newQuestion.newAnswer = angular.copy(answerBase);
    }
  }

  $scope.removeQuestion = function (chapter, question) {
    var quesID = ref().Survey.Chapters[chapter].Chapter.Questions[question].Question.ID;
    if ($scope.checkJump(quesID)) {
      ref().Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
    }
  }

});




