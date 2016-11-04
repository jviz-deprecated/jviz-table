//Display the data
jviz.modules.table.prototype.data = function(data)
{
  //Check for undefined data
  if(typeof data === 'undefined'){ return this._data.src; }

  //Check for array
  if(jviz.is.array(data) === false){ data = [ data ]; }

  //Save the data count
  this._data.length = data.length;

  //Add the data index
  this._data.src = data.map(function(el, index)
  {
    //Add the index
    el._index = index;

    //Return the element
    return el;
  });

  //Reset the filter
  this.clearFilter();

  //Reset the order
  this.clearOrder();

  //Reset the row class
  this.clearClass();

  //Reset the checkboxes
  this.clearCheck();

  //Return this
  return this;
};
