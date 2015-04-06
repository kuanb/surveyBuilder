// Here be the Views
// !!/!T(&"#("/!(/T#")(/!=)/"=)(!)(YEU!")/H)"(UWE=")!"(!=)(!=#)(=))))
FT_pb = function() {
	this.FTPrM = new FT_pr();
	this.FSUxEl = new FS_ux_el();
	this.FS = new FlockSON();
	var that = this;
	this.projectView = function(pr, parentView) {
		this.parentView = parentView;
		this.pr = pr;
		var thatP = this;
		this.addSPB = null;
		this.addTPB = null;
		this.addCPB = null;
		this.surveyProjectView = null;
		this.trackerProjectView = null;
		this.countersProjectView = null;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "project";
			this.div.id = "project";
			this.buttonsContainer = document.createElement('div');
			this.buttonsContainer.className = "project_buttons_container";
			this.addSPB = new that.FSUxEl.button("add", "", "Survey");
			this.buttonsContainer.appendChild(this.addSPB.getView());
			this.addTPB = new that.FSUxEl.button("add", "", "Tracker");
			this.buttonsContainer.appendChild(this.addTPB.getView());
			this.addCPB = new that.FSUxEl.button("add", "", "Counters");
			this.buttonsContainer.appendChild(this.addCPB.getView());
			this.div.appendChild(this.buttonsContainer);
			this.sPcontainer = document.createElement('div');
			this.sPcontainer.className = "survey_project_container";
			this.tPcontainer = document.createElement('div');
			this.tPcontainer.className = "tracker_project_container";
			this.cPcontainer = document.createElement('div');
			this.cPcontainer.className = "counters_project_container";
			this.projectsContainer = document.createElement("div");
			this.projectsContainer.className = "projects_container"
			this.projectsContainer.appendChild(this.sPcontainer);
			this.projectsContainer.appendChild(this.tPcontainer);
			this.projectsContainer.appendChild(this.cPcontainer);
			this.div.appendChild(this.projectsContainer);
			this.addSPB.getView().onclick = function(){
				thatP.addSPB.changeLook("remove", "", "Survey");
				var sP =  new that.FTPrM.surveyProject("SurveyProject");
				thatP.addSurveyProject(sP);
				thatP.contentChanged();
			}
			this.addTPB.getView().onclick = function(){
				thatP.addTPB.changeLook("remove", "", "Tracker");
				var tP =  new that.FTPrM.trackerProject();
				thatP.addTrackerProject(tP);
				thatP.contentChanged();
			}
			this.addCPB.getView().onclick = function(){
				thatP.addCPB.changeLook("remove", "", "Counters");
				var cP =  new that.FTPrM.countersProject();
				thatP.addCountersProject(cP);
				thatP.contentChanged();
			}
			
		}
		this.contentChanged = function() {
			this.parentView.contentChanged();
		}
		this.updateContent = function(pr) {
			this.pr = pr;
			var sP = pr.getSurveyProject();
			var tP = pr.getTrackerProject();
			var cP = pr.getCountersProject();
			this.trackerProjectView
			if(sP != null){
				this.addSurveyProject(sP);
			}
			if(tP != null){
				this.addTrackerProject(tP);
			}
			if(cP != null){
				this.addCountersProject(cP);
			}			
		}
		this.addSurveyProject = function(sP){
			this.surveyProjectView = new that.surveyProjectView(sP, thatP);
			thatP.sPcontainer.appendChild(this.surveyProjectView.getView());
		}
		this.addTrackerProject = function(tP){
			this.trackerProjectView = new that.trackerProjectView(tP, thatP);
			thatP.tPcontainer.appendChild(this.trackerProjectView.getView());
		}
		this.addCountersProject = function(cP){
			this.countersProjectView = new that.countersProjectView(cP, thatP);
			thatP.cPcontainer.appendChild(this.countersProjectView.getView());
		}		
		this.getView = function() {
			return this.div;
		}
		this.getProject = function(){
			return this.pr;
		}
		this.initializeView();
		this.updateContent(this.pr);
	}

	this.surveyProjectView = function(sP, parentView) {
		this.parentView = parentView;
		this.sP = sP;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.innerHTML = JSON.stringify(sP.serializeJSON());
		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
	}

	this.trackerProjectView = function(tP, parentView) {
		this.parentView = parentView;
		this.tP = tP;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.innerHTML = JSON.stringify(tP.serializeJSON());
		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
	}

	this.countersProjectView = function(cP, parentView) {
		this.parentView = parentView;
		this.cP = cP;		
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.innerHTML = JSON.stringify(cP.serializeJSON());
		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
	}

	this.trackerView = function(tr, parentView) {
		this.initializeView = function() {

		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.parentView = parentView;
		this.tr = tr;
	}

	this.counterView = function(co, parentView) {
		this.initializeView = function() {

		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.parentView = parentView;
		this.co = co;
	}

	this.OLDprojectView = function(pr, parentView) {
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "project";
			this.div.id = "project";
			this.floatDiv = document.getElementById('JsonGoesHere');
			this.jsonText = document.createElement("div");
			this.jsonText.style.cssText = 'font-size:0.75em';
			this.floatDiv.appendChild(this.jsonText);
		}
		this.updateContent = function(pr) {
			this.pr = pr;
			if (this.pr.getSurvey() != null) {
				this.surveyView = new surveyView(this.pr.getSurvey(), this);
			} else {
				this.surveyView = new surveyView(new survey(), this);
			}
			if (this.pr.getTracker() != null) {
				this.trackerView = new trackerView(this.pr.getTracker(), this);
			} else {
				this.trackerView = new trackerView(new tracker(), this);
			}
			while (this.div.firstChild) {
				this.div.removeChild(this.div.firstChild);
			}
			this.div.appendChild(this.surveyView.getView());
			this.div.appendChild(this.trackerView.getView());
		}
		this.getView = function() {
			return this.div;
		};
		this.contentChanged = function() {
			this.pr.setSurvey(this.surveyView.getSurvey());
			this.pr.setTracker(this.trackerView.getTracker());
			this.contentChanges++;
			var projectSnapShot = new project();
			projectSnapShot.constructFromString(JSON.stringify(this.pr
					.generateJSON()));
			var newStackElement = new stackElement(this, projectSnapShot);
			this.uStack.addToStack(newStackElement);
			this.jsonText.innerHTML = "<b>Input Modification Count:</b> "
					+ this.contentChanges + " <br><br><b>JSON Output:</b><br>"
					+ JSON.stringify(this.pr.generateJSON());
			this.undo.disabled = !that.uStack.isUndoPossible();
			this.redo.disabled = !that.uStack.isRedoPossible();
		};
		this.pr = pr;
		this.contentChanges = -1;
		this.initializeView();
		this.updateContent(this.pr);
		this.uStack = new undoStack();
		this.undo = document.getElementById("undo");
		that = this;
		this.undo.onclick = function() {
			var undoStackElement = that.uStack.undo();
			that.pr = new project();
			that.pr.constructFromString(JSON
					.stringify(undoStackElement.objectState.generateJSON()));
			undoStackElement.view.updateContent(that.pr);
			that.contentChanges--;
			that.jsonText.innerHTML = "<b>Input Modification Count:</b> "
					+ that.contentChanges + " <br><br><b>JSON Output:</b><br>"
					+ JSON.stringify(that.pr.generateJSON());
			that.undo.disabled = !that.uStack.isUndoPossible();
			that.redo.disabled = !that.uStack.isRedoPossible();
		}
		this.undo.disabled = true;
		this.redo = document.getElementById("redo");
		this.redo.onclick = function() {
			var redoStackElement = that.uStack.redo();
			that.pr = new project();
			that.pr.constructFromString(JSON
					.stringify(redoStackElement.objectState.generateJSON()));
			redoStackElement.view.updateContent(that.pr);
			that.contentChanges++;
			that.jsonText.innerHTML = "<b>Input Modification Count:</b> "
					+ that.contentChanges + " <br><br><b>JSON Output:</b><br>"
					+ JSON.stringify(that.pr.generateJSON());
			that.undo.disabled = !that.uStack.isUndoPossible();
			that.redo.disabled = !that.uStack.isRedoPossible();
		}
		this.contentChanged();
	}
}