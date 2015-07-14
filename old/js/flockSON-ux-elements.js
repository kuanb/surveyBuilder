// Here we put the ux elements
// Only constructors to apply the bootstrap classes and to change the format quickly.
FS_ux_el = function() {
	this.button = function(kind, nodeClass, text) {
		this.kind = kind;
		this.nodeClass = nodeClass,
		this.text = text;
		var button = document.createElement("button");
		;
		this.changeLook = function(kind, nodeClass, text){
			if (kind == "add") {
				button.className = "btn btn-primary btn-sm" + " " + nodeClass;
				button.innerHTML = '<span class="glyphicon glyphicon-plus"></span> '
						+ text;
			} else if (kind == "remove") {
				button.className = "btn btn-danger btn-sm" + " " + nodeClass;
				button.innerHTML = '<span class="glyphicon glyphicon-remove"></span> '
						+ text;
			} else {
				button.className = "btn btn-default btn-sm" + " " + nodeClass;
				button.innerHTML = " " + text + "XX";
			}
		}
		this.changeLook(this.kind, this.nodeClass, this.text);
		this.getView = function(){
			return button;
		}
	}
	this.select = function(kind, nodeClass, dropdownTextArray, dropdownValueArray) {
		this.kind = kind;
		this.nodeClass = nodeClass;
		this.dropdownTextArray = dropdownTextArray;
		var select = document.createElement("select");
		select.className = "form-control" + " " + nodeClass;
		for (var i = 0; i < dropdownTextArray.length; i++) {
			option = document.createElement("option");
			option.value = dropdownValueArray[i];
			option.innerHTML = dropdownTextArray[i];
			select.appendChild(option);
		}
		return select;
	}
	this.checkbox = function(kind, labelText, nodeClass) {
		this.checkbox = document.createElement("input");
		this.checkbox.type = "checkbox";
		this.checkbox.className = "bootstrap-switch" + " " + nodeClass;
		this.addTo = function(div) {
			var that = this;
			div.appendChild(this.checkbox);
			$(this.checkbox).bootstrapSwitch("labelText", labelText);
		};
		this.removeFrom = function(div) {
			this.checkbox.name = "switch-to-remove";
			$(this.checkbox).bootstrapSwitch('destroy');
			this.checkbox.name = "";
			div.removeChild(this.checkbox);
		}
		this.isChecked = function() {
			return this.checkbox.checked;
		}
		this.getView = function() {
			return this.checkbox;
		}
		this.toggleState = function() {
			$(this.checkbox).bootstrapSwitch('toggleState');
		}
		this.setCheckedState = function(state) {
			if (this.checkbox.checked != state) {
				this.toggleState();
			}
		}
	}
}