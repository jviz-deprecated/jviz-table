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

  //Table main
  this._main = {};
  this._main.id = this._id + '-main'; //Table main ID
  this._main.class = this._class + '-main'; //Table main class

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
  this._columns.order = {}; //Columns order
  this._columns.type = [ 'default', 'checkbox', 'button', 'image' ]; //Columns type
  this._columns.length = 0; //Visible columns length

  //Order
  this._order = {};
  this._order.keys = {}; //Order keys
  this._order.length = 0; //Order length
  this._order.available = [ 'asc', 'desc', 'none' ]; //Available orders

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

  //Head title
  this._head.cell.title = {};
  this._head.cell.title.id = this._head.cell.id + '-title'; //Head cell title id
  this._head.cell.title.class = this._head.cell.class + '-title'; //Head cell title class

  //Orderable head cell
  this._head.cell.order = {};
  this._head.cell.order.id = this._head.cell.id + '-order'; //Order cell ID
  this._head.cell.order.class = this._head.cell.class + '-order'; //Orderable class
  this._head.cell.order.none = this._head.cell.order.class + '-none'; //Orderable none class
  this._head.cell.order.asc = this._head.cell.order.class + '-asc'; //Orderable asc class
  this._head.cell.order.desc = this._head.cell.order.class + '-desc'; //Orderable desc class

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

  //Control wrapper panel
  this._control = {};
  this._control.id = this._id + '-control'; //Control panel ID
  this._control.class = this._class + '-control'; //Control panel class
  this._control.visible = (typeof opt.control === 'boolean') ? opt.control : true; //Control panel is visible

  //Check the entries option
  if(typeof opt.entries !== 'object'){ opt.entries = {}; }

  //Entries for each page
  this._entries = {};
  this._entries.id = this._id + '-entries'; //Entries ID
  this._entries.class = this._class + '-entries'; //Entries class
  this._entries.actual = (typeof opt.entries.default !== 'undefined') ? parseInt(opt.entries.default) : 10; //Actual number of entries
  this._entries.list = (typeof opt.entries.list !== 'undefined') ? opt.entries.list : [ 10, 25, 50, 100 ]; //Entries list
  this._entries.visible = (typeof opt.entries.visible === 'boolean') ? opt.entries.visible : true;

  //Entries label
  this._entries.label = {};
  this._entries.label.id = this._entries.id + '-label'; //Entries label ID
  this._entries.label.class = this._entries.class + '-label'; //Entries label class
  this._entries.label.text = 'Show'; //Entries label text

  //Entries select element
  this._entries.select = {};
  this._entries.select.id = this._entries.id + '-select'; //Entries select ID
  this._entries.select.class = this._entries.class + '-select'; //Entries select class
  this._entries.select.option = '<option value="{index}">{value}</option>'; //Entries select option templaate

  //Check the info object
  if(typeof opt.info !== 'object'){ opt.info = {}; }

  //Info block
  this._info = {};
  this._info.id = this._id + '-info'; //Info ID
  this._info.class = this._class + '-info'; //Info class
  this._info.visible = true; //Info section is visible

  //Status counter
  this._info.showing = {};
  this._info.showing.id = this._info.id + '-showing'; //Showing entries ID
  this._info.showing.class = this._info.class + '-showing'; //Showing entries class
  this._info.showing.visible = (typeof opt.info.showing === 'boolean') ? opt.info.showing : true; //Display the actual page counter
  this._info.showing.text = 'Showing <b>{start}</b> to <b>{end}</b> of <b>{actual}</b>.'; //Info text

  //Total entries counter
  this._info.total = {};
  this._info.total.id = this._info.id + '-total'; //Total counter ID
  this._info.total.class = this._info.class + '-total'; //Total counter class
  this._info.total.visible = (typeof opt.info.total === 'boolean') ? opt.info.total : true; //Display the total counter
  this._info.total.text = 'Total <b>{total}</b> entries.'; //Total entries text

  //Checked rows
  this._info.checked = {};
  this._info.checked.id = this._info.id + '-checked'; //Page checked ID
  this._info.checked.class = this._info.class + '-checked'; //Page checked class
  this._info.checked.visible = (typeof opt.info.checked === 'booblean') ? opt.info.checked : true; //Page checked is visible
  this._info.checked.text = '<b>{check}</b> rows checked'; //Page checked text

  //Page object
  this._page = {};
  this._page.id = this._id + '-page'; //Page container ID
  this._page.class = this._class + '-page'; //Page container class
  this._page.start = 1; //Start page
  this._page.end = 1; //End page
  this._page.actual = 1; //Actual page
  this._page.step = 1; //Page step
  this._page.visible = (typeof opt.page === 'boolean') ? opt.page : true; //Page controls is visible

  //Page buttons
  this._page.btn = {};
  this._page.btn.id = this._page.id + '-btn'; //Page button ID
  this._page.btn.class = this._page.class + '-btn'; //Page button class

  //Page button previous
  this._page.btn.prev = {};
  this._page.btn.prev.id = this._page.btn.id + '-prev'; //Page button previous ID
  this._page.btn.prev.class = this._page.btn.class; //Page button previous Class
  this._page.btn.prev.text = 'Prev'; //Page button previous text
  this._page.btn.visible = true; //Page button previous visible

  //Page button next
  this._page.btn.next = {};
  this._page.btn.next.id = this._page.btn.id + '-next'; //Page button next ID
  this._page.btn.next.class = this._page.btn.class; //Page button next class
  this._page.btn.next.text = 'Next'; //Page button next text
  this._page.btn.next.visible = true; //Page button next visible

  //Page labels
  this._page.label = {};
  this._page.label.id = this._page.id + '-label'; //Counter page label ID
  this._page.label.class = this._page.class + '-label'; //Counter page label class

  //Page text label
  this._page.label.page = {};
  this._page.label.page.id = this._page.label.id + '-page'; //Label page object ID
  this._page.label.page.text = 'Page'; //Label page object class

  //Pabe text total
  this._page.label.total = {};
  this._page.label.total.id = this._page.label.id + '-total'; //Page total ID
  this._page.label.total.text = 'of {pages}'; //Pabel total text

  //Page control select
  this._page.input = {};
  this._page.input.id = this._page.id + '-input'; //Input page ID
  this._page.input.class = this._page.class + '-input'; //Input page class

  //Build the events
  this._events = new jviz.commons.events();

  //Build the table
  this.build();

  //Parse and build the columns
  this.columns(this._columns.src);

  //Build the enetries list
  this.entriesList(this._entries.list);

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
