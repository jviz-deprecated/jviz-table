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
  var page = jviz.dom.val(this._page.input.id);

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

//Build the paginator element
jviz.modules.table.prototype.pageBuild = function()
{
  //Build the paginator object
  jviz.dom.append(this._control.id, { id: this._page.id, class: this._page.class });

  //Build the next button
  jviz.dom.append(this._page.id, { id: this._page.btn.next.id, class: this._page.btn.next.class });

  //Build the page label
  jviz.dom.append(this._page.id, { id: this._page.label.total.id, class: this._page.label.class });

  //Build the page input
  jviz.dom.append(this._page.id, { _tag: 'input', type: 'number', id: this._page.input.id, class: this._page.input.class });

  //Build the page label
  jviz.dom.append(this._page.id, { id: this._page.label.page.id, class: this._page.label.class });

  //Build the previous button
  jviz.dom.append(this._page.id, { id: this._page.btn.prev.id, class: this._page.btn.prev.class });

  //Add the page label text
  jviz.dom.html(this._page.label.page.id, this._page.label.page.text);

  //Add the total label text
  jviz.dom.html(this._page.label.total.id, this._page.label.total.text);

  //Add the previous button text
  jviz.dom.html(this._page.btn.prev.id, this._page.btn.prev.text);

  //Add the next button text
  jviz.dom.html(this._page.btn.next.id, this._page.btn.next.text);

  //Check if the page control is visible
  if(this._page.visible === false){ jviz.dom.hide(this._page.id); }

  //Save this
  var self = this;

  //Page counter event
  jviz.dom.on(this._page.input.id, 'change', function(){ return self.pageChange(); });

  //Add the next button event
  jviz.dom.on(this._page.btn.next.id, 'click', function(){ return self.pageClickNext(); });

  //Add the previous button event
  jviz.dom.on(this._page.btn.prev.id, 'click', function(){ return self.pageClickPrev(); });

  //Return this
  return this;
};

//Update the page info
jviz.modules.table.prototype.pageInfo = function()
{
  //Update the actual page counter
  jviz.dom.val(this._page.input.id, this._page.actual);

  //Return this
  return this;
};
