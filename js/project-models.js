// Part of the code for the models of the data
///"&)(!/=)"!/=)/"!?/((/&(&%"!(&/=")/)"!(??"!)"=)?/")!=/!&"/!&?#&*)
function tracker() {
	this.questions = []; // Instances of questions
	this.fusionTableID = null; // String
	this.getfusionTableID = function() {
		return this.fusionTableID;
	};
	this.setfusionTableID = function(fusionTableID) {
		this.fusionTableID = fusionTableID;
	};
	this.getQuestions = function() {
		return this.questions;
	};
	this.setQuestions = function(questions) {
		this.questions = questions;
	};
	this.generateJSON = function() {
		var trackerJSON = {};
		var questionsJSONArray = [];
		for (var i = 0; i < this.questions.length; i++) {
			questionsJSONArray.push(this.questions[i].generateJSON());
		}
		trackerJSON["Questions"] = questionsJSONArray;
		trackerJSON["TableID"] = this.fusionTableID;
		return trackerJSON;
	}
	this.constructFromJSON = function(object) {
		if ("Questions" in object) {
			var objectQuestions = object["Questions"];
			if (Array.isArray(objectQuestions)) {
				this.questions = [];
				for (var i = 0; i < objectQuestions.length; i++) {
					this.questions.push(new question(false));
					this.questions[i].constructFromJSON(objectQuestions[i]);
				}
			} else {
				console.log("Questions in tracker is not an Array :-(");
			}
		} else {
			console.log("No questions in tracker object :-(");
		}
		if ("TableID" in object) {
			this.fusionTableID = object["TableID"];
		} else {
			console.log("No fusionTableID in tracker object :-(");
		}
	}
};
function project() {
	this.survey = null;
	this.tracker = null;
	this.getSurvey = function() {
		return this.survey;
	}
	this.setSurvey = function(survey) {
		this.survey = survey;
	}
	this.getTracker = function() {
		return this.tracker;
	}
	this.setTracker = function(tracker) {
		this.tracker = tracker;
	}
	this.generateJSON = function() {
		var projectJSON = {};
		projectJSON["Survey"] = this.survey.generateJSON();
		projectJSON["Tracker"] = this.tracker.generateJSON();
		return projectJSON;
	}
	this.constructFromString = function(JSONprojectString) {
		var projectObject = null;
		try {
			var projectObject = JSON.parse(JSONprojectString);
		} catch (e) {
			alert("JSON not parsed correctly, the input is not correct JSON :-(");
		}
		if (!(projectObject == null)) {
			if ("Survey" in projectObject) {
				this.survey = (new survey());
				this.survey.constructFromJSON(projectObject["Survey"]);
			} else {
				console.log("No survey in project object :-(");
			}
			if ("Tracker" in projectObject) {
				this.tracker = (new tracker());
				this.tracker.constructFromJSON(projectObject["Tracker"]);
			} else {
				console.log("No tracker in project object :-(");
			}
		}
	}
	this.serializeJSON = function(projectJSONString) {
		projectObject = null;
		try {
			var projectObject = JSON.parse(projectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, Project is not correct JSON :-(");
		}
		projectObjectContents = null;
		if ("FlocktrackerProject" in projectObject) {
			projectObjectContents = projectObject["FlocktrackerProject"];
		} else {
			console.log("No FlocktrackerProject in Object :-(");
		}
		if(projectObjectContents != null){
			if ("SurveyProject" in surveyProjectObjectContents) {
				this.surveyProject = (new surveyProject());
				this.surveyProject
						.serializeJSON(projectObjectContents["SurveyProject"]);
			} else {
				console.log("No SurveyProject in Project :-(");
			}
			if ("TrackerProject" in projectObjectContents) {
				this.trackerProject = (new trackerProject());
				this.trackerProject
						.serializeJSON(projectObjectContents["TrackerProject"]);
			} else {
				console.log("No TrackerProject in survey Project :-(");
			}
			if ("CountersProject" in projectObjectContents) {
				this.countersProject = (new countersProject());
				this.countersProject
						.serializeJSON(projectObjectContents["CountersProject"]);
			} else {
				console.log("No CountersProject in survey Project :-(");
			}
			
		}
	}
	this.deserializeJSON = function() {
		var projectJSONObjectContents = {};
		if (this.surveyProject != null) {
			projectJSONObjectContents["SurveyProject"] = this.surveyProject
					.deserializeJSON();
		} else {
			surveyProjectJSONObjectContents["SurveyProject"] = null;
			console.log("SurveyProject is null :-(")
		}
		if (this.countersProject != null) {
			projectJSONObjectContents["CountersProject"] = this.countersProject
					.deserializeJSON();
		} else {
			surveyProjectJSONObjectContents["CountersProject"] = null;
			console.log("CountersProject project is null :-(")
		}
		if (this.trackerProject != null) {
			projectJSONObjectContents["TrackerProject"] = this.trackerProject
					.deserializeJSON();
		} else {
			surveyProjectJSONObjectContents["TrackerProject"] = null;
			console.log("TrackerProject project is null :-(");
		}
		var projectJSONObject = {};
		projectJSONObject["FlocktrackerProject"] = projectJSONObjectContents;
		return projectJSONObject;
	}
}
function surveyProject(projectName) {
	this.projectName = projectName;
	this.tableID = null;
	this.survey = null;
	this.setProjectName = function(projectName) {
		this.projectName = projectName;
	}
	this.getProjectName = function() {
		return this.projectName;
	}
	this.setSurvey = function(survey) {
		this.survey = survey;
	}
	this.serializeJSON = function(surveyProjectJSONString) {
		surveyProjectObject = null;
		try {
			var surveyProjectObject = JSON.parse(surveyProjectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, SurveyProject is not correct JSON :-(");
		}
		surveyProjectObjectContents = null;
		if (this.projectName != null) {
			if (this.projectName in surveyProjectObject) {
				surveyProjectObjectContents = surveyProjectObject[projectName];
			} else {
				console.log("No SurveyProject " + this.projectName
						+ " in Object :-(");
			}
		} else {
			console.log("ProjectName of SurveyProject is null :-(");
		}
		if (surveyProjectObjectContents != null) {
			if ("TableID" in surveyProjectObjectContents) {
				this.tableID = surveyProjectObjectContents["TableID"];
			} else {
				console.log("No TableID in SurveyProject object "
						+ this.projectName + " :-(");
			}
			if ("Survey" in surveyProjectObjectContents) {
				this.survey = (new survey());
				this.survey
						.serializeJSON(surveyProjectObjectContents["Survey"]);
			} else {
				console.log("No Survey in survey project object "
						+ this.projectName + " :-(");
			}
		}
	}
	this.deserializeJSON = function() {
		var surveyProjectJSONObjectContents = {};
		surveyProjectJSONObjectContents["TableID"] = this.tableID;
		if (this.survey != null) {
			surveyProjectJSONObjectContents["Survey"] = this.survey
					.deserializeJSON();
		} else {
			surveyProjectJSONObjectContents["Survey"] = null;
		}
		var surveyProjectJSONObject = {};
		surveyProjectJSONObject[this.projectName] = surveyProjectJSONObjectContents;
		return surveyProjectJSONObject;
	}
}