//Parse the columns
jviz.modules.table.prototype.columns = function(list)
{
  //Check the columns list
  if(typeof list === 'undefined'){ return this._columns.src; }

  //Append the head row
  jviz.dom.html(this._head.id, { id: this._head.row.id, class: this._head.row.class });

  //Save the list
  this._columns.src = this.parseColumns(list);

  //Reset the checkboxes enabled
  this._check.enabled = false;

  //Check the size
  if(this._columns.src.length === 0){ return this; }

  //Read all the columns
  for(var i = 0; i < this._columns.src.length; i++)
  {
    //Get the cell
    var cell = this._columns.src[i];

    //Check for display
    if(cell.display === false){ continue; }

    //Get the cell id
    var cell_id = this._head.cell.id + i;

    //Get the cell class
    var cell_class = this._head.cell.class;

    //Add the cell
    jviz.dom.append(this._head.row.id, { id: cell_id, class: cell_class });

    //Check for checkbox column
    if(cell.type === 'checkbox')
    {
      //Set enabled
      this._check.enabled = true;

      //Add the check cell class
      jviz.dom.class.add(cell_id, this._head.cell.check.class);

      //Create the checkbox
      this._check.head = new jviz.components.checkbox({ parent: cell_id, class: this._check.class });

      //Continue
      continue;
    }

    //Check for orderable cell
    if(cell.orderable === true)
    {
      //Add the base class
      jviz.dom.class.add(cell_id, this._head.cell.orderable.class);

      //Add the actual order class
      this.orderClass(i);
    }

    //Default, add the cell title
    jviz.dom.html(cell_id, cell.title);
  }

  //Save this
  var self = this;

  //Add all the events
  this._columns.src.forEach(function(cell, index)
  {
    //Check for checkbox column
    if(cell.type === 'checkbox'){ return true; }

    //Check for display
    if(cell.display === false){ return true; }

    //Get the cell ID
    var id = self._head.cell.id + index;

    //Check for orderable
    if(cell.orderable === true)
    {
      //Add the order change event
      jviz.dom.on(id, 'click', function(){ return self.orderChange(index); });

      //Continue
      return true;
    }

    //Add the event for this column
    jviz.dom.on(id, 'click', function(){ return self.columnsClick(index); });

    //Continue
    return true;
  });

  //Set the checkbox event
  if(this._check.enabled === true)
  {
    //Add the checkbox head event
    this.headCheckEvent();
  }

  //Return this
  return this;
};

//Column head click
jviz.modules.table.prototype.columnsClick = function(index)
{
  //Show in console
  console.log('Clicked on head. Column ' + index);

  //Send the event
  this._events.emit('click:head', this._columns.src[index], index);
};

//Parse a columns list
jviz.modules.table.prototype.parseColumns = function(list)
{
  //Check the list
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Output list
  var out = [];

  //Flags
  var has_checkbox = false;

  //Read all the columns
  for(var i = 0; i < list.length; i++)
  {
    //Get the list element
    var el = list[i];

    //Check the column type
    if(typeof el.type === 'undefined'){ el.type = 'default'; }

    //Check the column type value
    if(this._columns.type.indexOf(el.type) === -1){ el.type = 'default'; }

    //Check for checkbox
    if(el.type === 'checkbox' && has_checkbox === true){ console.error('Only one checkbox column is allowed'); continue; }

    //Check for checkbox
    if(el.type === 'checkbox')
    {
      //Check the all property
      if(typeof el.all !== 'boolean'){ el.all = true; }

      //Set that has checkbox
      has_checkbox = true;
    }

    //Check the key
    if(typeof el.key === 'undefined'){ el.key = ''; }

    //Check the title
    if(typeof el.title === 'undefined'){ el.title = el.key; }

    //Check the display
    if(typeof el.display === 'undefined'){ el.display = true; }

    //Check the orderable attribute
    if(typeof el.orderable === 'undefined'){ el.orderable = false; }

    //Check the column parse function
    if(typeof el.parse === 'undefined'){  }

    //Save the list element
    out.push(el);
  }

  //Return the parsed list
  return out;
};

//Get column index by key
jviz.modules.table.prototype.columnIndex = function(key)
{
  //Read all the columns
  for(var i = 0; i < this._columns.src.length; i++)
  {
    //Check the column
    if(this._columns.src[i].key === key){ return i; }
  }

  //Return not found
  return -1;
};

//Get the column key
jviz.modules.table.prototype.columnKey = function(index)
{
  //Return the column key
  return this._columns.src[index].key;
};
