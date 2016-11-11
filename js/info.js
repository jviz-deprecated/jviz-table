//Build the info element
jviz.modules.table.prototype.infoBuild = function()
{
  //Add the info div element
  jviz.dom.append(this._control.id, { id: this._info.is, class: this._info.class });

  //Add the showing element
  jviz.dom.append(this._info.id, { id: this._info.showing.id, class: this._info.showing.class });

  //Add the total element
  jviz.dom.append(this._info.id, { id: this._info.total.id, class: this._info.total.class });

  //Add the checked element
  jviz.dom.append(this._info.id, { id: this._info.checked.id, class: this._info.checked.class });

  //Check if the showing element is visible
  if(this._info.showing.visible === false){ jviz.dom.hide(this._info.showing.id); }

  //Check if the total element is visible
  if(this._info.total.visible === false){ jviz.dom.hide(this._info.total.id); }

  //Check if the checked element is visible
  if(this._info.checked.visible === false){ jviz.dom.hide(this._info.checked.id); }

  //Return this
  return this;
};
