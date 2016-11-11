//Check a row
jviz.modules.table.prototype.check = function(index, emit_event)
{
  //Check the emit event
  if(typeof emit_event === 'undefined'){ var emit_event = true; }

  //Update the check list
  this._data.check[index] = true;

  //Check if this checkbox exists
  if(typeof this._check.el[index] !== 'undefined')
  {
    //Check this element
    this._check.el[index].checked(true);
  }

  //Check if all checkboxes are active
  if(jviz.array.has(this._data.check, false) === false)
  {
    //Set all checkboxes as true
    this._check.all = true;

    //Check the head checkbox
    this.headCheck();
  }

  //Update the page info
  this.info();

  //Check to emit the event
  if(emit_event === false){ return; }

  //Emit the check event
  this._events.emit('check:row', this._data.src[index], index);
};

//Check all rows
jviz.modules.table.prototype.checkAll = function(emit_event)
{
  //Check the emit event
  if(typeof emit_event === 'undefined'){ var emit_event = true; }

  //Read the full list
  for(var i = 0; i < this._data.check.length; i++)
  {
    //Check for active
    if(this._data.check[i] === true){ continue; }

    //Active this element
    this._data.check[i] = true;

    //Check the checkbox
    if(typeof this._check.el[i] === 'undefined'){ continue; }

    //Check this checkbox
    this._check.el[i].checked(true);
  }

  //Set all checked as true
  this._check.all = true;

  //Check the head checkbox
  this.headCheck();

  //Update the page info
  this.info();

  //Check for emit the event
  if(emit_event === false){ return; }

  //Emit the check all event
  this._events.emit('check:all');
};

//Uncheck a row
jviz.modules.table.prototype.uncheck = function(index, emit_event)
{
  //Check the emit event
  if(typeof emit_event === 'undefined'){ var emit_event = true; }

  //Update the check list
  this._data.check[index] = false;

  //Check if this checkbox exists
  if(typeof this._check.el[index] !== 'undefined')
  {
    //Check this element
    this._check.el[index].checked(false);
  }

  //Check the checked all
  if(this._check.all === true)
  {
    //Set the flag as false
    this._check.all = false;

    //Uncheck the head checkbox
    this.headUncheck();
  }

  //Update the page info
  this.info();

  //Check the emit emit value
  if(emit_event === false){ return; }

  //Emit the uncheck event
  this._events.emit('uncheck:row', this._data.src[index], index);
};

//Uncheck all rows
jviz.modules.table.prototype.uncheckAll = function(emit_event)
{
  //Check the emit event
  if(typeof emit_event === 'undefined'){ var emit_event = true; }

  //Read the full list
  for(var i = 0; i < this._data.check.length; i++)
  {
    //Check for inactive
    if(this._data.check[i] === false){ continue; }

    //Uncheck this element
    this._data.check[i] = false;

    //Check the checkbox
    if(typeof this._check.el[i] === 'undefined'){ continue; }

    //Uncheck this checkbox
    this._check.el[i].checked(false);
  }

  //Set all checked as false
  this._check.all = false;

  //Unheck the head checkbox
  this.headUncheck();

  //Update the page info
  this.info();

  //Check for emit the event
  if(emit_event === false){ return; }

  //Emit the uncheck all event
  this._events.emit('uncheck:all');
};

//Get the checked rows
jviz.modules.table.prototype.checked = function()
{
  //Initialize the checked list
  var list = [];

  //Read all the data
  for(var i = 0; i < this._data.src.length; i++)
  {
    //Check if is checked
    if(this._data.check[i] === false){ continue; }

    //Get the row
    var row = this._data.src[i];

    //Save the row
    list.push(row);
  }

  //Return the list
  return list;
};

//Count the number of checked rows
jviz.modules.table.prototype.countChecked = function()
{
  //Count the number of checked rows
  return jviz.array.count(this._data.check, true);
};

//Clear all checks
jviz.modules.table.prototype.clearCheck = function()
{
  //Remove all checks
  this._data.check = jviz.array.create(this._data.src.length, false);
};

//Check event
jviz.modules.table.prototype.checkEvent = function(index)
{
  //Save this
  var self = this;

  //Get the checkbox element
  var el = this._check.el[index];

  //Add the change event
  el.on('change', function()
  {
    //Get the actual status
    var status = el.checked();

    //Check or uncheck the checkbox
    (status === true) ? self.check(index, true) : self.uncheck(index, true);
  });
};
