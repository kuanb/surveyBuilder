var FT_pr = function() {
	var that = this;
	this.fSON = new FlockSON();
	this.tracker = function() {
		this.tableID = null; // String
		this.getfusionTableID = function() {
			return this.tableID;
		};
		this.setfusionTableID = function(fusionTableID) {
			this.tableID = fusionTableID;
		};
		this.deserializeJSON = function(trackerObjorString){
			var trackerObject = that.fSON.getJSON(trackerObjorString);
			if(trackerObject != null){
				var trackerObjectContents = null;
				if ("Tracker" in trackerObject) {
					trackerObjectContents = trackerObject["Tracker"];
				} else{
					console.log("No Tracker in Tracker Object :-(")
				}
				if(trackerObjectContents != null){
					if ("TableID" in trackerObjectContents) {
						this.tableID = trackerObjectContents["TableID"];
					} else {
						console.log("No TableID in Tracker object :-(");
					}
				}
			} else {
				console
				.log("JSON not parsed correctly, Tracker is not correct JSON :-(");
			}
		};
		this.serializeJSON = function(){
			var trackerJSONObjectContents = {};
			if (this.tableID != null) {
				trackerJSONObjectContents["TableID"] = this.tableID;
			} else {
				trackerJSONObjectContents["TableID"] = null;
			}
			var trackerJSONObject = {};
			trackerJSONObject["Tracker"] = trackerJSONObjectContents;
			return trackerJSONObject;
		};
	}
	;
	this.project = function() {
		this.sProject = null;
		this.tProject = null;
		this.cProject = null;
		this.flocktrackerProjectVersion = null;
		this.getSurveyProject = function() {
			return this.sProject;
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

		this.deserializeJSON = function(projectObjorString) {
			var projectObject = that.fSON.getJSON(projectObjorString);
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
							if ("SurveyProject" in projectObjectContents && (projectObjectContents["SurveyProject"] != null)) {
								this.sProject = (new that.surveyProject("SurveyProject"));
								this.sProject
										.deserializeJSON({
											"SurveyProject" : projectObjectContents["SurveyProject"]
										});
							} else {
								console.log("No SurveyProject in Project :-(");
							}
							if ("TrackerProject" in projectObjectContents && (projectObjectContents["TrackerProject"] != null)) {
								this.tProject = (new that.trackerProject());
								this.tProject
										.deserializeJSON({
											"TrackerProject" : projectObjectContents["TrackerProject"]
										});
							} else {
								console
										.log("No TrackerProject in survey Project :-(");
							}
							if ("CountersProject" in projectObjectContents && (projectObjectContents["CountersProject"] != null)) {
								this.cProject = (new that.countersProject());
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
			} else {
				console
				.log("JSON not parsed correctly, Project is not correct JSON :-(");
			}
		}
		this.serializeJSON = function() {
			var projectJSONObjectContents = {};
			if (this.flocktrackerProjectVersion == "0.1") {
				projectJSONObjectContents["FlocktrackerProjectVersion"] = this.flocktrackerProjectVersion;
				if (this.sProject != null) {
					projectJSONObjectContents["SurveyProject"] = this.sProject
							.serializeJSON()["SurveyProject"];
				} else {
					projectJSONObjectContents["SurveyProject"] = null;
					console.log("SurveyProject is null :-(")
				}
				if (this.cProject != null) {
					projectJSONObjectContents["CountersProject"] = this.cProject
							.serializeJSON()["CountersProject"];
				} else {
					projectJSONObjectContents["CountersProject"] = null;
					console.log("CountersProject project is null :-(")
				}
				if (this.tProject != null) {
					projectJSONObjectContents["TrackerProject"] = this.tProject
							.serializeJSON()["TrackerProject"];
				} else {
					projectJSONObjectContents["TrackerProject"] = null;
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
		this.getTableID = function(){
			return this.tableID;
		}
		this.setTableID = function(tableID){
			this.tableID = tableID;
		}
		this.setProjectName = function(projectName) {
			this.projectName = projectName;
		}
		this.getProjectName = function() {
			return this.projectName;
		}
		this.setSurvey = function(survey) {
			this.survey = survey;
		}
		this.getSurvey = function(){
			return this.survey;
		}
		this.deserializeJSON = function(surveyProjectObjorString) {
			var surveyProjectObject = that.fSON.getJSON(surveyProjectObjorString);
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
						this.survey = (new that.fSON.survey());
						this.survey.deserializeJSON({
							"Survey" : surveyProjectObjectContents["Survey"]
						});
					} else {
						console.log("No Survey in SurveyProject object "
								+ this.projectName + " :-(");
					}
				}
			} else {
				console
				.log("JSON not parsed correctly, SurveyProject is not correct JSON :-(");
			}
		}
		this.serializeJSON = function() {
			var surveyProjectJSONObjectContents = {};
			surveyProjectJSONObjectContents["TableID"] = this.tableID;
			if (this.survey != null) {
				surveyProjectJSONObjectContents["Survey"] = this.survey
						.serializeJSON()["Survey"];
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
				for ( var counterIndex in this.counters) {
					countersJSONObject.push(this.counters[counterIndex].serializeJSON());
				}
				countersProjectJSONObjectContents["Counters"] = countersJSONObject;
			} else {
				countersProjectJSONObjectContents["Counters"] = null;
			}
			var countersProjectJSONObject = {};
			countersProjectJSONObject["CountersProject"] = countersProjectJSONObjectContents;
			return countersProjectJSONObject;
		}
		this.deserializeJSON = function(countersProjectObjorString) {
			var countersProjectObject = that.fSON.getJSON(countersProjectObjorString);
			if (countersProjectObject != null) {
				var countersProjectObjectContents = null;
				if ("CountersProject" in countersProjectObject) {
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
							for ( var counterIndex in countersArray) {
								var counterObj = new that.counter();
								counterObj.deserializeJSON(countersArray[counterIndex])
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
			} else {
				console
				.log("JSON not parsed correctly, CountersProject is not correct JSON :-(");
			}
		}
	}
	this.trackerProject = function() {
		this.startSurveyProject = null;
		this.endSurveyProject = null;
		this.tr = null;
		this.setStartSurvey = function(startSurvey){
			this.startSurveyProject = startSurvey;
		}
		this.getStartSurvey = function(){
			return this.startSurveyProject
		}
		this.setEndSurvey = function(endSurvey){
			this.endSurveyProject = endSurvey;
		}
		this.getEndSurvey = function(){
			return this.endSurveyProject
		}
		this.serializeJSON = function() {
			var trackerProjectJSONObjectContents = {};
			if (this.startSurveyProject != null) {
				trackerProjectJSONObjectContents["StartSurvey"] = this.startSurveyProject
						.serializeJSON()["StartSurvey"];
			} else {
				trackerProjectJSONObjectContents["StartSurvey"] = null;
			}
			if (this.endSurveyProject != null) {
				trackerProjectJSONObjectContents["EndSurvey"] = this.endSurveyProject
						.serializeJSON()["EndSurvey"];
			} else {
				trackerProjectJSONObjectContents["EndSurvey"] = null;
			}
			if (this.tr != null) {
				trackerProjectJSONObjectContents["Tracker"] = this.tr
						.serializeJSON()["Tracker"];
			} else {
				trackerProjectJSONObjectContents["Tracker"] = null;
			}
			var trackerProjectJSONObject = {};
			trackerProjectJSONObject["TrackerProject"] = trackerProjectJSONObjectContents;
			return trackerProjectJSONObject;
		}
		this.deserializeJSON = function(trackerProjectObjorString) {
			var trackerProjectObject = that.fSON.getJSON(trackerProjectObjorString);
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
			} else {
				console
				.log("JSON not parsed correctly, TrackerProject is not correct JSON :-(");
			}
		}
	}
	this.counter = function(){
		this.name = null;
		this.id = null;
		this.deserializeJSON = function(counterObjorString){
			var counterObject = that.fSON.getJSON(counterObjorString);
			if(counterObject != null){
				var counterObjectContents = null;
				if ("Counter" in counterObject) {
					counterObjectContents = counterObject["Counter"];
				} else{
					console.log("No Counter in Counter Object :-(")
				}
				if(counterObjectContents != null){
					if ("Name" in counterObjectContents) {
						this.name = counterObjectContents["Name"];
					} else {
						console.log("No Name in Tracker object :-(");
					}
					if ("ID" in counterObjectContents) {
						this.id = counterObjectContents["ID"];
					} else {
						console.log("No ID in Counter object :-(");
					}
				}
			} else {
				console
				.log("JSON not parsed correctly, Counter is not correct JSON :-(");
			}
		};
		this.serializeJSON = function(){
			var counterJSONObjectContents = {};
			if (this.name != null) {
				counterJSONObjectContents["Name"] = this.name;
			} else {
				counterJSONObjectContents["Name"] = null;
			}
			if (this.id != null) {
				counterJSONObjectContents["ID"] = this.id;
			} else {
				counterJSONObjectContents["ID"] = null;
			}
			var counterJSONObject = {};
			counterJSONObject["Counter"] = counterJSONObjectContents;
			return counterJSONObject;
		};
	}
}