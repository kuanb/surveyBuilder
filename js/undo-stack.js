function undoStack(){
	this.UStack = [];
	this.stackIndex;
	this.updateCall;
	this.addToStack = function(sElement){
		this.cleanForwardStack(this.stackIndex);
		this.UStack.push(sElement);
		this.stackIndex = this.UStack.length -1;
		//console.log(this.UStack.length);
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
		this.stackIndex--
		//console.log(this.UStack.length);
		return this.UStack[this.stackIndex];
	}
	this.redo = function(){
		this.stacKIndex++
		return this.UStack[this.stacKIndex];
	}
	this.isRedoPossible = function(){
		if(this.stacKIndex < this.UStack.length){
			return true
		} else {
			return false
		}
	}
	this.isUndoPossible = function(){
		if(this.stacKIndex < this.UStack.length){
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