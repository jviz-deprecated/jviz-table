//Parse the columns
jviz.modules.table.prototype.columns = function(list)
{
  //Check the columns list
  if(typeof list === 'undefined'){ return this._columns.src; }

  //Save the list
  this._columns.src = this.parseColumns(list);

  //Reset the columns length
  this._columns.length = 0;

  //Reset the checkboxes enabled
  this._check.enabled = false;

  //Reset the columns
  this.resetColumns();

  //Check the size
  if(this._columns.src.length === 0){ return this; }

  //Draw the columns
  this.drawColumns();

  //Return this
  return this;
};

//Reset the columns
jviz.modules.table.prototype.resetColumns = function()
{
  //Append the head row
  jviz.dom.html(this._head.id, { id: this._head.row.id, class: this._head.row.class });

  //Return this
  return this;
}

//Draw the columns
jviz.modules.table.prototype.drawColumns = function()
{
  //Reset the columns
  this.resetColumns();

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

    //Increment the columns counter
    this._columns.length = this._columns.length + 1;

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

    //Get the cell title ID
    var title_id = this._head.cell.title.id + i;

    //Get the cell title class
    var title_class = this._head.cell.title.class;

    //Build the cell title
    jviz.dom.append(cell_id, { id: title_id, class: title_class, _html: cell.title });

    //Check for orderable cell
    if(cell.orderable === false){ continue; }

    //Get the order element ID
    var order_id = this._head.cell.order.id + i;

    //Get the order element class
    var order_class = this._head.cell.order.class;

    //Add the order box
    jviz.dom.append(cell_id, { id: order_id, class: order_class });

    //Add the actual order class
    this.orderClass(cell.key);
  }

  //Save this
  var self = this;

  //Add all the events
  this._columns.src.forEach(function(cell, index)
  {
    //Check for checkbox column
    if(cell.type === 'checkbox'){ return true; }

    //Check for visible column
    if(cell.display === false){ return true; }

    //Get the cell title ID
    var title_id = self._head.cell.title.id + index;

    //Add the event for this column
    jviz.dom.on(title_id, 'click', function(e){ return self.clickColumns(index, e.shiftKey); });

    //Check for orderable
    if(cell.orderable === false){ return true; }

    //Get the cell order ID
    var order_id = self._head.cell.order.id + index;

    //Add the order change event
    jviz.dom.on(order_id, 'click', function(e){ return self.orderEvent(cell.key, e.shiftKey); });

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
jviz.modules.table.prototype.clickColumns = function(index, shift)
{
  //Show in console
  console.log('Clicked on head. Column ' + index);

  //Send the event
  this._events.emit('click:head', this._columns.src[index], index, shift);
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

    //Check the visible option
    if(typeof el.visible === 'undefined'){ el.visible = true; } 

    //Check the display
    if(typeof el.display !== 'undefined'){ el.visible = el.display; }

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
