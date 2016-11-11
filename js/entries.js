//Get o save the number of entries
jviz.modules.table.prototype.entries = function(n)
{
  //Check for undefined
  if(typeof n === 'undefined'){ return this._entries.actual; }

  //Parse the number
  n = parseInt(n);

  //Check the number value
  if(n <= 0){ return jviz.console.error('Page entries must be a positive number', this); }

  //Save the number
  this._entries.actual = n;

  //Calculate the number of pages
  this._page.end = this._data.length / this._entries.actual;

  //Parse the number of pages
  this._page.end = (Math.floor(this._page.end) === this._page.end) ? this._page.end : Math.floor(this._page.end) + 1;

  //Open the first page
  this.page(1);

  //Update the number of pages
  jviz.dom.html(this._page.control.label.total.id, this._page.control.label.total.text.replace('{pages}', this._page.end));

  //Update the min attribute
  jviz.dom.attr(this._page.control.input.id, 'min', this._page.start);

  //Update the max attribute
  jviz.dom.attr(this._page.control.input.id, 'max', this._page.end);

  //Update the step
  jviz.dom.attr(this._page.control.input.id, 'step', this._page.step);

  //Continue
  return this;
};

//Build the page entries
jviz.modules.table.prototype.entriesBuild = function()
{
  //Build the entries select
  jviz.dom.append(this._control.id, { id: this._entries.id, class: this._entries.class });

  //Build the entries label
  jviz.dom.append(this._entries.id, { id: this._entries.label.id, class: this._entries.label.class });

  //Build the entries select
  jviz.dom.append(this._entries.id, { _tag: 'select', id: this._entries.select.id, class: this._entries.select.class });

  //Add the page entries text
  jviz.dom.html(this._entries.label.id, this._entries.label.text);

  //Check if the entries element is visible
  if(this._entries.visible === false){ jviz.dom.hide(this._entries.id); }

  //Save this
  var self = this;

  //Add the change event
  jviz.dom.on(this._entries.select.id, 'change', function(){ return self.entriesChange(); });

  //Return this
  return this;
};

//Change the number of entries
jviz.modules.table.prototype.entriesChange = function()
{

};
