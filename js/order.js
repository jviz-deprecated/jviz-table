//Order the data
jviz.modules.table.prototype.order = function(columns)
{
  //Check the columns argument
  if(typeof columns !== 'object'){ return this._columns.order; }

  //Check for array
  if(Array.isArray(columns) === false){ columns = [ columns ]; }

  //Parse the columns order
  columns = this.parseOrder(columns);

  //Clear the order
  this.clearOrder();

  //Check the columns length
  if(columns.length === 0){ return this; }

  //Check the order array
  if(this._data.order.length === 0)
  {
    //Clear the order
    //this.clearOrder();

    //Reset the order array
    this.resetOrder();
  }

  //Get the data
  var data = this._data.src;

  //Get this
  var self = this;

  //Sort the order array
  this._data.order.sort(function(a, b)
  {
    //Return
    return self.orderCompare(a, b, columns, data);
  });

  //Send the event
  this._events.emit('order', columns);

  //Save the columns ordered
  this._columns.order = columns;

  //Return this
  return this;
};

//Clear the order
jviz.modules.table.prototype.clearOrder = function()
{
  //Clear the order array
  //this._data.order = Array.apply(null, Array(this._data.src.length)).map(function(v, i){ return i; });
  this.resetOrder();

  //Read all the columns
  for(var i = 0; i < this._columns.order.length; i++)
  {
    //Get the element
    var el = this._columns.order[i];

    //Check the index
    if(el.index === -1){ continue; }

    //Get the column
    var col = this._columns.src[el.index];

    //Check the display
    if(col.display === false){ continue; }

    //Check the type
    if(col.type !== 'default'){ continue; }

    //Check for orderable
    if(col.orderable === false){ continue; }

    //Get the column head id
    var col_id = this._head.cell.id + el.index;

    //Remove the asc class
    jviz.dom.class.remove(col_id, this._head.cell.orderable.asc);

    //Remove the desc class
    jviz.dom.class.remove(col_id, this._head.cell.orderable.desc);

    //Add the none class
    jviz.dom.class.add(col_id, this._head.cell.orderable.none);
  }

  //Reset the columns order
  this._columns.order = [];

  //Return this
  return this;
};

//Reset the order
jviz.modules.table.prototype.resetOrder = function()
{
  //Reset the order
  this._data.order = this._data.filter.concat([]);

  //Continue
  return this;
};

//Change the order of a column
jviz.modules.table.prototype.orderChange = function(index)
{
  //Initialize the order index
  var col = -1;

  //Find the column
  for(var i = 0; i < this._columns.order.length; i++)
  {
    //Check the order column index
    if(this._columns.order[i].index !== index){ continue; }

    //Save the order column index
    col = i;

    //Exit
    break;
  }

  //Check the order index
  if(col === -1)
  {
    //Reset the orders
    this.clearOrder();

    //Add the new column
    this._columns.order.push({ key: this.columnKey(index), order: 'asc', index: index });
  }
  else
  {
    //Update the key
    this._columns.order[col].order = (this._columns.order[col].order === 'asc') ? 'desc' : 'asc';
  }

  //Order the table
  this.order(this._columns.order).draw({ start: this._draw.start, end: this._draw.end });

  //Apply the order class
  this.orderClass(index);

  //Exit
  return this;
};

//Add the order class to a column
jviz.modules.table.prototype.orderClass = function(index)
{
  //Check if column is visible
  if(this._columns.src[index].display === false){ return this; }

  //Check if column is orderable
  if(this._columns.src[index].orderable === false){ return this; }

  //Check if column is a checkbox
  if(this._columns.src[index].type !== 'default'){ return this; }

  //Get the column head index
  var col_id = this._head.cell.id + index;

  //Remove the none class
  jviz.dom.class.remove(col_id, this._head.cell.orderable.none);

  //Remove the asc class
  jviz.dom.class.remove(col_id, this._head.cell.orderable.asc);

  //Remove the desc order
  jviz.dom.class.remove(col_id, this._head.cell.orderable.desc);

  //Initialize the none order class
  var col_class = this._head.cell.orderable.none;

  //Find the column
  for(var i = 0; i < this._columns.order.length; i++)
  {
    //Get the column
    var col = this._columns.order[i];

    //Check the column index
    if(col.index !== index){ continue; }

    //Get the class
    col_class = (col.order === 'desc') ? this._head.cell.orderable.desc : this._head.cell.orderable.asc;

    //Exit
    break;
  }

  //Add the none order
  jviz.dom.class.add(col_id, col_class);

  //Continue
  return this;
};

//Parse the order list
jviz.modules.table.prototype.parseOrder = function(list)
{
  //Save this
  var self = this;

  //Parse the list
  list = list.filter(function(el, index)
  {
    //Check the key
    if(typeof el.key !== 'string'){ console.error('Undefined key on element ' + index); return false; }

    //Check the order
    if(typeof el.order !== 'string'){ console.error('Undefined order on element ' + index); return false; }

    //Check the column index
    if(typeof el.index === 'undefined'){ el.index = self.columnIndex(el.key); }

    //Parse the order value
    el.order = el.order.toLowerCase();

    //Check the order value
    if(['asc', 'desc'].indexOf(el.order) === -1){ el.order = 'asc'; }

    //Return true
    return true;
  });

  //Return the list
  return list;
};

//Function for compare two elements
jviz.modules.table.prototype.orderCompare = function(left, right, columns, data)
{
  //Compare all
  //for(var key in columns)
  for(var i = 0; i < columns.length; i++)
  {
    //Get the key
    var key = columns[i].key;

    //Get the order
    //var order = columns[key].toLowerCase();
    var order = columns[i].order;

    //Check if que difference is numeric
    var numeric = !isNaN(+data[left][key] - +data[right][key]);

    //Get the values
    var a = (numeric === true) ? +data[left][key] : data[left][key].toLowerCase();
    var b = (numeric === true) ? +data[right][key] : data[right][key].toLowerCase();

    //Check the values
    if(a < b)
    {
      //Check the order
      return (order === 'desc') ? 1 : -1;
    }
    else if(a > b)
    {
      //Check the order
      return (order === 'desc') ? -1 : 1;
    }
  }

  //Default, return 0
  return 0;
};
