//Table module
jviz.modules.table = function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ return console.error('jviz-table: undefined table options. Check the documentation.'); }

  //Check the table id
  this._id = (typeof opt.id === 'undefined') ? jviz.misc.getID({ prefix: 'jviz-table' }) : opt.id;

  //Check the table class
  this._class = (typeof opt.class === 'undefined') ? 'jviz-modules-table' : opt.class;

  //Check the parent div
  this._parent = (typeof opt.parent === 'undefined') ? 'body' : opt.parent;

  //Save the table height
  this._height = (typeof opt.height === 'undefined') ? -1 : opt.height;

  //Data object
  this._data = {};
  this._data.src = (typeof opt.data === 'undefined') ? [] : opt.data; //Source data
  this._data.ajax = (typeof opt.ajax === 'undefined') ? {} : opt.ajax; //Ajax data
  this._data.length = 0;
  this._data.order = []; //Order data
  this._data.filter = []; //Filtered data
  this._data.class = []; //Data class
  this._data.check = []; //Data checked

  //Columns
  this._columns = {};
  this._columns.src = (typeof opt.columns === 'undefined') ? [] : opt.columns;
  this._columns.order = []; //Columns order
  //this._columns.order = { key: '', order: '', active: false }; //Columns order
  this._columns.type = [ 'default', 'checkbox', 'button', 'image' ]; //Columns type

  //Draw info
  this._draw = {};
  this._draw.start = -1; //Draw start position
  this._draw.end = -1; //Draw end position
  this._draw.rows = []; //Rows active

  //Table
  this._table = {};
  this._table.id = this._id + '-table'; //Table ID
  this._table.class = this._class + '-table'; //Table class

  //Table head
  this._head = {};
  this._head.id = this._id + '-head'; //Table head id
  this._head.class = this._class + '-head'; //Table head class

  //Head row
  this._head.row = {};
  this._head.row.id = this._head.id + '-row'; //Table head row id
  this._head.row.class = this._head.class + '-row'; //Table head row class

  //Head cell
  this._head.cell = {};
  this._head.cell.id = this._head.id + '-cell'; //Table head cell id
  this._head.cell.class = this._head.class + '-cell'; //Table head cell class

  //Orderable head cell
  this._head.cell.orderable = {};
  this._head.cell.orderable.class = this._head.cell.class + '-orderable'; //Orderable class
  this._head.cell.orderable.none = this._head.cell.orderable.class + '-none'; //Orderable none class
  this._head.cell.orderable.asc = this._head.cell.orderable.class + '-asc'; //Orderable asc class
  this._head.cell.orderable.desc = this._head.cell.orderable.class + '-desc'; //Orderable desc class

  //Head check
  this._head.cell.check = {};
  this._head.cell.check.id = this._head.cell.id + '-check'; //Check head ID
  this._head.cell.check.class = this._head.cell.class + '-check'; //Check head class

  //Table body
  this._body = {};
  this._body.id = this._id + '-body'; //Table body id
  this._body.class = this._class + '-body'; //Table body class

  //Body row
  this._body.row = {};
  this._body.row.id = this._body.id + '-row'; //Table body row id
  this._body.row.class = this._body.class + '-row'; //Table body row class

  //Body cell
  this._body.cell = {};
  this._body.cell.id = this._body.id + '-cell'; //Table body cell id
  this._body.cell.class = this._body.class + '-cell'; //Table body cell class

  //Body check cell
  this._body.cell.check = {};
  this._body.cell.check.id = this._body.cell.id + '-check'; //Body check cell ID
  this._body.cell.check.class = this._body.cell.class + '-check'; //Body check cell class

  //Check rows
  this._check = {};
  this._check.class = this._class + '-checkbox'; //Checkbox class
  this._check.enabled = false; //Check rows is enabled
  this._check.all = false; //All checkboxes are checked
  this._check.head = null; //Head checkbox element
  this._check.el = [];

  //Build the events
  this._events = new jviz.commons.events();

  //Build the table
  this.build();

  //Return this
  return this;
};

//Register an event
jviz.modules.table.prototype.on = function(name, listener){ return this._events.add(name, listener); };
