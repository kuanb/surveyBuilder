// Here be the Views
// !!/!T(&"#("/!(/T#")(/!=)/"=)(!)(YEU!")/H)"(UWE=")!"(!=)(!=#)(=))))
FT_pb = function()
{
	this.projectView = function(pr, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}

	}
	
	this.surveyProjectView = function(sP, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}
		this.parentView = parentView;
		this.sP = sP;
	}
	
	this.trackerProjectView = function(tP, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}
		this.parentView = parentView;
		this.tP = tP;
	}
	
	this.countersProjectView = function(cP, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}
		this.parentView = parentView;
		this.cP = cP;
	}
	
	this.trackerView = function(tr, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}
		this.parentView = parentView;
		this.tr = tr;
	}
	
	this.counterView = function(co, parentView){
		this.initializeView = function(){

		}
		this.updateContent = function(pr){
			
		}
		this.contentChanged = function(){
			
		}
		this.getView = function(){
			
		}
		this.parentView = parentView;
		this.co = co;
	}
	
	this.OLDprojectView = function(pr, parentView)
	{
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