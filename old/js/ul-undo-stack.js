function undoStack(){
	this.UStack = [];
	this.stackIndex = -1	;
	this.updateCall;
	this.addToStack = function(sElement){
		this.cleanForwardStack(this.stackIndex);
		this.UStack.push(sElement);
		this.stackIndex = this.UStack.length -1;
	}
	this.cleanForwardStack = function(index){
		for (var i = index + 1; i < this.UStack.length; i++) {
			this.eraseFromStack(i);
		};
	}
	this.eraseFromStack = function(index){
		if (index > -1) {
    		this.UStack.splice(index, 1);
		}
	}
	this.undo = function(){
		this.stackIndex--;
		return this.UStack[this.stackIndex];
	}
	this.redo = function(){
		this.stackIndex++;
		return this.UStack[this.stackIndex];
	}
	this.isRedoPossible = function(){
		if(this.stackIndex < this.UStack.length - 1){
			return true
		} else {
			return false
		}
	}
	this.isUndoPossible = function(){
		if((this.UStack.length > 1) && (this.stackIndex > 0)){
			return true
		} else {
			return false
		}		
	}
}
function stackElement(view, objectState){
		this.view = view;
		this.objectState = objectState;
	}