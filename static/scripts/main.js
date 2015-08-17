var surveyBuilder = angular.module('surveyBuilderApp', ['ui.bootstrap', 'ui.sortable']);



surveyBuilder.controller('surveyBuilder', function ($scope, $location, $http) {
  // initialization
  var addSupportObjects = function (fs) {
    var surveyBase = {Survey: {Title: ''}};
    var answerBase = {JumpID: null, Text: '', Value: ''};
    var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: angular.copy(answerBase) };

    if (!fs.FlocktrackerProject.SurveyProject) {
      fs.FlocktrackerProject.SurveyProject = angular.copy(surveyBase);
    }
    fs.FlocktrackerProject.SurveyProject.Survey.Chapters = fs.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      chapter.Chapter.newQuestion = angular.copy(questionBase);
      return chapter;
    });
    
    if (!fs.FlocktrackerProject.TrackerProject) {
      fs.FlocktrackerProject.TrackerProject = {StartSurvey: angular.copy(surveyBase), EndSurvey: angular.copy(surveyBase)};
    }
    ['StartSurvey', 'EndSurvey'].forEach(function (trackerPortion) {
      if (!fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapter) {
        fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters = [];
      }
      fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters = fs.FlocktrackerProject.TrackerProject[trackerPortion].Survey.Chapters.map(function (chapter) {
        chapter.Chapter.newQuestion = angular.copy(questionBase);
        return chapter;
      });
    });
    
    if (!fs.FlocktrackerProject.CountersProject) {
      fs.FlocktrackerProject.CountersProject = {Counters: []};
    }

    return fs
  };
  var fs  = new FT_pr(),
      res = fs.fSON.getJSON(inputString);
  $scope.flockSON = addSupportObjects(res);
  $scope.currentTab = 'SurveyProject';

  $scope.submit = function () {
    var submit = angular.copy($scope.flockSON);
    delete submit.FlocktrackerProject.SurveyProject.Survey.newChapter;
    submit.FlocktrackerProject.SurveyProject.Survey.Chapters = submit.FlocktrackerProject.SurveyProject.Survey.Chapters.map(function (chapter) {
      delete chapter.Chapter.newQuestion;
      return chapter;
    });
    ['StartSurvey', 'EndSurvey'].forEach(function (trackerPortion) {
      delete submit.FlocktrackerProject.TrackerProject[trackerPortion].Survey.newChapter;
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
    LP: { verbose: 'Loop',            other: false, answers: false },
  };
  var answerBase = {JumpID: null, Text: '', Value: ''};
  var questionBase = { ID: '', Text: '', Kind: '', JumpID: '', Other: null, Answers: [], newAnswer: angular.copy(answerBase) };
  var loopbase = angular.copy(questionBase);

  $scope.ref = function () {
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

  var getAllQuestions = function () {
    var proj = $scope.flockSON.FlocktrackerProject;
    var surveyChaps   = proj.SurveyProject.Survey.Chapters;
    var trackerChaps1 = proj.TrackerProject.StartSurvey.Survey.Chapters;
    var trackerChaps2 = proj.TrackerProject.EndSurvey.Survey.Chapters;
    return surveyChaps.concat(trackerChaps1).concat(trackerChaps1);
  };

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
  };

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
                var issue = angular.copy(answer);
                issue.question = question.Question.ID;
                allIds.answers.push(issue) 
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
          string.push(' Answer ' + answer.Answer.Text + ' in Question ' + answer.question);
        });
        alert('The JumpIDs need to be changed before this can be removed: ' + string);
        return false;
      } else { 
        return true;
      }
    } else { return false; }
  };

  $scope.questionReady = function (question) {
    return  $scope.vetQuesID(question.ID) && 
            question.Text.length > 0 && 
            question.Kind.length > 0 ? true : false;
  };

  $scope.cleanText = function (string) { 
    if (string) {
      while (!isNaN(Number(string[0])) || string[0] == ' ') {
        string = string.substr(1);
      }
      return string.split(' ').join('_').split('.').join(''); 
    } else {
      return string;
    }
  };

  $scope.addChapter = function () {
    var title = angular.copy($scope.ref().Survey.newChapter);
    $scope.ref().Survey.Chapters.push({ Chapter: { Questions: [], Title: title, newQuestion: angular.copy(questionBase)} });
    $scope.ref().Survey.newChapter = '';
  };

  $scope.removeChapter = function (chapter) {
    if (confirm('Are you sure you want to delete chapter?')) {
      var errors = 0;
      var chapToRem = $scope.ref().Survey.Chapters[chapter].Chapter.Questions;
      chapToRem.forEach(function (question) {
        question.Question.JumpID = null;
      });
      chapToRem.forEach(function (question) {
        var quesID = question.Question.ID;
        if (!$scope.checkJump(quesID)) {
          errors += 1;
        }
      });
      if (errors == 0) {
        $scope.ref().Survey.Chapters.splice(chapter,1);
      }
    }
  };

  $scope.addQuestion = function (chapter) {
    var newQuestion = $scope.ref().Survey.Chapters[chapter].Chapter.newQuestion;
    var ok = $scope.questionReady(newQuestion);
    newQuestion.JumpID = newQuestion.JumpID ? newQuestion.JumpID : null;
    if (ok) {
      $scope.ref().Survey.Chapters[chapter].Chapter.Questions.push({Question: newQuestion}); 
      $scope.ref().Survey.Chapters[chapter].Chapter.newQuestion = angular.copy(questionBase);
    }
  };

  $scope.addAnswer = function (chapter) {
    var newAnswer = $scope.ref().Survey.Chapters[chapter].Chapter.newQuestion.newAnswer;
    if (newAnswer.Text.length > 0) {
      newAnswer.Value = $scope.cleanText(newAnswer.Text);
      $scope.ref().Survey.Chapters[chapter].Chapter.newQuestion.Answers.push({Answer: newAnswer});
      $scope.ref().Survey.Chapters[chapter].Chapter.newQuestion.newAnswer = angular.copy(answerBase);
    }
  };

  $scope.removeQuestion = function (chapter, question, loopQuestion) {
    var quesID;
    if (loopQuestion !== undefined) {
      quesID = $scope.ref().Survey.Chapters[chapter].Chapter.Questions[question].Question.Questions[loopQuestion].Question.ID;
    } else {
      quesID = $scope.ref().Survey.Chapters[chapter].Chapter.Questions[question].Question.ID;
    }
    if ($scope.checkJump(quesID)) {
      if (loopQuestion !== undefined) {
        $scope.ref().Survey.Chapters[chapter].Chapter.Questions[question].Question.Questions.splice(loopQuestion, 1);
      } else {
        $scope.ref().Survey.Chapters[chapter].Chapter.Questions.splice(question, 1);
      }
    }
  };

});




