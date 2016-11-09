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
  this.page(page).draw();
};

//Click on page next button
jviz.modules.table.prototype.pageClickNext = function()
{
  //Next page
  this.pageNext().draw();
};

//CLick on the page prev button
jviz.modules.table.prototype.pageClickPrev = function()
{
  //Prev page
  this.pagePrev().draw();
};

//Update the page info
jviz.modules.table.prototype.pageUpdateEntries = function()
{
  //Check if the page controls is visible
  if(this._page.visible === false){ return this; }

  //Update the actual page counter
  jviz.dom.val(this._page.counter.input.id, this._page.actual);

  //Get the entries text
  var entries = this._page.entries.text;

  //Add the start entrie
  entries = entries.replace('{start}', this._draw.start + 1);

  //Add the end entrie
  entries = entries.replace('{end}', this._draw.end + 1);

  //Replace the actual number of entries
  entries = entries.replace('{actual}', this._data.length);

  //Replace the total number of entries
  entries = entries.replace('{total}', this._data.src.length);

  //Display the entries text
  jviz.dom.html(this._page.entries.id, entries);

  //Continue
  return this;
};

//Update the page checked counter
jviz.modules.table.prototype.pageUpdateChecked = function()
{
  //Get the number of checked rows
  var count = this.countChecked();

  //Check the number
  if(count === 0){ jviz.dom.hide(this._page.checked.id); return this; }

  //Show the counter div
  jviz.dom.show(this._page.checked.id);

  //Get the text
  var text = this._page.checked.text.replace('{check}', count);

  //Add the text
  jviz.dom.html(this._page.checked.id, text);

  //Continue
  return this;
};
