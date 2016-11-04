//Open a page
jviz.modules.table.prototype.page = function(n)
{
  //Check the number
  if(typeof n === 'undefined'){ return this._page.actual; }

  //Convert to integer
  n = parseInt(n);

  //Check for number
  if(typeof n !== 'number'){ return this; }

  //Check the page start
  if(n < this._page.start){ n = this._page.start; }

  //Check the page end
  if(this._page.end < n){ n = this._page.end; }

  //Update the actual page
  this._page.actual = n;

  //Draw the data
  this.draw();

  //Update the actual page counter
  jviz.dom.val(this._page.counter.input.id, this._page.actual);

  //Get the entries text
  var entries = this._page.entries.text.replace('{start}', this._page.rows.start + 1).replace('{end}', this._page.rows.end + 1);

  //Replace the total number of entries
  entries = entries.replace('{total}', this._table.el.countRows());

  //Display the entries text
  jviz.dom.html(this._page.entries.id, entries);

  //Continue
  return this;
};

//Get o save the number of page rows
jviz.modules.table.prototype.pageRows = function(n)
{
  //Check for undefined
  if(typeof n === 'undefined'){ return this._page.rows.number; }

  //Save the number
  this._page.rows.number = parseInt(n);

  //Check the number
  if(this._page.rows.number <= 0){ this._page.rows.number = this._page.rows.number.default; }

  //Calculate the number of pages
  this._page.end = Math.floor(this._table.el._data.length / this._page.rows.number) + 1;

  //Open the first page
  this.page(1);

  //Update the number of pages
  jviz.dom.html(this._page.counter.label2.id, ' of ' + this._page.end);

  //Update the min attribute
  jviz.dom.attr(this._page.counter.input.id, 'min', this._page.start);

  //Update the max attribute
  jviz.dom.attr(this._page.counter.input.id, 'max', this._page.end);

  //Update the step
  jviz.dom.attr(this._page.counter.input.id, 'step', this._page.step);

  //Continue
  return this;
};

//Next page
jviz.modules.table.prototype.pageNext = function()
{
  //Open the next page
  return this.page(this._page.actual + 1);
};

//Previous page
jviz.modules.table.prototype.pagePrev = function()
{
  //Open the previous page
  return this.page(this._page.actual - 1);
};

//Open the first page
jviz.modules.table.prototype.pageFirst = function()
{
  //Open the first page
  return this.page(this._page.start);
};

//Open the last page
jviz.modules.table.prototype.pageLast = function()
{
  //Open the last page
  return this.page(this._page.end);
};

//Update the page
jviz.modules.table.prototype.pageChange = function()
{
  //Get the actual value
  var page = jviz.dom.val(this._page.counter.input.id);

  //Open the page
  return this.page(page);
};
