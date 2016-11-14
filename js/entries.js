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

  //find the entries on the entries list
  var index = this._entries.list.indexOf(this._entries.actual);

  //Check the index
  if(index !== -1)
  {
    //Update the select
    jviz.dom.val(this._entries.select.id, index.toString());
  }

  //Calculate the number of pages
  this._page.end = this._data.length / this._entries.actual;

  //Parse the number of pages
  this._page.end = (Math.floor(this._page.end) === this._page.end) ? this._page.end : Math.floor(this._page.end) + 1;

  //Open the first page
  this.page(1);

  //Update the number of pages
  jviz.dom.html(this._page.label.total.id, this._page.label.total.text.replace('{pages}', this._page.end));

  //Update the min attribute
  jviz.dom.attr(this._page.input.id, 'min', this._page.start);

  //Update the max attribute
  jviz.dom.attr(this._page.input.id, 'max', this._page.end);

  //Update the step
  jviz.dom.attr(this._page.input.id, 'step', this._page.step);

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

//Show the entries list
jviz.modules.table.prototype.entriesList = function(list)
{
  //Check the entries list
  if(typeof list !== 'object'){ return this._entries.list; }

  //Check the list
  if(jviz.is.array(list) === false){ list = [ list ]; }

  //Parse and save the values
  this._entries.list = this.entriesParse(list);

  //Reset the entries container
  jviz.dom.html(this._entries.select.id, '');

  //Read the full list of entries
  for(var i = 0; i < this._entries.list.length; i++)
  {
    //Get the element
    var el = this._entries.list[i];

    //Check the value
    var value = (el === -1) ? 'All' : el.toString();

    //Get the option
    var opt = this._entries.select.option.replace('{index}', i).replace('{value}', value);

    //Append the new option
    jviz.dom.append(this._entries.select.id, opt);
  }

  //Return this
  return this;
};

//Parse the entries list
jviz.modules.table.prototype.entriesParse = function(data)
{
  //Initialize the new list
  var list = [];

  //Read all the elements
  for(var i = 0; i < data.length; i++)
  {
    //Parse the element
    var el = parseInt(data[i]);

    //Check for number
    if(jviz.is.number(el) === false){ continue; }

    //Check for NaN
    if(jviz.is.nan(el) === true){ continue; }

    //Check the value
    if(el < -1){ continue; }

    //Check for 0
    if(el === 0){ continue; }

    //Save the element
    list.push(el);
  }

  //Return the parsed list
  return list;
};

//Change the number of entries
jviz.modules.table.prototype.entriesChange = function()
{
  //Get the actual value
  var value = jviz.dom.val(this._entries.select.id);

  //Contert to integer
  value = parseInt(value);

  //Get the entries number
  var num = this._entries.list[value];

  //Check the number
  if(num === -1)
  {
    //Update the entries numner
    num = this._data.src.length;
  }

  //Update the entries list
  this.entries(num).draw();
};
