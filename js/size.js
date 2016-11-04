//Set the table height
jviz.modules.table.prototype.height = function(value)
{
  //Check the value
  if(typeof value === 'undefined'){ return this._height; }

  //Check for a correct size
  if(value === -1){ return this; }

  //Set the height
  //this._height = vale.toString().replace('px', '').trim();

  //Parse the height
  //this._height = parseInt(this._height);

  //Save the height
  this._height = value;

  //Apply the table height
  $('#' + this._id).height(this._height);

  //Return this
  return this;
};
