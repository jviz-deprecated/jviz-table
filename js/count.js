//Get the total number of rows
jviz.modules.table.prototype.count = function()
{
  //Return the original length
  return this._data.src.length;
};

//Count the actual number of rows
jviz.modules.table.prototype.countRows = function()
{
  //Return the actual length
  return this._data.length;
};

//Count the number of checked rows
jviz.modules.table.prototype.countChecked = function()
{
  //Initialize the counter
  var counter = 0;

  //Read all the data
  for(var i = 0; i < this._data.src.length; i++)
  {
    //Check if is checked
    if(this._data.check[i] === false){ continue; }

    //Increment the counter
    counter = counter + 1;
  }

  //Return the counter
  return counter;
};
