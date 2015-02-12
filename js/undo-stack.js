function undoStack(){
	this.UStack = [];
	this.stackIndex = -1	;
	this.updateCall;
	this.addToStack = function(sElement){
		console.log("before adding length" + this.UStack.length + " index " + this.stackIndex);
		this.cleanForwardStack(this.stackIndex);
		this.UStack.push(sElement);
		this.stackIndex = this.UStack.length -1;
		console.log("after adding lenght" + this.UStack.length + " index " + this.stackIndex);
	}
	this.cleanForwardStack = function(index){
		console.log("cleaning" + index);
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
		console.log("undo lenght " + this.UStack.length + " index " + this.stackIndex);
		return this.UStack[this.stackIndex];
	}
	this.redo = function(){
		this.stackIndex++;
		return this.UStack[this.stackIndex];
	}
	this.isRedoPossible = function(){
		if(this.stackIndex < this.UStack.length){
			return true
		} else {
			return false
		}
	}
	this.isUndoPossible = function(){
		console.log("is possible lenght " + this.UStack.length + " index " + this.stackIndex);
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