//Build the table
jviz.modules.table.prototype.build = function()
{
  //Append the table container
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Append the table
  jviz.dom.append(this._id, { id: this._table.id, class: this._table.class });

  //Append the table head
  jviz.dom.append(this._table.id, { id: this._head.id, class: this._head.class });

  //Append the table body
  jviz.dom.append(this._table.id, { id: this._body.id, class: this._body.class });

  //Set the table height
  this.height(this._height);

  //Continue
  return this;
};
