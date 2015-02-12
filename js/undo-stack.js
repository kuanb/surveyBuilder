function undoStack(){
	this.UStack = [];
	this.stackIndex;
	this.updateCall;
	this.stackElement = function(view, object){
		this.view = view;
		this.object = object;
	}
	this.addToStack = function(stacKElement){
		this.cleanForwardStack(this.stackIndex);
		this.UStack.push(stackElement);
		this.stackIndex = this.UStack.length;
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
}