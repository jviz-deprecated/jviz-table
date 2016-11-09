//Get the selected rows data
jviz.modules.table.prototype.rows = function(sel)
{
  //Check the selection
  if(typeof sel === 'undefined'){ return this._data.src; }

  //Check for array
  if(jviz.is.array(sel) === false){ sel = [ sel ]; }

  //New array
  var out = [];

  //Read all the selected indexes
  for(var i = 0; i < sel.length; i++)
  {
    //Get the data index
    var index = parseInt(sel[i]);

    //Check for negative index
    if(index < 0){ continue; }

    //Check the data length
    if(index >= this._data.src.length){ continue; }

    //Save the row info
    out.push(this._data.src[index]);
  }

  //Return the selected rows
  return out;
};

//Add the row event
jviz.modules.table.prototype.rowsEvent = function(index)
{
  //Save this
  var self = this;

  //Read all the columns
  this._columns.src.forEach(function(col, col_id)
  {
    //Check the column visible option
    if(col.visible === false){ return true; }

    //Check for checkbox
    if(col.type === 'checkbox'){ return true; }

    //Get the column id
    var id = self._body.cell.id + index + '_' + col_id;

    //Add the column event
    jviz.dom.event(id, 'click', function(e){ return self.rowsClick(index, col_id); });
  });

  //Add the row event
  //$('#' + rows[i].id).on('click', function(e){ return self.onClickRow(rows[i].index); });
};

//Row click
jviz.modules.table.prototype.rowsClick = function(index_row, index_cell)
{
  //Show in console
  console.log('Clicked on row ' + index_row + ' and cell ' + index_cell);

  //Call the event listener
  this._events.emit('click:row', this._data.src[index_row], this._columns.src[index_cell].key, index_row, index_cell);
};
