//Order the data
jviz.modules.table.prototype.order = function(keys)
{
  //Check the keys argument
  if(typeof keys !== 'object'){ return this.exportOrder(); }

  //Check for array
  if(Array.isArray(keys) === false){ keys = [ keys ]; }

  //Reset the keys
  this._order.keys = {};

  //Reset the order keys length
  this._order.length = 0;

  //Clear the order
  this.clearOrder();

  //Read the full list
  for(var i = 0; i < keys.length; i++)
  {
    //Get the element
    var el = keys[i];

    //Check the key
    if(typeof el.key !== 'string'){ console.error('Undefined key on element ' + i); continue; }

    //Check the order
    if(typeof el.order !== 'string'){ console.error('Undefined order on element ' + i); continue; }

    //Add the new key
    this.addOrderKey(el.key, el.order);

    //Get the order value
    var value = this._order.keys[el.key].order;

    //Add the order class
    this.orderClass(el.key, this._order.available[value]);
  }

  //Check the order length
  if(this._order.length === 0){ return this; }

  //Reorder the data
  this.reorder();

  //Return this
  return this;
};

//Order again the data
jviz.modules.table.prototype.reorder = function()
{
  //Check the order length
  if(this._order.length === 0){ return this.clearOrder(); }

  //Get the keys to order
  var keys = this.exportOrder();

  //Get the data
  var data = this._data.src;

  //Get this
  var self = this;

  //Sort the order array
  this._data.order.sort(function(a, b)
  {
    //Return
    return self.orderCompare(a, b, keys, data);
  });

  //Send the event
  this._events.emit('order', keys);

  //Return this
  return this;
};

//Exports the order object
jviz.modules.table.prototype.exportOrder = function()
{
  //Initialize the list
  var list = [];

  //Read all the order keys
  for(var key in this._order.keys)
  {
    //Get the element
    var el = this._order.keys[key];

    //Add the element
    list[el.index] = { key: key, index: el.index, order: this._order.available[el.order] };
  }

  //Return the list
  return list;
};

//Add a new order element
jviz.modules.table.prototype.addOrderKey = function(key, order)
{
  //Check the order
  if(typeof order === 'undefined'){ var order = 'asc'; }

  //Parse the order value
  order = order.toLowerCase();

  //Get the order value
  var value = (this._order.available.indexOf(order) === -1) ? 0 : this._order.available.indexOf(order);

  //Add a new key to the list
  this._order.keys[key] = { order: value, index: this._order.length };

  //Increment the length
  this._order.length = this._order.length + 1;

  //Continue
  return this;
};

//Remove an order element
jviz.modules.table.prototype.removeOrderKey = function(key)
{
  //Get the index to remove
  var index = this._order.keys[key].index;

  //Remove 1 from the list
  this._order.length = this._order.length - 1;

  //Delete the element
  delete this._order.keys[key];

  //Check the length
  if(this._order.length === 0){ return this; }

  //Read all the keys
  for(var el in this._order.keys)
  {
    //Check the index
    if(this._order.keys[el].index < index){ continue; }

    //Decrement the index
    this._order.keys[el].index = this._order.keys[el].index - 1;
  }

  //Continue
  return this;
};

//Change the order key
jviz.modules.table.prototype.changeOrderKey = function(key, order)
{
  //Check the order value
  if(order >= this._order.available.length){ order = 0; }

  //Update the column class
  this.orderClass(key, this._order.available[order]);

  //Check the order
  if((order === this._order.available.length - 1) && typeof this._order.keys[key] !== 'undefined')
  {
    //Remove the key
    return this.removeOrderKey(key);
  }

  //Check the key
  if(typeof this._order.keys[key] === 'undefined')
  {
    //Add the new key
    return this.addOrderKey(key, order);
  }

  //Update the key
  this._order.keys[key].order = order;

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
  for(var i = 0; i < this._columns.src.length; i++)
  {
    //Get the column
    var el = this._columns.src[i];

    //Check the display
    if(el.display === false){ continue; }

    //Check the type
    if(el.type !== 'default'){ continue; }

    //Check for orderable
    if(el.orderable === false){ continue; }

    //Get the column head order id
    var col = this._head.cell.order.id + i;

    //Remove the asc class
    jviz.dom.class.remove(col, this._head.cell.order.asc);

    //Remove the desc class
    jviz.dom.class.remove(col, this._head.cell.order.desc);

    //Add the none class
    jviz.dom.class.add(col, this._head.cell.order.none);
  }

  //Reset the columns order
  this._order.keys = {};

  //Reset the order length
  this._order.length = 0;

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

//Add the order class to a column
jviz.modules.table.prototype.orderClass = function(key, order)
{
  //Check the order
  if(typeof order === 'undefined'){ var order = 'none'; }

  //Get the column
  var col_index = this.columnIndex(key);

  //Check for undefined column
  if(col_index === -1){ return this; }

  //Get the column element
  var col = this._columns.src[col_index];

  //Check the column
  if(col.display === false || col.orderable === false || col.type !== 'default'){ return this; }

  //Get the column head order ID
  var col_id = this._head.cell.order.id + col_index;

  //Check the none order
  (order === 'none') ? jviz.dom.class.add(col_id, this._head.cell.order.none) : jviz.dom.class.remove(col_id, this._head.cell.order.none);

  //Check the asc order
  (order === 'asc') ? jviz.dom.class.add(col_id, this._head.cell.order.asc) : jviz.dom.class.remove(col_id, this._head.cell.order.asc);

  //Check the desc order
  (order === 'desc') ? jviz.dom.class.add(col_id, this._head.cell.order.desc) : jviz.dom.class.remove(col_id, this._head.cell.order.desc);

  //Continue
  return this;
};

//Order event
jviz.modules.table.prototype.orderEvent = function(key, shift)
{
  //Check for empty order object
  if(this._order.length === 0)
  {
    //Add the order key
    this.addOrderKey(key, 'asc');
  }

  //Check for the same order column
  else if(this._order.length === 1 && typeof this._order.keys[key] !== 'undefined')
  {
    //Change the order
    this.changeOrderKey(key, this._order.keys[key].order + 1);
  }

  //Check for shift key pressed
  else if(shift === true)
  {
    //Add this key or update it
    (typeof this._order.keys[key] === 'undefined') ? this.addOrderKey(key, 'asc') : this.changeOrderKey(key, this._order.keys[key].order + 1);
  }
  else
  {
    //Check the new order
    var order2 = (typeof this._order.keys[key] === 'undefined') ? 0 : this._order.keys[key].order;

    //Remove all the order elements
    this.clearOrder();

    //Add the new order key
    this.addOrderKey(key, this._order.available[order2]);
  }

  //Get the actual order
  var order = (typeof this._order.keys[key] === 'undefined') ? this._order.available.length - 1 : this._order.keys[key].order;

  //Update the order class
  this.orderClass(key, this._order.available[order]);

  //Reorder the data
  this.reorder();

  //Draw the data
  this.draw();
};

//Function for compare two elements
jviz.modules.table.prototype.orderCompare = function(left, right, keys, data)
{
  //Compare all keys
  for(var i = 0; i < keys.length; i++)
  {
    //Get the key
    var key = keys[i].key;

    //Get the order
    var order = keys[i].order;

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
