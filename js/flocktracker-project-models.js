var FT_pr = function() {
	// Part of the code for the models of the data
	// /"&)(!/=)"!/=)/"!?/((/&(&%"!(&/=")/)"!(??"!)"=)?/")!=/!&"/!&?#&*)
	var that = this;
	this.tracker = function() {
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
	}
	;
	this.project = function() {
		this.sProject = null;
		this.tProject = null;
		this.cProject = null;
		this.flocktrackerProjectVersion = null;
		this.getSurveyProject = function() {
			return this.surveyProject;
		}
		this.setSurveyProject = function(sProject) {
			this.sProject = sProject;
		}
		this.getTrackerProject = function() {
			return this.tProject;
		}
		this.setTrackerProject = function(tProject) {
			this.tProject = tProject;
		}
		this.getCountersProject = function() {
			return this.cProject;
		}
		this.setCountersProject = function(cProject) {
			this.cProject = cProject;
		}
		this.getFlocktrackerProjectVersion = function() {
			return this.flocktrackerProjectVersion;
		}
		this.setFlocktrackerProjectVersion = function(
				flocktrackerProjectVersion) {
			this.flocktrackerProjectVersion = flocktrackerProjectVersion;
		}

		this.deserializeJSON = function(projectJSONString) {
			projectObject = null;
			if (projectJSONString.constructor === {}.constructor) {
				projectObject = surveyProjectJSONString;
			} else {
				try {
					projectObject = JSON.parse(projectJSONString);
				} catch (e) {
					console
							.log("JSON not parsed correctly, Project is not correct JSON :-(");
				}
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
								this.sProject = (new that.surveyProject("SurveyProject"));
								this.sProject
										.deserializeJSON({
											"SurveyProject" : projectObjectContents["SurveyProject"]
										});
							} else {
								console.log("No SurveyProject in Project :-(");
							}
							if ("TrackerProject" in projectObjectContents) {
								this.tProject = (new that.trackerProject());
								this.tProject
										.deserializeJSON({
											"TrackerProject" : projectObjectContents["TrackerProject"]
										});
							} else {
								console
										.log("No TrackerProject in survey Project :-(");
							}
							if ("CountersProject" in projectObjectContents) {
								this.cProject = (new countersProject());
								this.cProject
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
						console
								.log("No FlocktrackerProjectVersion in Project :-(");
					}
				}
			}
		}
		this.serializeJSON = function() {
			var projectJSONObjectContents = {};
			if (this.flocktrackerProjectVersion == "0.1") {
				projectJSONObjectContents["FlocktrackerProjectVersion"] = this.flocktrackerProjectVersion;
				if (this.sProject != null) {
					projectJSONObjectContents["SurveyProject"] = this.sProject
							.serializeJSON();
				} else {
					surveyProjectJSONObjectContents["SurveyProject"] = null;
					console.log("SurveyProject is null :-(")
				}
				if (this.cProject != null) {
					projectJSONObjectContents["CountersProject"] = this.cProject
							.serializeJSON();
				} else {
					surveyProjectJSONObjectContents["CountersProject"] = null;
					console.log("CountersProject project is null :-(")
				}
				if (this.tProject != null) {
					projectJSONObjectContents["TrackerProject"] = this.tProject
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
	};
	this.surveyProject = function(projectName) {
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
			if (surveyProjectJSONString.constructor === {}.constructor) {
				surveyProjectObject = surveyProjectJSONString;
			} else {
				try {
					surveyProjectObject = JSON.parse(surveyProjectJSONString);
				} catch (e) {
					console
							.log("JSON not parsed correctly, SurveyProject is not correct JSON :-(");
				}
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
	this.countersProject = function() {
		this.counters = null;
		this.tableID = null;
		this.serializeJSON = function() {
			var countersProjectJSONObjectContents = {};
			countersProjectJSONObjectContents["TableID"] = this.tableID;
			if (this.counters != null) {
				var countersJSONObject = [];
				for ( var counter in this.counters) {
					countersJSONObject.push(counter.serializeJSON());
				}
				countersProjectJSONObjectContents["Counters"] = countersJSONObject;
			} else {
				countersProjectJSONObjectContents["Counters"] = null;
			}
			var countersProjectJSONObject = {};
			countersProjectJSONObject["CountersProject"] = countersProjectJSONObjectContents;
			return countersProjectJSONObject;
		}
		this.deserializeJSON = function(countersProjectJSONString) {
			var countersProjectObject = null;
			if (countersProjectJSONString.constructor === {}.constructor) {
				countersProjectObject = countersProjectJSONString;
			} else {
				try {
					countersProjectObject = JSON
							.parse(countersProjectJSONString);
				} catch (e) {
					console
							.log("JSON not parsed correctly, CountersProject is not correct JSON :-(");
				}
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
						console
								.log("No Counters in CountersSurveyProject object "
										+ this.projectName + " :-(");
					}
				}
			}
		}
	}
	this.trackerProject = function() {
		this.startSurveyProject = null;
		this.endSurveyProject = null;
		this.tr = null;

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
			if (this.tr != null) {
				trackerProjectJSONObjectContents["Tracker"] = this.tr
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
			if (tracekrProjectJSONString.constructor === {}.constructor) {
				trackerProjectObject = tracekrProjectJSONString;
			} else {
				try {
					trackerProjectObject = JSON.parse(tracekrProjectJSONString);
				} catch (e) {
					console
							.log("JSON not parsed correctly, TrackerProject is not correct JSON :-(");
				}
			}
			if (trackerProjectObject != null) {
				var trackerProjectObjectContents = null;
				if ("TrackerProject" in trackerProjectObject) {
					trackerProjectObjectContents = trackerProjectObject["TrackerProject"];
				} else {
					console.log("No TrackerProject in Object :-(");
				}
				if (trackerProjectObjectContents != null) {
					if ("StartSurvey" in trackerProjectObjectContents) {
						this.startSurveyProject = (new that.surveyProject(
								"StartSurvey"));
						this.startSurveyProject
								.deserializeJSON({
									"StartSurvey" : trackerProjectObjectContents["StartSurvey"]
								});
					} else {
						console.log("No StartSurvey in TrackerProject object "
								+ this.projectName + " :-(");
					}
					if ("EndSurvey" in trackerProjectObjectContents) {
						this.endSurveyProject = (new that.surveyProject("EndSurvey"));
						this.endSurveyProject
								.deserializeJSON({
									"EndSurvey" : trackerProjectObjectContents["EndSurvey"]
								});
					} else {
						console.log("No EndSurvey in TrackerProject object "
								+ this.projectName + " :-(");
					}
					if ("Tracker" in trackerProjectObjectContents) {
						this.tr = (new that.tracker());
						this.tr.deserializeJSON({
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
}