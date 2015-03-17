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
	this.generateJSON = function() {
		var questionJSON = {};
		questionJSON["Question"] = this.questionText;
		questionJSON["id"] = this.questionID;
		questionJSON["Kind"] = this.kind;
		if (this.jumpID != null) {
			questionJSON["Jump"] = this.jumpID;
		}
		if (this.otherEnabled != null) {
			questionJSON["Other"] = this.otherEnabled;
		}
		if ((this.answers !== null) && (this.answers.length > 0)) {
			var length = this.answers.length;
			var answersArray = [];
			for (var i = 0; i < length; i++) {
				answersArray.push(this.answers[i].generateJSON());
			}
			;
			questionJSON["Answers"] = answersArray;
		}
		if (this.loopQuestions != null) {
			var questionsJSONArray = [];
			for (var i = 0; i < this.loopQuestions.length; i++) {
				questionsJSONArray.push(this.loopQuestions[i].generateJSON());
			}
			if (questionsJSONArray.length > 0) {
				questionJSON["Questions"] = questionsJSONArray;
			}
		}
		return questionJSON;
	}
	this.constructFromJSON = function(object) {
		if ("Kind" in object) {
			var tempKind = object["Kind"];
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
						.log("Question kind in question object is not a valid value :-(");
			}
		} else {
			console.log("No question kind in question object :-(");
		}
		if ("Jump" in object) {
			this.jumpID = object["Jump"];
		} else {

		}
		if ("Question" in object) {
			this.questionText = object["Question"];
		} else {
			console.log("No question text in question object :-(")
		}
		if ("id" in object) {
			this.questionID = object["id"];
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
						this.answers[i].constructFromJSON(objectAnswers[i]);
					}
				} else {
					console.log("Answers in question is not an Array :-(");
				}
			} else {
				console.log("No answers in question object :-(");
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
								.constructFromJSON(objectQuestions[i]);
					}
				} else {
					console
							.log("Questions in loop questions is not an Array :-(");
				}
			} else {
				console.log("No questions in loop question object :-(");
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
	this.generateJSON = function() {
		var chapterJSON = {};
		var questionsJSONArray = [];
		for (var i = 0; i < this.questions.length; i++) {
			questionsJSONArray.push(this.questions[i].generateJSON());
		}
		chapterJSON["Chapter"] = this.title;
		if (questionsJSONArray.length > 0) {
			chapterJSON["Questions"] = questionsJSONArray;
		}
		return chapterJSON;
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
				console.log("Questions in chapter is not an Array :-(");
			}
		} else {
			console.log("No questions in chapter object :-(");
		}
		if ("Chapter" in object) {
			this.title = object["Chapter"];
		} else {
			console.log("No chapter title in object :-(");
		}
	}
};
function survey() {
	this.chapters = []; // Instances of chapters
	this.fusionTableID = null; // String

	this.getfusionTableID = function() {
		return this.fusionTableID;
	};
	this.setfusionTableID = function(fusionTableID) {
		this.fusionTableID = fusionTableID;
	};
	this.getChapters = function() {
		return this.chapters;
	};
	this.setChapters = function(chapters) {
		this.chapters = chapters;
	};
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
	this.generateJSON = function() {
		var surveyJSON = {};
		var chaptersJSONArray = [];
		for (var i = 0; i < this.chapters.length; i++) {
			chaptersJSONArray.push(this.chapters[i].generateJSON());
		}
		surveyJSON["Chapters"] = chaptersJSONArray;
		surveyJSON["TableID"] = this.fusionTableID;
		return surveyJSON;
	}
	this.constructFromJSON = function(object) {
		if ("Chapters" in object) {
			var objectChapters = object["Chapters"];
			if (Array.isArray(objectChapters)) {
				this.chapters = [];
				for (var i = 0; i < objectChapters.length; i++) {
					this.chapters.push(new chapter());
					this.chapters[i].constructFromJSON(objectChapters[i]);
				}
			} else {
				console.log("Chapters in survey is not an Array :-(");
			}
		} else {
			console.log("No chapters in survey object :-(");
		}
		if ("TableID" in object) {
			this.fusionTableID = object["TableID"];
		} else {
			console.log("No fusionTableID in survey object :-(");
		}
	}
};