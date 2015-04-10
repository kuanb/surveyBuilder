// Here be the Views
// !!/!T(&"#("/!(/T#")(/!=)/"=)(!)(YEU!")/H)"(UWE=")!"(!=)(!=#)(=))))
FT_pb = function() {
	this.FTPrM = new FT_pr();
	this.FSUxEl = new FS_ux_el();
	this.FS = new FlockSON();
	this.FSsb = new FS_sb();
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
		this.div = null;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "project";
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
			this.addSPB.getView().onclick = function() {
				if (thatP.sPcontainer.innerHTML != "") {
					thatP.removeSurveyProject();
				} else {
					var sP = new that.FTPrM.surveyProject("SurveyProject");
					thatP.addSurveyProject(sP);
					var ps = thatP.projectsContainer.children[Array.prototype.indexOf.call(thatP.sPcontainer.parentNode.children, thatP.sPcontainer)].offsetTop;
					var pcs = thatP.div.children[Array.prototype.indexOf.call(thatP.projectsContainer.parentNode.children, thatP.projectsContainer)].offsetTop;
					thatP.div.scrollTop = ps + pcs;
				}
				thatP.contentChanged();
			}
			this.addTPB.getView().onclick = function() {
				if (thatP.tPcontainer.innerHTML != "") {
					thatP.removeTrackerProject();
				} else {
					var tP = new that.FTPrM.trackerProject();
					thatP.addTrackerProject(tP);
					var ps = thatP.projectsContainer.children[Array.prototype.indexOf.call(thatP.tPcontainer.parentNode.children, thatP.tPcontainer)].offsetTop;
					var pcs = thatP.div.children[Array.prototype.indexOf.call(thatP.projectsContainer.parentNode.children, thatP.projectsContainer)].offsetTop;
					thatP.div.scrollTop = ps + pcs;
				}
				thatP.contentChanged();
			}
			this.addCPB.getView().onclick = function() {
				if (thatP.cPcontainer.innerHTML != "") {
					thatP.removeCountersProject();
				} else {
					var cP = new that.FTPrM.countersProject();
					thatP.addCountersProject(cP);
					var ps = thatP.projectsContainer.children[Array.prototype.indexOf.call(thatP.cPcontainer.parentNode.children, thatP.cPcontainer)].offsetTop;
					var pcs = thatP.div.children[Array.prototype.indexOf.call(thatP.projectsContainer.parentNode.children, thatP.projectsContainer)].offsetTop;
					thatP.div.scrollTop = ps + pcs;
				}
				thatP.contentChanged();
			}

		}
		this.contentChanged = function() {
			if (this.surveyProjectView != null) {
				var sPv = this.surveyProjectView.getSurveyProject();
				var sPm = this.pr.getSurveyProject();
				if(sPv != sPm){
					this.pr.setSurveyProject(sPv);
				}
			} else {
				this.pr.setSurveyProject(null);
			}
			if (this.trackerProjectView != null) {
				var tPv = this.trackerProjectView.getTrackerProject();
				var tPm = this.pr.getTrackerProject();
				if(tPv != tPm){
					this.pr.setTrackerProject(tPv);
				}
			} else {
				this.pr.setTrackerProject(null);
			}
			if (this.countersProjectView != null) {
				var cPv = this.countersProjectView.getCountersProject();
				var cPm = this.pr.getCountersProject();
				if(cPv != cPm){
					this.pr.setCountersProject(cPv);
				}
			} else {
				this.pr.setCountersProject(null);
			}
			this.parentView.contentChanged();
		}
		this.updateContent = function(pr) {
			this.pr = pr;
			var sP = pr.getSurveyProject();
			var tP = pr.getTrackerProject();
			var cP = pr.getCountersProject();
			if (sP != null) {
				thatP.addSurveyProject(sP);
				thatP.addSPB.changeLook("remove", "", "Survey");
			} else {
				thatP.removeSurveyProject();
				thatP.addSPB.changeLook("add", "", "Survey");
			}
			if (tP != null) {
				this.addTrackerProject(tP);
				thatP.addTPB.changeLook("remove", "", "Tracker");
			} else {
				thatP.addTPB.changeLook("add", "", "Tracker");
			}
			if (cP != null) {
				this.addCountersProject(cP);
				thatP.addCPB.changeLook("remove", "", "Counters");
			} else {
				thatP.addCPB.changeLook("add", "", "Counters");
			}
		}
		this.addSurveyProject = function(sP) {
			if (this.surveyProjectView == null) {
				this.surveyProjectView = new that.surveyProjectView(sP, thatP);
				thatP.sPcontainer.appendChild(this.surveyProjectView.getView());
				thatP.addSPB.changeLook("remove", "", "Survey");
			} else {
				this.surveyProjectView.updateContent(sP);
			}
		}
		this.addTrackerProject = function(tP) {
			if (this.trackerProjectView == null) {
				this.trackerProjectView = new that.trackerProjectView(tP, thatP);
				thatP.tPcontainer
						.appendChild(this.trackerProjectView.getView());
				thatP.addTPB.changeLook("remove", "", "Tracker");
			} else {
				this.trackerProjectView.updateContent(tP);
			}
		}
		this.addCountersProject = function(cP) {
			if (this.countersProjectView == null) {
				this.countersProjectView = new that.countersProjectView(cP,
						thatP);
				thatP.cPcontainer.appendChild(this.countersProjectView
						.getView());
				thatP.addCPB.changeLook("remove", "", "Counters");
			} else {
				this.countersProjectView.updateContent(cP);
			}
		}
		this.removeSurveyProject = function() {
			this.surveyProjectView = null;
			this.pr.setSurveyProject(null);
			thatP.sPcontainer.innerHTML = "";
			thatP.addSPB.changeLook("add", "", "Survey");
		}
		this.removeTrackerProject = function() {
			this.trackerProjectView = null;
			this.pr.setTrackerProject(null);
			thatP.tPcontainer.innerHTML = "";
			thatP.addTPB.changeLook("add", "", "Tracker");
		}
		this.removeCountersProject = function() {
			this.countersProjectView = null;
			this.pr.setCountersProject(null);
			thatP.cPcontainer.innerHTML = "";
			thatP.addCPB.changeLook("add", "", "Counters");
		}
		this.getView = function() {
			return this.div;
		}
		this.getProject = function() {
			return this.pr;
		}
		this.initializeView();
		this.updateContent(this.pr);
	}

	this.surveyProjectView = function(sP, parentView) {
		this.parentView = parentView;
		this.sP = sP;
		this.tableIDInput = null;
		this.surveyView = null;
		thatSP = this;
		this.getSurveyProject = function(){
			return this.sP;
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "survey_project";
			this.tableIDInput = document.createElement("input");
			this.tableIDInput.type = "text";
			this.tableIDInput.className = "form-control"
			this.tableIDInput.placeholder = "Table ID"
			this.tableIDInput.oninput = function() {
				thatSP.contentChanged();
			};
			this.div.appendChild(this.tableIDInput);
			this.surveyView = new that.FSsb.surveyView(new that.FS.survey(),
					thatSP);
			this.div.appendChild(this.surveyView.getView());
		}
		this.updateContent = function(sP) {
			this.sP = sP;
			if (this.tableIDInput.value != this.sP.getTableID()) {
				this.tableIDInput.value = this.sP.getTableID();
			} 
			var surv = this.sP.getSurvey();
			if(this.sP.getSurvey() != null){
				this.surveyView.updateContent(surv);
			}
		}
		this.contentChanged = function() {
			if (this.tableIDInput.value != "") {
				this.sP.setTableID(this.tableIDInput.value)
			} else {
				this.sP.setTableID(null);
			}
			if (this.surveyView != null) {
				this.sP.setSurvey(this.surveyView.getSurvey());
			} else {
				this.sP.setSurvey(null);
			}
			this.parentView.contentChanged();
		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
		this.updateContent(this.sP);
	}

	this.trackerProjectView = function(tP, parentView) {
		this.parentView = parentView;
		this.tP = tP;
		var thatTP = this;
		this.startSurveyView = null;
		this.endSurveyView = null;
		this.getTrackerProject = function(){
			return this.tP;
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div = document.createElement('div');
			this.div.className = "tracker_project";
			this.buttonsContainer = document.createElement('div');
			this.buttonsContainer.className = "tracker_project_buttons_container";
			this.addSSB = new that.FSUxEl.button("add", "", "Start Survey");
			this.buttonsContainer.appendChild(this.addSSB.getView());
			this.addESB = new that.FSUxEl.button("add", "", "End Survey");
			this.buttonsContainer.appendChild(this.addESB.getView());
			this.div.appendChild(this.buttonsContainer);
			this.sScontainer = document.createElement('div');
			this.sScontainer.className = "survey_project_container";
			this.eScontainer = document.createElement('div');
			this.eScontainer.className = "survey_project_container";
			this.projectsContainer = document.createElement("div");
			this.projectsContainer.className = "projects_container"
			this.projectsContainer.appendChild(this.sScontainer);
			this.projectsContainer.appendChild(this.eScontainer);
			this.div.appendChild(this.projectsContainer);
			this.addSSB.getView().onclick = function() {
				if (thatTP.sScontainer.innerHTML != "") {
					thatTP.removeStartSurvey();
				} else {
					var sP = new that.FTPrM.surveyProject("StartSurvey");
					thatTP.addStartSurvey(sP);
					var ps = thatTP.projectsContainer.children[Array.prototype.indexOf.call(thatTP.sScontainer.parentNode.children, thatTP.sScontainer)].offsetTop;
					var pcs = thatTP.div.children[Array.prototype.indexOf.call(thatTP.projectsContainer.parentNode.children, thatTP.projectsContainer)].offsetTop;
					thatTP.div.scrollTop = ps + pcs;
				}
				thatTP.contentChanged();
			}
			this.addESB.getView().onclick = function() {
				if (thatTP.eScontainer.innerHTML != "") {
					thatTP.removeEndSurvey();
				} else {
					var sP = new that.FTPrM.surveyProject("EndSurvey");
					thatTP.addEndSurvey(sP);
					var ps = thatTP.projectsContainer.children[Array.prototype.indexOf.call(thatTP.eScontainer.parentNode.children, thatTP.eScontainer)].offsetTop;
					var pcs = thatTP.div.children[Array.prototype.indexOf.call(thatTP.projectsContainer.parentNode.children, thatTP.projectsContainer)].offsetTop;
					thatTP.div.scrollTop = ps + pcs;
				}
				thatTP.contentChanged();
			}

		}
		this.removeStartSurvey = function(){
			this.startSurveyView = null;
			this.tP.setStartSurvey(null);
			thatTP.sScontainer.innerHTML = "";
			thatTP.addSSB.changeLook("add", "", "Start Survey");
		}
		this.addStartSurvey = function(sP){
			if (this.startSurveyView == null) {
				this.startSurveyView = new that.surveyProjectView(sP, thatTP);
				thatTP.sScontainer.appendChild(this.startSurveyView.getView());
				thatTP.addSSB.changeLook("remove", "", "End Survey");
			} else {
				this.startSurveyView.updateContent(sP);
			}
		}
		this.removeEndSurvey = function(){
			this.endSurveyView = null;
			this.tP.setEndSurvey(null);
			thatTP.eScontainer.innerHTML = "";
			thatTP.addESB.changeLook("add", "", "End Survey");
		}
		this.addEndSurvey = function(sP){
			if (this.endSurveyView == null) {
				this.endSurveyView = new that.surveyProjectView(sP, thatTP);
				thatTP.eScontainer.appendChild(this.endSurveyView.getView());
				thatTP.addESB.changeLook("remove", "", "End Survey");
			} else {
				this.endSurveyView.updateContent(sP);
			}
		}
		this.updateContent = function(tP) {
			this.tP = tP;
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
		this.getCountersProject = function(){
			return this.cP;
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.innerHTML = JSON.stringify(cP.serializeJSON());
		}
		this.updateContent = function(cP) {
			this.cP = cP;
		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
	}

	this.trackerView = function(tr, parentView) {
		this.parentView = parentView;
		this.tr = tr;
		this.initializeView = function() {

		}
		this.updateContent = function(tr) {
			this.tr = tr;
		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
		this.updateContent(this.tr);
	}

	this.counterView = function(co, parentView) {
		this.parentView = parentView;
		this.co = co;
		this.initializeView = function() {

		}
		this.updateContent = function(pr) {

		}
		this.contentChanged = function() {

		}
		this.getView = function() {
			return this.div;
		}
		this.initializeView();
		this.updateContent(this.tr);
	}
}