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
  this._columns.length = 0; //Visible columns length

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

  //Entries fir each page
  this._entries = {};
  this._entries.actual = 10; //Actual number of entries
  this._entries.available = [ 10, 25, 50, 100 ]; //Available number of entries

  //Page object
  this._page = {};
  this._page.id = this._id + '-page'; //Page container ID
  this._page.class = this._class + '-page'; //Page container class
  this._page.start = 1; //Start page
  this._page.end = 1; //End page
  this._page.actual = 1; //Actual page
  this._page.step = 1; //Page step

  //Page buttons
  this._page.btn = {};
  this._page.btn.id = this._page.id + '-btn'; //Page button ID
  this._page.btn.class = this._page.class + '-btn'; //Page button class

  //Page button previous
  this._page.btn.prev = {};
  this._page.btn.prev.id = this._page.btn.id + '-prev'; //Page button previous ID
  this._page.btn.prev.class = this._page.btn.class; //Page button previous Class
  this._page.btn.prev.text = 'Prev'; //Page button previous text

  //Page button next
  this._page.btn.next = {};
  this._page.btn.next.id = this._page.btn.id + '-next'; //Page button next ID
  this._page.btn.next.class = this._page.btn.class; //Page button next class
  this._page.btn.next.text = 'Next'; //Page button next text

  //Page entries
  this._page.entries = {};
  this._page.entries.id = this._page.id + '-entries'; //Page entries ID
  this._page.entries.class = this._page.class + '-entries'; //Page entries class
  this._page.entries.text = 'Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b> entries'; //Page entries text

  //Counter page
  this._page.counter = {};
  this._page.counter.id = this._page.id + '-counter'; //Counter page ID
  this._page.counter.class = this._page.class + '-counter'; //Counter page class

  //Counter page labels
  this._page.counter.label = {};
  this._page.counter.label.id = this._page.counter.id + '-label'; //Counter page label ID
  this._page.counter.label.page = { id: this._page.counter.label.id + '-', text: 'Page' }; //Label page object
  this._page.counter.label.total = { id: this._page.counter.label.id + '-total', text: 'of {pages}' }; //Pabel total object

  //Counter page select
  this._page.counter.input = {};
  this._page.counter.input.id = this._page.counter.id + '-input'; //Input page ID
  this._page.counter.input.class = this._page.counter.class + '-input'; //Input page class

  //Build the events
  this._events = new jviz.commons.events();

  //Build the table
  this.build();

  //Parse and build the columns
  this.columns(this._columns.src);

  //Get the data
  //if(typeof this._data.ajax.url === 'string'){ return this.ajax(); }

  //Parse the data
  this.data(this._data.src);

  //Draw the data
  //return this.draw();

  //Return this
  return this;
};

//Register an event
jviz.modules.table.prototype.on = function(name, listener){ return this._events.add(name, listener); };
