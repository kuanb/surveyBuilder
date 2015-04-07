FS_sb = function() {
	this.FSUxEl = new FS_ux_el();
	this.FS = new FlockSON();
	var that = this;
	this.surveyView = function(survey, parentView) {
		thatC = this;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "survey";
			var thatSV = this;
			this.addChapterButton = new that.FSUxEl.button("add", "", "Add chapter");
			this.addChapterButton.getView().onclick = function() {
				thatSV.addChapter(new that.FS.chapter());
				thatSV.contentChanged();
			};
			this.chaptersArrayContainerDiV = document.createElement('div');
			this.chaptersArrayContainerDiV.className = "chaptersArrayContainerDiV";
			this.chaptersContainerDIV = document.createElement('div');
			this.chaptersContainerDIV.className = "chaptersContainerDIV";
			this.chaptersContainerDIV
					.appendChild(this.chaptersArrayContainerDiV);
			this.chaptersContainerDIV.appendChild(this.addChapterButton.getView());
			this.div.appendChild(this.chaptersContainerDIV);
		}
		this.updateContent = function(survey) {
			this.survey = survey;
			if (this.chapters != this.survey.getChapters()) {
				this.chapterViews = [];
				while (this.chaptersArrayContainerDiV.firstChild) {
					this.chaptersArrayContainerDiV
							.removeChild(this.chaptersArrayContainerDiV.firstChild);
				}
				this.chapters = this.survey.getChapters();
				for (var i = 0; i < this.chapters.length; i++) {
					this.addChapter(this.chapters[i]);
				}
				;
			}
		}
		this.getView = function() {
			return this.div;
		}
		this.addChapter = function(chapter) {
			var chapterContainerDIV = document.createElement('div');
			chapterContainerDIV.className = "chapterContainerDIV";
			var newChapterView = new chapterView(chapter, this);
			this.chapterViews.push(newChapterView);
			var newChapterDIV = newChapterView.getView();
			var eraseChapterButton = new that.FSUxEl.button("remove", "", "Erase chapter");
			chapterContainerDIV.appendChild(eraseChapterButton.getView());
			chapterContainerDIV.appendChild(newChapterDIV);
			this.chaptersArrayContainerDiV.appendChild(chapterContainerDIV);
			eraseChapterButton.onclick = function() {
				thatC.eraseChapter(chapterContainerDIV);
			}
		}
		this.eraseChapter = function(chapterDIV) {
			var parentChilds = chapterDIV.parentNode.childNodes;
			for (var i = 0; i < parentChilds.length; i++) {
				if (parentChilds[i] == chapterDIV) {
					this.chapterViews.splice(i, 1);
					break
				}
			}
			this.chaptersArrayContainerDiV.removeChild(chapterDIV);
			this.contentChanged();
		}
		this.contentChanged = function() {
			var changedChapters = [];
			for (i = 0; i < this.chapterViews.length; i++) {
				changedChapters[i] = this.chapterViews[i].getChapter();
			}
			this.survey.setChapters(changedChapters);
			this.survey.setfusionTableID(this.fusionTableIDInput.value);
			this.parentView.contentChanged();
		};
		this.getSurvey = function() {
			return this.survey;
		}
		this.parentView = parentView;
		this.survey = survey;
		this.chapterViews = []; // Instances of chapters
		this.div = null;
		this.addChapterButton = null;
		this.fusionTableIDInput = null;
		this.chaptersContainerDIV = null;
		this.chaptersArrayContainerDiV = null;
		this.initializeView();
		this.updateContent(this.survey);
	}
	this.questionArrayView = function(questionArray, parentView, inLoop) {
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "questionsContainerDIV";
			this.questionsArrayContainer = document.createElement('div');
			this.questionsArrayContainer.className = "questionsArrayContainer";
			this.addQuestionButton = new that.FSUxEl.button("add", "", "Add question");
			var thatQAV = this;
			this.addQuestionButton.getView().onclick = function() {
				thatQAV.addQuestion(new question(thatQAV.inLoop));
				thatQAV.contentChanged();
			};
			this.div.appendChild(this.questionsArrayContainer);
			this.div.appendChild(this.addQuestionButton.getView());
		}
		this.updateContent = function(questionArray) {
			if (questionArray != this.getQuestions()) {
				this.QuestionViews = [];
				while (this.questionsArrayContainer.firstChild) {
					this.questionsArrayContainer
							.removeChild(this.questionsArrayContainer.firstChild);
				}
				this.questionArray = questionArray;
				if (this.questionArray != null) {
					for (var i = 0; i < this.questionArray.length; i++) {
						this.addQuestion(this.questionArray[i]);
					}
					;
				}
			}
		}
		this.addQuestion = function(question) {
			var questionContainerDIV = document.createElement('div');
			questionContainerDIV.className = "questionContainerDIV";
			newQuestionView = new questionView(question, this, inLoop);
			this.questionViews.push(newQuestionView);
			var newQuestionDIV = newQuestionView.getView();
			var eraseQuestionButton = new button("remove", "", "Erase question");
			questionContainerDIV.appendChild(eraseQuestionButton);
			questionContainerDIV.appendChild(newQuestionDIV);
			this.questionsArrayContainer.appendChild(questionContainerDIV);
			eraseQuestionButton.onclick = function() {
				thatQAV.eraseQuestion(questionContainerDIV);
			};
		};
		this.eraseQuestion = function(questionDIV) {
			var parentChilds = questionDIV.parentNode.childNodes;
			for (var i = 0; i < parentChilds.length; i++) {
				if (parentChilds[i] == questionDIV) {
					this.questionViews.splice(i, 1);
					break
				}
				;
			}
			;
			this.questionsArrayContainer.removeChild(questionDIV);
			this.contentChanged();
		};
		this.contentChanged = function() {
			this.parentView.contentChanged();
		};
		this.getView = function() {
			return this.div;
		}
		this.getQuestions = function() {
			this.questionArray = [];
			for (i = 0; i < this.questionViews.length; i++) {
				this.questionArray[i] = this.questionViews[i].getQuestion();
			}
			;
			return this.questionArray;
		};
		this.inLoop = inLoop;
		this.questionArray = questionArray;
		this.parentView = parentView;
		this.questionViews = []; // Array of question Views objects
		this.initializeView();
		this.updateContent(this.questionArray);
	}
	;

	function answerArrayView(answerArray, parentView, canHaveJumps) {
		this.initializeView = function() {
			this.answerViews = []; // Array of question Views objects
			this.div = document.createElement('div');
			this.div.className = "answersContainerDIV";
			this.answersArrayContainer = document.createElement('div');
			this.answersArrayContainer.className = "this.answersArrayContainerDIV";
			this.addAnswerButton = new button("add", "", "Add answer");
			var that = this;
			this.addAnswerButton.onclick = function() {
				that.addAnswer(new answer());
				that.contentChanged();
			};
			this.div.appendChild(this.answersArrayContainer);
			this.div.appendChild(this.addAnswerButton);
		}
		this.updateContent = function(answerArray) {
			if (answerArray != this.getAnswers()) {
				this.AnswerViews = [];
				while (this.answersArrayContainer.firstChild) {
					this.answersArrayContainer
							.removeChild(this.answersArrayContainer.firstChild);
				}
				this.answerArray = answerArray;
				if (answerArray != null) {
					for (var i = 0; i < this.answerArray.length; i++) {
						this.addAnswer(this.answerArray[i]);
					}
					;
				}
			}
		}
		this.addAnswer = function(answer) {
			var answerContainerDIV = document.createElement('div');
			answerContainerDIV.className = "answerContainerDIV";
			var newAnswerView = new answerView(answer, this, this.canHaveJumps);
			this.answerViews.push(newAnswerView);
			var newAnswerDIV = newAnswerView.getView();
			var eraseAnswerButton = new button("remove", "", "Erase answer");
			answerContainerDIV.appendChild(eraseAnswerButton);
			answerContainerDIV.appendChild(newAnswerDIV);
			this.answersArrayContainer.appendChild(answerContainerDIV);
			var that = this;
			eraseAnswerButton.onclick = function() {
				that.eraseAnswer(answerContainerDIV);
			};
		};
		this.eraseAnswer = function(answerDIV) {
			var parentChilds = answerDIV.parentNode.childNodes;
			for (var i = 0; i < parentChilds.length; i++) {
				if (parentChilds[i] == answerDIV) {
					this.answerViews.splice(i, 1);
					break
				}
			}
			this.answersArrayContainer.removeChild(answerDIV);
			this.contentChanged();
		};
		this.contentChanged = function() {
			parentView.contentChanged();
		};
		this.getView = function() {
			return this.div;
		}
		this.getAnswers = function() {
			var answers = [];
			for (i = 0; i < this.answerViews.length; i++) {
				answers[i] = this.answerViews[i].getAnswer();
			}
			return answers;
		}
		this.answerArray = answerArray;
		this.parentView = parentView;
		this.canHaveJumps = canHaveJumps;
		this.initializeView();
		this.updateContent(this.answerArray);
	}
	function answerView(answer, parentView, canHaveJump) {
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "answer";
			var that = this;
			this.answerInput = document.createElement("input");
			this.answerInput.type = "text";
			this.answerInput.className = "form-control";
			this.answerInput.oninput = function() {
				that.contentChanged();
			};
			this.jumpInput = document.createElement("input");
			this.jumpInput.type = "text";
			this.jumpInput.className = "form-control";
			this.jumpInput.style.display = "none";
			this.jumpInput.oninput = function() {
				that.contentChanged();
			};

			this.jumpCheckbox = new checkbox("", "Jump", "jumpEnabled");
			this.jumpCheckbox.getView().checked = false;
			this.jumpCheckbox.getView().onchange = function() {
				that.toggleJumpOption();
			};

			this.div.appendChild(this.answerInput);
			if (canHaveJump) {
				this.jumpCheckbox.addTo(this.div);
				this.div.appendChild(this.jumpInput);
			}
			;
		};
		this.updateContent = function(answer) {
			this.answer = answer;
			if (this.answerInput.value != this.answer.getAnswerText()) {
				this.answerInput.value = this.answer.getAnswerText();
			}
			if ((this.answer.getJumpID() != null) && (this.canHaveJump)) {
				this.jumpCheckbox.setCheckedState(true);
				this.toggleJumpOption();
				this.jumpInput.value = this.answer.getJumpID();
			} else {
				this.jumpCheckbox.setCheckedState(false);
			}
		}
		this.getView = function() {
			return this.div;
		};
		this.contentChanged = function() {
			this.answer.setAnswerText(this.answerInput.value);
			this.answer.setjumpID(this.jumpInput.value);
			parentView.contentChanged();
		};
		this.getAnswer = function() {
			return this.answer;
		};
		this.toggleJumpOption = function() {
			if (this.jumpCheckbox.isChecked()) {
				this.jumpInput.style.display = "inherit";
			} else {
				this.jumpInput.style.display = "none";
				if (this.jumpInput.value != "") {
					this.jumpInput.value = "";
					this.contentChanged();
				}
			}
		}
		this.canHaveJump = canHaveJump;
		this.answer = answer;
		this.parentView = parentView;
		this.jumpCheckbox = null;
		this.answerInput = null;
		this.jumpInput = null;
		this.initializeView();
		this.updateContent(this.answer);
	}
	;
	function chapterView(chapter, parentView) {
		this.updateContent = function(chapter) {
			if (this.titleInput.value != this.chapter.getTitle()) {
				this.titleInput.value = this.chapter.getTitle();
			}
			if (this.questionArrayView != null) {
				if (this.chapter.getQuestions() != this.questionArrayView
						.getQuestions()) {
					this.questionArrayView
							.updateContent(this.chapter.getQuestions);
				}
			} else {
				this.questionArrayView = new that.questionArrayView(this.chapter
						.getQuestions(), this, false);
				this.div.appendChild(this.questionArrayView.getView());
			}
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "chapter";
			var that = this;
			this.titleInput = document.createElement("input");
			this.titleInput.type = "text";
			this.titleInput.className = "form-control"
			this.titleInput.oninput = function() {
				that.contentChanged();
			};
			this.div.appendChild(this.titleInput);
		}
		this.getView = function() {
			return this.div;
		}
		this.getChapter = function() {
			return this.chapter;
		}
		this.contentChanged = function() {
			this.chapter.setQuestions(this.questionArrayView.getQuestions());
			this.chapter.setTitle(this.titleInput.value);
			this.parentView.contentChanged();
		};
		this.chapter = chapter;
		this.parentView = parentView;
		this.initializeView();
		this.updateContent(this.chapter);
	}
	;
	function trackerView(tracker, parentView) {
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "tracker";
			var that = this;
			this.fusionTableIDInput = document.createElement("input");
			this.fusionTableIDInput.type = "text";
			this.fusionTableIDInput.className = "form-control"
			this.fusionTableIDInput.oninput = function() {
				that.contentChanged();
			};
			this.div.appendChild(this.fusionTableIDInput);
		}
		this.updateContent = function(tracker) {
			this.tracker = tracker;
			if (this.fusionTableIDInput.value != this.tracker
					.getfusionTableID()) {
				this.fusionTableIDInput.value = this.tracker.getfusionTableID();
			}
			if (this.questionArrayView != null) {
				if (this.tracker.getQuestions() != this.questionArrayView
						.getQuestions()) {
					this.questionArrayView
							.updateContent(this.tracker.getQuestions);
				}
			} else {
				this.questionArrayView = new questionArrayView(this.tracker
						.getQuestions(), this, false);
				this.div.appendChild(this.questionArrayView.getView());
			}
		}
		this.getView = function() {
			return this.div;
		}
		this.getTracker = function() {
			return this.tracker;
		}
		this.contentChanged = function() {
			this.tracker.setQuestions(this.questionArrayView.getQuestions());
			this.tracker.setfusionTableID(this.fusionTableIDInput.value);
			this.parentView.contentChanged();
		};
		this.tracker = tracker;
		this.parentView = parentView;

		this.initializeView();
		this.updateContent(this.tracker);
	}
	function questionView(question, parentView, inLoop) {
		this.updateContent = function(question) {
			this.question = question;
			if (this.questionInput.value != this.question.getQuestionText()) {
				this.questionInput.value = this.question.getQuestionText();
			}
			if (this.IDInput.value != this.question.getQuestionID()) {
				this.IDInput.value = this.question.getQuestionID();
			}
			if (this.questionKindDropDown.options[this.questionKindDropDown.selectedIndex].value != this.question
					.getKind()) {
				var indexToSelect;
				for (var i = this.questionKindDropDown.options.length - 1; i >= 0; i--) {
					if (this.questionKindDropDown.options[i].value == this.question
							.getKind()) {
						indexToSelect = i;
						break;
					}
				}
				;
				this.questionKindDropDown.selectedIndex = indexToSelect;
				this.updateQuestionKind(this.question.getKind());
			}
			if ((this.question.getJumpID() != null) && (!this.inLoop)) {
				this.jumpCheckbox.setCheckedState(true);
				this.toggleJumpOption();
				this.jumpInput.value = this.question.getJumpID();
			} else {
				this.jumpCheckbox.setCheckedState(false);
			}
			if ((this.question.isOtherEnabled() != null)
					&& ((this.question.getKind() == this.questionKinds.MULTIPLE_CHOICE["jsonName"]) || (this.question
							.getKind() == this.questionKinds.CHECKBOX["jsonName"]))) {
				var tempOnchangeFunction = this.otherCheckbox.getView().onchange;
				this.otherCheckbox.getView().onchange = function() {
				};
				this.otherCheckbox.setCheckedState(this.question
						.isOtherEnabled());
				this.otherCheckbox.getView().onchange = tempOnchangeFunction;
			}
		}

		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "question";
			this.IDInput = document.createElement("input");
			this.IDInput.type = "text";
			this.IDInput.className = "form-control"
			var that = this;
			this.IDInput.oninput = function() {
				that.contentChanged();
			};
			this.questionInput = document.createElement("input");
			this.questionInput.type = "text";
			this.questionInput.className = "form-control"
			this.questionInput.oninput = function() {
				that.contentChanged();
			};

			this.questionKindDropDown = new select("", "", this.questionKinds
					.getNames(), this.questionKinds.getJsonNames());
			this.questionKindDropDown.onchange = function() {
				that.updateQuestionKind(this.options[this.selectedIndex].value);
				that.contentChanged();
			};

			this.jumpInput = document.createElement("input");
			this.jumpInput.type = "text";
			this.jumpInput.className = "form-control"
			this.jumpInput.style.display = "none";
			this.jumpInput.oninput = function() {
				that.contentChanged();
			};

			this.jumpCheckbox = new checkbox("", "Jump", "jumpEnabled");
			this.jumpCheckbox.getView().onchange = function() {
				that.toggleJumpOption();
			};

			this.div.appendChild(this.IDInput);
			this.div.appendChild(this.questionInput);
			if (!this.inLoop) {
				this.jumpCheckbox.addTo(this.div);
			}
			this.div.appendChild(this.jumpInput);
			this.div.appendChild(this.questionKindDropDown);
		}
		this.getView = function() {
			return this.div;
		}
		this.contentChanged = function() {
			this.question.setQuestionText(this.questionInput.value);
			this.question.setQuestionID(this.IDInput.value);
			if (this.jumpInput.value == "") {
				this.question.setjumpID(null);
			} else {
				this.question.setjumpID(this.jumpInput.value);
			}
			if (this.answerArrayView != null) {
				this.question.setAnswers(this.answerArrayView.getAnswers());
			} else {
				this.question.setAnswers(null);
			}
			if (this.questionArrayView != null) {
				this.question.setLoopQuestions(this.questionArrayView
						.getQuestions());
			} else {
				this.question.setLoopQuestions(null);
			}
			if (this.otherCheckbox != null) {
				this.question.setOtherEnabled(this.otherCheckbox.isChecked());
			} else {
				this.question.setOtherEnabled(null);
			}
			this.question
					.setKind(this.questionKindDropDown.options[this.questionKindDropDown.selectedIndex].value);
			this.parentView.contentChanged();
		};
		this.getQuestion = function() {
			return this.question;
		}
		this.toggleJumpOption = function() {
			if (this.jumpCheckbox.isChecked()) {
				this.jumpInput.style.display = "inherit";
			} else {
				this.jumpInput.style.display = "none";
				if (this.jumpInput.value != "") {
					this.jumpInput.value = "";
					this.contentChanged();
				}
			}
		}
		this.updateQuestionKind = function(newQuestionKind) {
			switch (newQuestionKind) {
			// We don't need arrays
			case this.questionKinds.OPEN_TEXT["jsonName"]:
			case this.questionKinds.OPEN_NUMBER["jsonName"]:
			case this.questionKinds.IMAGE["jsonName"]:
				this.removeOtherOption();
				this.removeAnswerArray();
				this.removeQuestionArray();
				break;
			// We need an answers array
			case this.questionKinds.ORDERED["jsonName"]:
				this.removeQuestionArray();
				this.removeOtherOption();
				this.addAnswerArray();
				break;
			case this.questionKinds.MULTIPLE_CHOICE["jsonName"]:
			case this.questionKinds.CHECKBOX["jsonName"]:
				this.addOtherOption();
				this.removeQuestionArray();
				this.addAnswerArray();
				break;
			// We need a question array
			case this.questionKinds.LOOP["jsonName"]:
				this.removeOtherOption();
				this.removeAnswerArray();
				this.addQuestionArray();
				break;
			}
		}
		this.addQuestionArray = function() {
			if (this.questionArrayView == null) {
				this.questionArrayView = new questionArrayView(this.question
						.getLoopQuestions(), this, true);
				this.div.appendChild(this.questionArrayView.getView());
			}
		}
		this.addAnswerArray = function() {
			if (this.answerArrayView == null) {
				var canHaveJump = false;
				if ((this.questionKindDropDown.options[this.questionKindDropDown.selectedIndex].value == this.questionKinds.MULTIPLE_CHOICE["jsonName"])
						&& !this.inLoop) {
					canHaveJump = true;
				}
				this.answerArrayView = new answerArrayView(this.question
						.getAnswers(), this, canHaveJump);
				this.div.appendChild(this.answerArrayView.getView());
			}
		}
		this.removeQuestionArray = function() {
			if (this.questionArrayView != null) {
				this.div.removeChild(this.questionArrayView.getView());
				this.questionArrayView = null;
			}
		}
		this.removeAnswerArray = function() {
			if (this.answerArrayView != null) {
				this.div.removeChild(this.answerArrayView.getView());
				this.answerArrayView = null;
			}
		}
		this.addOtherOption = function() {
			if (this.otherCheckbox == null) {
				this.otherCheckbox = new checkbox("", "Other", "otherEnabled");
				var that = this;
				this.otherCheckbox.getView().onchange = function() {
					that.contentChanged();
				};
				this.otherCheckbox.addTo(this.div);
			}
		}
		this.removeOtherOption = function() {
			if (this.otherCheckbox != null) {
				this.otherCheckbox.removeFrom(this.div);
				this.otherCheckbox = null;
			}
		}
		this.question = question;
		this.parentView = parentView;
		this.inLoop = inLoop;
		this.questionKinds = new questionKind(this.inLoop);
		this.answerArrayView = null;
		this.questionArrayView = null;
		this.questionKindDropDown = null;
		this.otherCheckbox = null;
		this.IDInput = null;
		this.questionInput = null;
		this.questionKindDropDown = null;
		this.jumpInput = null;
		this.jumpCheckbox = null;
		this.initializeView();
		this.updateContent(this.question);
	}
	;
}