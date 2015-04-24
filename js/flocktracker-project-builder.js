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
		this.sPTab = null;
		this.tPTab = null;
		this.cPTab = null;
		this.surveyProjectView = null;
		this.trackerProjectView = null;
		this.countersProjectView = null;
		this.div = null;
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "FT project";
			this.tabsContainer = document.createElement("ul");
			this.tabsContainer.className = "nav nav-tabs";
			this.tabsContainer["data-tabs"] = "tabs";
			this.sPTab = document.createElement("li");
			this.sPTab.className = "active";
			this.sPTab.style.display = 'none';
			this.sPTab.innerHTML = '<a href="#survey_project" data-toggle="tab">Survey</a>';
			this.tPTab = document.createElement("li");
			this.tPTab.style.display = 'none';
			this.tPTab.innerHTML = '<a href="#tracker_project" data-toggle="tab">Tracker</a>';
			this.cPTab = document.createElement("li");
			this.cPTab.style.display = 'none';
			this.cPTab.innerHTML = '<a href="#counters_project" data-toggle="tab">Counters</a>';
			this.tabsContainer.appendChild(this.sPTab);
			this.tabsContainer.appendChild(this.tPTab);
			this.tabsContainer.appendChild(this.cPTab);
			this.projectsContainer = document.createElement("div");
			this.projectsContainer.className = "tab-content projects_container";
			this.surveyProjecTabContents = document.createElement("div");
			this.surveyProjecTabContents.className = "tab-pane active";
			this.surveyProjecTabContents.id = "survey_project";
			this.trackerProjecTabContents = document.createElement("div");
			this.trackerProjecTabContents.className = "tab-pane";
			this.trackerProjecTabContents.id = "tracker_project";
			this.countersProjecTabContents = document.createElement("div");
			this.countersProjecTabContents.className = "tab-pane";
			this.countersProjecTabContents.id = "counters_project";
			this.projectsContainer.appendChild(this.surveyProjecTabContents);
			this.projectsContainer.appendChild(this.trackerProjecTabContents);
			this.projectsContainer.appendChild(this.countersProjecTabContents);
			this.buttonsContainer = document.createElement('div');
			this.buttonsContainer.className = "project_buttons_container";
			this.addSPB = new that.FSUxEl.button("add", "", "Survey");
			this.buttonsContainer.appendChild(this.addSPB.getView());
			this.addTPB = new that.FSUxEl.button("add", "", "Tracker");
			this.buttonsContainer.appendChild(this.addTPB.getView());
			this.addCPB = new that.FSUxEl.button("add", "", "Counters");
			this.buttonsContainer.appendChild(this.addCPB.getView());
			this.div.appendChild(this.buttonsContainer);
			this.div.appendChild(this.tabsContainer);
			this.div.appendChild(this.projectsContainer);
			this.sPcontainer = document.createElement('div');
			this.sPcontainer.className = "survey_project_container";
			this.tPcontainer = document.createElement('div');
			this.tPcontainer.className = "tracker_project_container";
			this.cPcontainer = document.createElement('div');
			this.cPcontainer.className = "counters_project_container";	
			this.surveyProjecTabContents.appendChild(this.sPcontainer);
			this.trackerProjecTabContents.appendChild(this.tPcontainer);
			this.countersProjecTabContents.appendChild(this.cPcontainer);
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
				this.removeSurveyProject();
			}
			if (this.trackerProjectView != null) {
				var tPv = this.trackerProjectView.getTrackerProject();
				var tPm = this.pr.getTrackerProject();
				if(tPv != tPm){
					this.pr.setTrackerProject(tPv);
				}
			} else {
				this.removeTrackerProject();
			}
			if (this.countersProjectView != null) {
				var cPv = this.countersProjectView.getCountersProject();
				var cPm = this.pr.getCountersProject();
				if(cPv != cPm){
					this.pr.setCountersProject(cPv);
				}
			} else {
				this.removeCountersProject();
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
			} else {
				thatP.removeSurveyProject();
			}
			if (tP != null) {
				this.addTrackerProject(tP);
			} else {
				this.removeTrackerProject();
			}
			if (cP != null) {
				this.addCountersProject(cP);
			} else {
				this.removeCountersProject();
			}
		}
		this.addSurveyProject = function(sP) {
			this.sPTab.style.display = 'block';
			if (this.surveyProjectView == null) {
				this.surveyProjectView = new that.surveyProjectView(sP, thatP);
				thatP.sPcontainer.appendChild(this.surveyProjectView.getView());
				thatP.addSPB.changeLook("remove", "", "Survey");
			} else {
				this.surveyProjectView.updateContent(sP);
			}
		}
		this.addTrackerProject = function(tP) {
			this.tPTab.style.display = 'block';
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
			this.cPTab.style.display = 'block';
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
			this.sPTab.style.display = 'none';
			this.surveyProjectView = null;
			this.pr.setSurveyProject(null);
			thatP.sPcontainer.innerHTML = "";
			thatP.addSPB.changeLook("add", "", "Survey");
		}
		this.removeTrackerProject = function() {
			this.tPTab.style.display = 'none';
			this.trackerProjectView = null;
			this.pr.setTrackerProject(null);
			thatP.tPcontainer.innerHTML = "";
			thatP.addTPB.changeLook("add", "", "Tracker");
		}
		this.removeCountersProject = function() {
			this.cPTab.style.display = 'none';
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
		var thatSP = this;
		this.getSurveyProject = function(){
			return this.sP;
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "FT survey_project";
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
			} else {
				surv = new that.FS.survey();
			}
			// Here the FlockSON version is hardcoded!!!!!!!!!!!!!!!!!!!!!
			surv.setFlockSONversion(0.1);
			this.surveyView.updateContent(surv);
		}
		this.contentChanged = function() {
			if (this.tableIDInput.value != "") {
				this.sP.setTableID(this.tableIDInput.value);
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
		this.getTrackerProject = function(){
			return this.tP;
		}
		this.initializeView = function() {
			this.div = document.createElement('div');
			this.div.className = "FT tracker_project";
			this.trackerContainer = document.createElement('tracker');
			this.trackerContainer.className = "tracker_container";
			this.tracker = new that.FTPrM.tracker();
			this.trackerView = new that.trackerView(this.tracker, thatTP);
			this.trackerContainer.appendChild(this.trackerView.getView());
			this.div.appendChild(this.trackerContainer);
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
				thatTP.addSSB.changeLook("remove", "", "Start Survey");
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
			this.trackerView.updateContent(this.tP.getTracker());
			var tempSS = this.tP.getStartSurvey();
			if(tempSS != null){
				if(this.startSurveyView == null){
					this.addStartSurvey(tempSS);
				} else {
					this.startSurveyView.updateContent(tempSS);
				}
			}
			var tempES = this.tP.getEndSurvey();
			if(tempES != null){
				if(this.endSurveyView == null){
					this.addEndSurvey(tempES);
				} else {
					this.endSurveyView.updateContent(tempES);
				}
			}
		}
		this.contentChanged = function() {
			this.tP.setTracker(this.trackerView.getTracker());
			if (this.startSurveyView != null) {
				var sSv = this.startSurveyView.getSurveyProject();
				var sSm = this.tP.getStartSurvey();
				if(sSv != sSm){
					this.tP.setStartSurvey(sSv);
				}
			} else {
				this.tP.setStartSurvey(null);
			}
			if (this.endSurveyView != null) {
				var eSv = this.endSurveyView.getSurveyProject();
				var eSm = this.tP.getEndSurvey();
				if(eSv != eSm){
					this.tP.setEndSurvey(eSv);
				}
			} else {
				this.tP.setEndSurvey(null);
			}
			this.parentView.contentChanged();
		}
		this.getView = function() {
			return this.div;
		}
		this.parentView = parentView;
		this.tP = tP;
		var thatTP = this;
		this.startSurveyView = null;
		this.endSurveyView = null;
		this.trackerView = null;
		this.tracker = null;
		this.initializeView();
		this.updateContent(this.tP);	
	}

	this.countersProjectView = function(cP, parentView) {
		this.getCountersProject = function(){
			return this.cP;
		}
		this.initializeView = function() {
			this.div = document.createElement("div");
			this.div.className = "FT counters_project";
			this.tableIDInput = document.createElement("input");
			this.tableIDInput.type = "text";
			this.tableIDInput.className = "form-control"
			this.tableIDInput.placeholder = "Table ID"
			this.tableIDInput.oninput = function() {
				thatCPV.contentChanged();
			};
			this.div.appendChild(this.tableIDInput);
			this.addCounterButton = new that.FSUxEl.button("add", "",
			"Add counter");
			this.addCounterButton.getView().onclick = function() {
				thatCPV.addCounter(new that.FTPrM.counter());
				thatCPV.contentChanged();
			};
			this.countersArrayContainerDiV = document.createElement('div');
			this.countersArrayContainerDiV.className = "countersArrayContainerDiV";
			this.countersContainerDIV = document.createElement('div');
			this.countersContainerDIV.className = "countersContainerDIV";
			this.countersContainerDIV
			.appendChild(this.countersArrayContainerDiV);
			this.countersContainerDIV.appendChild(this.addCounterButton
			.getView());
			this.div.appendChild(this.countersContainerDIV);
		}
		this.updateContent = function(cP) {
			this.cP = cP;
			if (this.tableIDInput.value != this.cP.getTableID()) {
				this.tableIDInput.value = this.cP.getTableID();
			} 
			if (this.counters != this.cP.getCounters()) {
				this.counterViews = [];
				while (this.countersArrayContainerDiV.firstChild) {
					this.countersArrayContainerDiV
							.removeChild(this.countersArrayContainerDiV.firstChild);
				}
				this.counters = this.cP.getCounters();
				for (var i = 0; i < this.counters.length; i++) {
					this.addCounter(this.counters[i]);
				}
				;
			}
		}
		this.contentChanged = function() {
			if (this.tableIDInput.value != "") {
				this.cP.setTableID(this.tableIDInput.value);
			} else {
				this.cP.setTableID(null);
			}
			var changedCounters = [];
			for (i = 0; i < this.counterViews.length; i++) {
				changedCounters[i] = this.counterViews[i].getCounter();
			}
			this.cP.setCounters(changedCounters);
			this.parentView.contentChanged();
		}
		this.getView = function() {
			return this.div;
		}
		this.addCounter = function(counter){
			var counterContainerDIV = document.createElement('div');
			counterContainerDIV.className = "counterContainerDIV";
			var newCounterView = new that.counterView(counter, thatCPV);
			this.counterViews.push(newCounterView);
			var newCounterDIV = newCounterView.getView();
			var eraseCounterButton = new that.FSUxEl.button("remove", "",
					"Erase counter");
			counterContainerDIV.appendChild(eraseCounterButton.getView());
			counterContainerDIV.appendChild(newCounterDIV);
			this.countersArrayContainerDiV.appendChild(counterContainerDIV);
			eraseCounterButton.getView().onclick = function() {
				thatCPV.eraseCounter(counterContainerDIV);
			}
		}
		this.eraseCounter = function(counterDIV){
			var parentChilds = counterDIV.parentNode.childNodes;
			for (var i = 0; i < parentChilds.length; i++) {
				if (parentChilds[i] == counterDIV) {
					this.counterViews.splice(i, 1);
					break
				}
			}
			this.countersArrayContainerDiV.removeChild(counterDIV);
			this.contentChanged();
		}
		this.parentView = parentView;
		this.cP = cP;
		var thatCPV = this;
		this.addCounterButton = null;
		this.counterContainerDIV = null;
		this.counterArrayContainerDiV = null;
		this.counterViews = []; // Instances of counters
		this.initializeView();
		this.updateContent(this.cP);
	}

	this.trackerView = function(tr, parentView) {
		this.getTracker = function(){
			return this.tr;
		}
		this.initializeView = function() {
			this.div = document.createElement("div");
			this.div.className = "FT tracker";
			this.tableIDInput = document.createElement("input");
			this.tableIDInput.type = "text";
			this.tableIDInput.className = "form-control"
			this.tableIDInput.placeholder = "Table ID"
			this.tableIDInput.oninput = function() {
				thatTV.contentChanged();
			};
			this.div.appendChild(this.tableIDInput);
		}
		this.updateContent = function(tr) {
			this.tr = tr;
			if (this.tableIDInput.value != this.tr.getTableID()) {
				this.tableIDInput.value = this.tr.getTableID();
			} 
		}
		this.contentChanged = function() {
			if (this.tableIDInput.value != "") {
				this.tr.setTableID(this.tableIDInput.value);
			} else {
				this.tr.setTableID(null);
			}
			this.parentView.contentChanged();
		}
		this.getView = function() {
			return this.div;
		}
		this.parentView = parentView;
		this.tr = tr;
		this.tableIDInput = null;
		var thatTV = this;
		this.initializeView();
		this.updateContent(this.tr);
	}

	this.counterView = function(co, parentView) {
		this.getCounter = function(){
			return this.co;
		}
		this.initializeView = function() {
			this.div = document.createElement("div");
			this.div.className = "FT counter"
			this.nameInput = document.createElement("input");
			this.nameInput.type = "text";
			this.nameInput.className = "form-control"
			this.nameInput.placeholder = "Counter name"
			this.nameInput.oninput = function() {
				thatCV.contentChanged();
			};
			this.div.appendChild(this.nameInput);
			this.idInput = document.createElement("input");
			this.idInput.type = "text";
			this.idInput.className = "form-control"
			this.idInput.placeholder = "Counter ID"
			this.idInput.oninput = function() {
				thatCV.contentChanged();
			};
			this.div.appendChild(this.idInput);
		}
		this.updateContent = function(co) {
			this.co = co;
			if (this.nameInput.value != this.co.getName()) {
				this.nameInput.value = this.co.getName();
			} 
			if (this.idInput.value != this.co.getID()) {
				this.idInput.value = this.co.getID();
			} 
		}
		this.contentChanged = function() {
			if (this.nameInput.value != "") {
				this.co.setName(this.nameInput.value);
			} else {
				this.co.setName(null);
			}
			if (this.idInput.value != "") {
				this.co.setID(this.idInput.value);
			} else {
				this.co.setID(null);
			}
			this.parentView.contentChanged();
		}
		this.getView = function() {
			return this.div;
		}
		this.parentView = parentView;
		this.co = co;
		var thatCV = this;
		this.nameInput = null;
		this.idInput = null;
		this.initializeView();
		this.updateContent(this.co);
	}
}