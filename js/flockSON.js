function answer() {
	this.answerText = null; // String
	this.jumpID = null; // String
	this.getAnswerText = function() {
		return this.answerText;
	};
	this.setAnswerText = function(answerText) {
		this.answerText = answerText;
	};
	this.getJumpID = function() {
		return this.jumpID;
	};
	this.setjumpID = function(jumpID) {
		this.jumpID = jumpID;
	};
	this.generateJSON = function() {
		var answerJSON = {};
		var answerJSONcontents = {};
		if (this.answerText != null) {
			answerJSONcontents["Text"] = this.answerText;
		}
		if (this.jumpID != null) {
			answerJSONcontents["Jump"] = this.jumpID;
		}
		answerJSON["Answer"] = answerJSONcontents;
		return answerJSON;
	}
	this.constructFromJSON = function(object) {
		if ("Answer" in object) {
			this.answerText = object["Answer"];
		} else {
			console.log("No answer text in answer object :-(");
		}
		if ("Jump" in object) {
			this.jumpID = object["Jump"];
		} else {

		}
	}
};

function question(inLoop) {
	this.inLoop = inLoop; // Boolean to know if inside loop
	this.kind = null;
	this.loopQuestions = []; // Question instances inside this question.
	this.questionText = null; // String
	this.answers = []; // Answer instances
	this.questionID = null; // String
	this.otherEnabled = null; // Boolean
	this.jumpID = null; // String

	this.getKind = function() {
		return this.kind;
	};
	this.setKind = function(kind) {
		this.kind = kind;
	};
	this.getQuestionText = function() {
		return this.questionText;
	};
	this.setQuestionText = function(questionText) {
		this.questionText = questionText;
	};
	this.getAnswers = function() {
		return this.answers;
	};
	this.setAnswers = function(answers) {
		this.answers = answers;
	};
	this.getJumpID = function() {
		return this.jumpID;
	};
	this.setjumpID = function(jumpID) {
		this.jumpID = jumpID;
	};
	this.getQuestionID = function() {
		return this.questionID;
	};
	this.setQuestionID = function(questionID) {
		this.questionID = questionID;
	};
	this.isOtherEnabled = function() {
		return this.otherEnabled;
	};
	this.setOtherEnabled = function(otherEnabled) {
		this.otherEnabled = otherEnabled;
	};
	this.getLoopQuestions = function() {
		return this.loopQuestions;
	};
	this.setLoopQuestions = function(loopQuestions) {
		this.loopQuestions = loopQuestions;
	};

	this.serializeJSON = function() {
		var questionJSONObjectContents = {};
		if (this.kind != null) {
			questionJSONObjectContents["Kind"] = this.kind;
		} else {
			console.log("Kind in Question is null");
		}
		if (this.questionText != null) {
			questionJSONObjectContents["Text"] = this.questionText;
		} else {
			console.log("Text in Question is null");
		}
		if (this.jumpID != null) {
			questionJSONObjectContents["JumpID"] = this.jumpID;
		} else {
			console.log("JumpID in Question is null");
		}
		if (this.otherEnabled != null) {
			questionJSONObjectContents["Other"] = this.otherEnabled;
		} else {
			console.log("Other in Question is null");
		}
		if (((this.kind === qK.MULTIPLE_CHOICE.jsonName) || (this.kind === qK.CHECKBOX.jsonName))
				|| (this.kind === qK.ORDERED.jsonName)) {
			if ((this.answers !== null) && (this.answers.length > 0)) {
				var length = this.answers.length;
				var answersArray = [];
				for (var i = 0; i < length; i++) {
					answersArray.push(this.answers[i].generateJSON());
				}
				;
				questionJSONObjectContents["Answers"] = answersArray;
			} else {
				console
						.log("No Ansers or empty Answers Array in MC, CB or OL quesiton :-(");
			}
		}
		if ((this.kind === qK.LOOP.jsonName) && (this.inLoop == false)) {
			if ((this.questions !== null) && (this.questions.length > 0)) {
				var length = this.questions.length;
				var questionsArray = [];
				for (var i = 0; i < length; i++) {
					questionsArray.push(this.questions[i].generateJSON());
				}
				;
				questionJSONObjectContents["Questions"] = questionsArray;
			} else {
				console
						.log("No Questions or empty Questions Array in LP quesiton :-(");
			}
		}
		var questionJSONObject = {};
		questionJSONObject["Question"] = questionJSONObjectContents;
		return questionJSONObject;
	}
	this.deserializeJSON = function(questionJSONString) {
		var questionObject = null;
		try {
			questionObject = JSON.parse(tracekrProjectJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, Question is not correct JSON :-(");
		}
		if (questionObject != null) {
			var questionObjectContents = null;
			if ("Question" in questionObject) {
				questionObjectContents = questionObject["Question"];
			} else {
				console.log("No Question in Object :-(");
			}
			if (questionObjectContents != null) {
				if ("Kind" in questionObjectContents) {
					var tempKind = questionObjectContents["Kind"];
					var qK = new questionKind(this.inloop);
					var JSONNames = qK.getJsonNames();
					var validQuestionKind = false;
					for (i = 0; i < JSONNames.length; i++) {
						if (JSONNames[i] === tempKind) {
							this.kind = tempKind;
							validQuestionKind = true;
						}
					}
					if (!validQuestionKind) {
						console
								.log("Kind in Question object is not a valid value :-(");
					}
				} else {
					console.log("No Kind in Question :-(");
				}
				if ("Text" in questionObjectContents) {
					this.questionText = questionObjectContents["Text"];
				} else {
					console.log("No Text in Question :-(");
				}
				if ("ID" in questionObjectContents) {
					this.questionID = questionObjectContents["ID"];
				} else {
					console.log("No ID in Question :-(");
				}
				if ("JumpID" in questionObjectContents) {
					this.jumpID = questionObjectContents["JumpID"];
				} else {
					this.jumpID = false;
					console.log("No JumpID in Question :-(");
				}
				if ((this.kind === qK.MULTIPLE_CHOICE.jsonName)
						|| (this.kind === qK.CHECKBOX.jsonName)) {
					if ("Other" in object) {
						this.otherEnabled = object["Other"];
					} else {
						this.otherEnabled = false;
					}
				}
				if (((this.kind === qK.MULTIPLE_CHOICE.jsonName) || (this.kind === qK.CHECKBOX.jsonName))
						|| (this.kind === qK.ORDERED.jsonName)) {
					if ("Answers" in object) {
						var objectAnswers = object["Answers"];
						if (Array.isArray(objectAnswers)) {
							this.answers = [];
							for (var i = 0; i < objectAnswers.length; i++) {
								this.answers.push(new answer());
								this.answers[i]
										.deserializeJSON(objectAnswers[i]);
							}
						} else {
							console
									.log("Answers in Question is not an Array :-(");
						}
					} else {
						console.log("No Answers in Question object :-(");
					}
				}
				if ((this.kind === qK.LOOP.jsonName) && (this.inLoop == false)) {
					if ("Questions" in object) {
						var objectQuestions = object["Questions"];
						if (Array.isArray(objectQuestions)) {
							this.loopQuestions = [];
							for (var i = 0; i < objectQuestions.length; i++) {
								this.loopQuestions.push(new question(true));
								this.loopQuestions[i]
										.deserializeJSON(objectQuestions[i]);
							}
						} else {
							console
									.log("Questions in LP Question is not an Array :-(");
						}
					} else {
						console.log("No Questions in LP Question object :-(");
					}
				}
			}
		}
	}
};
function questionKind(inLoop) {
	// Object to list the question kinds possible to add to a question array
	this.inLoop = inLoop;
	this.MULTIPLE_CHOICE = {
		jsonName : "MC",
		name : "Multiple choice"
	};
	this.OPEN_NUMBER = {
		jsonName : "ON",
		name : "Open number"
	};
	this.OPEN_TEXT = {
		jsonName : "OT",
		name : "Open text"
	};
	this.IMAGE = {
		jsonName : "IM",
		name : "Picture"
	};
	this.CHECKBOX = {
		jsonName : "CB",
		name : "Checkbox"
	};
	this.ORDERED = {
		jsonName : "OL",
		name : "Ordered list"
	};
	this.LOOP = {
		jsonName : "LP",
		name : "Loop"
	};
	this.getJsonNames = function() {
		var jsonNames = [];
		jsonNames.push(this.OPEN_TEXT["jsonName"]);
		jsonNames.push(this.OPEN_NUMBER["jsonName"]);
		jsonNames.push(this.MULTIPLE_CHOICE["jsonName"]);
		jsonNames.push(this.CHECKBOX["jsonName"]);
		jsonNames.push(this.ORDERED["jsonName"]);
		jsonNames.push(this.IMAGE["jsonName"]);
		if (!this.inLoop) {
			jsonNames.push(this.LOOP["jsonName"]);
		}
		;
		return jsonNames;
	};
	this.getNames = function() {
		var names = [];
		names.push(this.OPEN_TEXT["name"]);
		names.push(this.OPEN_NUMBER["name"]);
		names.push(this.MULTIPLE_CHOICE["name"]);
		names.push(this.CHECKBOX["name"]);
		names.push(this.ORDERED["name"]);
		names.push(this.IMAGE["name"]);
		if (!this.inLoop) {
			names.push(this.LOOP["name"]);
		}
		return names;
	};
};
function chapter() {
	this.title = null; // String
	this.questions = []; // Array of question objects
	this.getTitle = function() {
		return this.title;
	};
	this.setTitle = function(title) {
		this.title = title;
	};
	this.getQuestions = function() {
		return this.questions;
	};
	this.setQuestions = function(questions) {
		this.questions = questions;
	};
	this.addQuestion = function(newQuestion) {
		this.questions.push(newQuestion);
	};
	this.getQuestionCount = function() {
		if (this.questions == null) {
			return 0
		} else {
			return this.questions.length;
		}
	};
	this.serializeJSON = function() {
		var chapterJSONObjectContents = {};
		chapterJSONObjectContents["Title"] = this.title;
		if (this.questions != null) {
			var questionsJSONObject = [];
			for ( var question in this.questions) {
				questionsJSONObject.push(question.serializeJSON());
			}
			chapterJSONObjectContents["Questions"] = questionsJSONObject;
		} else {
			chapterJSONObjectContents["Questions"] = null;
		}
		var chapterJSONObject = {};
		chapterJSONObject["Chapter"] = chapterJSONObjectContents;
		return chapterJSONObject;
	}
	this.deserializeJSON = function(chapterJSONString) {
		var chapterObject = null;
		try {
			chapterObject = JSON.parse(chapterJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, Chapter is not correct JSON :-(");
		}
		if (chapterObject != null) {
			var chapterObjectContents = null;
			if ("Chapter" in chapterObject) {
				chapterObjectContents = chapterObject["Chapter"];
			} else {
				console.log("No Chapter in Object :-(");
			}
			if (chapterObjectContents != null) {
				if ("Title" in chapterObjectContents) {
					this.title = chapterObjectContents["Title"];
				} else {
					console.log("No Title in Chapter object :-(");
				}
				if ("Questions" in chapterObjectContents) {
					var questionsArray = chapterObjectContents["Questions"];
					if (questionsArray.constructor === Array) {
						this.questions = [];
						for ( var questionJSONObject in questionsArray) {
							var questionObj = new question();
							questionObj.derializeJSON(questionJSONObject)
							this.questions.push(questionObj);
						}
					} else {
						console
								.log("Questions in Chapter is not a JSONArray :-(")
					}
				} else {
					console.log("No Questions in Chapter object :-(");
				}
			}
		}
	}
};
function survey() {
	this.chapters = []; // Instances of chapters
	this.flockSONversion = null; // String
	this.title = null; // String

	this.getTitle = function() {
		return this.title;
	}
	this.setTitle = function(title) {
		this.title = title;
	}
	this.getFlockSONversion = function() {
		return this.flockSONversion;
	}
	this.setFlockSONversion = function(flockSONversion) {
		this.flockSONversion = flockSONversion;
	}
	this.getChapters = function() {
		return this.chapters;
	}
	this.setChapters = function(chapters) {
		this.chapters = chapters;
	}
	this.addChapter = function(newChapter) {
		this.chapters.push(newChapter);
	}
	this.getChapterCount = function() {
		if (this.chapters == null) {
			return 0
		} else {
			return chapters.length;
		}
	}

	this.serializeJSON = fucntion()
	{
		var surveyJSONObjectContents = {};
		if (this.flockSONversion == "0.1") {
			surveyJSONObjectContents["flockSONversion"] = this.flockSONversion;
			surveyJSONObjectContents["Title"] = this.title;
			if (this.chapters != null) {
				var chaptersJSONObject = [];
				for ( var chapter in this.chapters) {
					chaptersJSONObject.push(chapter.serializeJSON());
				}
				surveyJSONObjectContents["Chapters"] = chaptersJSONObject;
			} else {
				surveyJSONObjectContents["Chapters"] = null;
			}
		} else {
			console.log("Incorrect flockSONversion :-(");
		}
		var surveyJSONObject = {};
		surveyJSONObject["Survey"] = surveyJSONObjectContents;
		return surveyJSONObject;
	}
	this.deserializeJSON = function(surveyJSONString) {
		var surveyObject = null;
		try {
			surveyObject = JSON.parse(surveyJSONString);
		} catch (e) {
			console
					.log("JSON not parsed correctly, Survey is not correct JSON :-(");
		}
		if (surveyObject != null) {
			var surveyObjectContents = null;
			if ("Survey" in surveyObject) {
				surveyObjectContents = surveyObject["Survey"];
			} else {
				console.log("No Survey in Object :-(");
			}
			if (surveyObjectContents != null) {
				if ("flockSONversion" in surveyObjectContents) {
					if (surveyObjectContents["flockSONversion"] == "0.1") {
						this.flockSONversion = surveyObjectContents["flockSONversion"];
						if ("Title" in surveyObjectContents) {
							this.title = surveyObjectContents["Title"];
						} else {
							console.log("No Title in Survey object :-(");
						}
						if ("Chapters" in surveyObjectContents) {
							var chaptersArray = surveyObjectContents["Chapters"];
							if (chaptersArray.constructor === Array) {
								this.chapters = [];
								for ( var chapterJSONObject in chaptersArray) {
									var chapterObj = new chapter();
									chapterObj.derializeJSON(chapterJSONObject)
									this.chapters.push(chapterObj);
								}
							} else {
								console
										.log("Chapters in Survey is not a JSONArray :-(")
							}
						} else {
							console.log("No Chapters in Survey object :-(");
						}

					} else {
						console.log("Incorrect flockSONversion in Survey :-(")
					}
				} else {
					console.log("No flockSONversion in Survey :-(");
				}
			}
		}
	}
};