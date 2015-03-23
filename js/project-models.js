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
	this.surveyProject = null;
	this.trackerProject = null;
	this.countersProject = null;
	this.flocktrackerProjectVersion = null;
	this.getSurveyProject = function() {
		return this.surveyProject;
	}
	this.setSurveyProject = function(surveyProject) {
		this.surveyProject = surveyProject;
	}
	this.getTrackerProject = function() {
		return this.trackerProject;
	}
	this.setTrackerProject = function(trackerProject) {
		this.trackerProject = trackerProject;
	}
	this.getCountersProject = function() {
		return this.countersProject;
	}
	this.setCountersProject = function(countersProject) {
		this.countersProject = countersProject;
	}
	this.getFlocktrackerProjectVersion = function() {
		return this.flocktrackerProjectVersion;
	}
	this.setFlocktrackerProjectVersion = function(flocktrackerProjectVersion) {
		this.flocktrackerProjectVersion = flocktrackerProjectVersion;
	}

	this.deserializeJSON = function(projectJSONString) {
		projectObject = null;
		try {
			var projectObject = JSON.parse(projectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, Project is not correct JSON :-(");
		}
		if (projectObject != null) {
			var projectObjectContents = null;
			if ("FlocktrackerProject" in projectObject) {
				projectObjectContents = projectObject["FlocktrackerProject"];
			} else {
				console.log("No FlocktrackerProject in Object :-(");
			}
			if (projectObjectContents != null) {
				if ("FlocktrackerProjectVersion" in projectObjectContents) {
					if (projectObjectContents["FlocktrackerProjectVersion"] == "0.1") {
						this.flocktrackerProjectVersion = projectObjectContents["FlocktrackerProjectVersion"];
						if ("SurveyProject" in projectObjectContents) {
							this.surveyProject = (new surveyProject());
							this.surveyProject
									.deserializeJSON({
										"SurveyProject" : projectObjectContents["SurveyProject"]
									});
						} else {
							console.log("No SurveyProject in Project :-(");
						}
						if ("TrackerProject" in projectObjectContents) {
							this.trackerProject = (new trackerProject());
							this.trackerProject
									.deserializeJSON({
										"TrackerProject" : projectObjectContents["TrackerProject"]
									});
						} else {
							console
									.log("No TrackerProject in survey Project :-(");
						}
						if ("CountersProject" in projectObjectContents) {
							this.countersProject = (new countersProject());
							this.countersProject
									.deserializeJSON({
										"CountersProject" : projectObjectContents["CountersProject"]
									});
						} else {
							console
									.log("No CountersProject in survey Project :-(");
						}
					} else {
						console
								.log("Incorrect FlocktrackerProjectVersion in Project :-(")
					}
				} else {
					console.log("No FlocktrackerProjectVersion in Project :-(");
				}
			}
		}
	}
	this.serializeJSON = function() {
		var projectJSONObjectContents = {};
		if (this.flocktrackerProjectVersion == "0.1") {
			projectJSONObjectContents["FlocktrackerProjectVersion"] = this.flocktrackerProjectVersion;
			if (this.surveyProject != null) {
				projectJSONObjectContents["SurveyProject"] = this.surveyProject
						.serializeJSON();
			} else {
				surveyProjectJSONObjectContents["SurveyProject"] = null;
				console.log("SurveyProject is null :-(")
			}
			if (this.countersProject != null) {
				projectJSONObjectContents["CountersProject"] = this.countersProject
						.serializeJSON();
			} else {
				surveyProjectJSONObjectContents["CountersProject"] = null;
				console.log("CountersProject project is null :-(")
			}
			if (this.trackerProject != null) {
				projectJSONObjectContents["TrackerProject"] = this.trackerProject
						.serializeJSON();
			} else {
				surveyProjectJSONObjectContents["TrackerProject"] = null;
				console.log("TrackerProject project is null :-(");
			}
		} else {
			console.log("Incorrect FlocktrackerProjectVersion :-(");
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
	this.deserializeJSON = function(surveyProjectJSONString) {
		var surveyProjectObject = null;
		try {
			surveyProjectObject = JSON.parse(surveyProjectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, SurveyProject is not correct JSON :-(");
		}
		if (surveyProjectObject != null) {
			var surveyProjectObjectContents = null;
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
					this.survey.deserializeJSON({
						"Survey" : surveyProjectObjectContents["Survey"]
					});
				} else {
					console.log("No Survey in SurveyProject object "
							+ this.projectName + " :-(");
				}
			}
		}
	}
	this.serializeJSON = function() {
		var surveyProjectJSONObjectContents = {};
		surveyProjectJSONObjectContents["TableID"] = this.tableID;
		if (this.survey != null) {
			surveyProjectJSONObjectContents["Survey"] = this.survey
					.serializeJSON();
		} else {
			surveyProjectJSONObjectContents["Survey"] = null;
		}
		var surveyProjectJSONObject = {};
		surveyProjectJSONObject[this.projectName] = surveyProjectJSONObjectContents;
		return surveyProjectJSONObject;
	}
}
function countersProject() {
	this.counters = null;
	this.tableID = null;
	this.serializeJSON = function() {
		var countersProjectJSONObjectContents = {};
		countersProjectJSONObjectContents["TableID"] = this.tableID;
		if (this.counters != null) {
			var countersJSONObject = [];
			for ( var counter in counters) {
				countersJSONObject.push(counter.serializeJSON());
			}
			countersProjectJSONObjectContents["Counters"] = this.survey
					.serializeJSON();
		} else {
			countersProjectJSONObjectContents["Counters"] = null;
		}
		var countersProjectJSONObject = {};
		countersProjectJSONObject["CountersProject"] = countersProjectJSONObjectContents;
		return countersProjectJSONObject;
	}
	this.deserializeJSON = function(countersProjectJSONString) {
		var countersProjectObject = null;
		try {
			countersProjectObject = JSON.parse(countersProjectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, CountersProject is not correct JSON :-(");
		}
		if (countersProjectObject != null) {
			var countersProjectObjectContents = null;
			if (this.projectName in countersProjectObject) {
				countersProjectObjectContents = countersProjectObject["CountersProject"];
			} else {
				console.log("No CountersProject in Object :-(");
			}
			if (countersProjectObjectContents != null) {
				if ("TableID" in countersProjectObjectContents) {
					this.tableID = countersProjectObjectContents["TableID"];
				} else {
					console.log("No TableID in CountersProject object :-(");
				}
				if ("Counters" in countersProjectObjectContents) {
					var countersArray = countersProjectObjectContents["Counters"];
					if (countersArray.constructor === Array) {
						this.counters = [];
						for ( var counterJSONObject in countersArray) {
							var counterObj = new counter();
							counterObj.derializeJSON(counterJSONObject)
							this.counters.push(counterObj);
						}
					} else {
						console
								.log("Counters in CountersProject is not a JSONArray :-(")
					}
				} else {
					console.log("No Counters in CountersSurveyProject object "
							+ this.projectName + " :-(");
				}
			}
		}
	}
}
function trackerProject() {
	this.startSurveyProject = null;
	this.endSurveyProject = null;
	this.tracker = null;

	this.serializeJSON = function() {
		var trackerProjectJSONObjectContents = {};
		if (this.startSurveyProject != null) {
			trackerProjectJSONObjectContents["StartSurvey"] = this.startSurveyProject
					.serializeJSON();
		} else {
			trackerProjectJSONObjectContents["StartSurvey"] = null;
		}
		if (this.endSurveyProject != null) {
			trackerProjectJSONObjectContents["EndSurvey"] = this.endSurveyProject
					.serializeJSON();
		} else {
			trackerProjectJSONObjectContents["EndSurvey"] = null;
		}
		if (this.tracker != null) {
			trackerProjectJSONObjectContents["Tracker"] = this.tracker
					.serializeJSON();
		} else {
			trackerProjectJSONObjectContents["Tracker"] = null;
		}
		var trackerProjectJSONObject = {};
		trackerProjectJSONObject["TrackerProject"] = trackerProjectJSONObjectContents;
		return trackerProjectJSONObject;
	}
	this.deserializeJSON = function(tracekrProjectJSONString) {
		var trackerProjectObject = null;
		try {
			trackerProjectObject = JSON.parse(tracekrProjectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, TrackerProject is not correct JSON :-(");
		}
		if (trackerProjectObject != null) {
			trackerProjectObjectContents = null;
			if ("TrackerProject" in trackerProjectObject) {
				trackerProjectObjectContents = trackerProjectObject["TrackerProject"];
			} else {
				console.log("No TrackerProject in Object :-(");
			}
			if (trackerProjectObjectContents != null) {
				if ("StartSurvey" in trackerProjectObjectContents) {
					this.startSurveyProject = (new surveyProject("StartSurvey"));
					this.startSurveyProject
							.deserializeJSON({
								"StartSurvey" : trackerProjectObjectContents["StartSurvey"]
							});
				} else {
					console.log("No StartSurvey in TrackerProject object "
							+ this.projectName + " :-(");
				}
				if ("EndSurvey" in trackerProjectObjectContents) {
					this.endSurveyProject = (new surveyProject("EndSurvey"));
					this.endSurveyProject.deserializeJSON({
						"EndSurvey" : trackerProjectObjectContents["EndSurvey"]
					});
				} else {
					console.log("No EndSurvey in TrackerProject object "
							+ this.projectName + " :-(");
				}
				if ("Tracker" in trackerProjectObjectContents) {
					this.tracker = (new Tracker("Tracker"));
					this.tracker.deserializeJSON({
						"Tracker" : trackerProjectObjectContents["Tracker"]
					});
				} else {
					console.log("No Tracker in TrackerProject object "
							+ this.projectName + " :-(");
				}
			}
		}
	}
}