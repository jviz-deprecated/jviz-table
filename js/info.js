//Update the info
jviz.modules.table.prototype.info = function()
{
  //Check if the checkbox element is visible
  if(this._info.checkbox.visible === true)
  {
    //Get the number of checked rows
    var count = this.countChecked();

    //Get the text
    var text = this._page.checked.text.replace('{check}', count);

    //Add the text
    jviz.dom.html(this._page.checked.id, text);

    //Check the number
    (count === 0) ? jviz.dom.hide(this._page.checked.id) : jviz.dom.show(this._page.checked.id);
  }

  //Check the total element
  if(this._info.total.visible === true)
  {
    //Get the actual data length
    var data_src = this._data.src.length;

    //Get the filter data length
    var data_filter = this._data.length;

    //Update the total length
    jviz.dom.append(this._info.total.id, this._info.total.text.replace('{total}', data_src));

    //Check for show or hide
    (data_src === data_filter) ? jviz.dom.hide(this._info.total.id) : jviz.dom.show(this._info.total.id);
  }

  //Get the entries text
  var entries = this._info.showing.text;

  //Add the start entrie
  entries = entries.replace('{start}', this._draw.start + 1);

  //Add the end entrie
  entries = entries.replace('{end}', this._draw.end + 1);

  //Replace the actual number of entries
  entries = entries.replace('{actual}', this._data.length);

  //Display the entries text
  jviz.dom.html(this._info.showing.id, entries);

  //Continue
  return this;
};

//Build the info element
jviz.modules.table.prototype.infoBuild = function()
{
  //Add the info div element
  jviz.dom.append(this._control.id, { id: this._info.id, class: this._info.class });

  //Add the showing element
  jviz.dom.append(this._info.id, { id: this._info.showing.id, class: this._info.showing.class });

  //Add the total element
  jviz.dom.append(this._info.id, { id: this._info.total.id, class: this._info.total.class });

  //Add the checked element
  jviz.dom.append(this._info.id, { id: this._info.checked.id, class: this._info.checked.class });

  //Check if the showing element is visible
  if(this._info.showing.visible === false){ jviz.dom.hide(this._info.showing.id); }

  //Check if the total element is visible
  if(this._info.total.visible === false){ jviz.dom.hide(this._info.total.id); }

  //Check if the checked element is visible
  if(this._info.checked.visible === false){ jviz.dom.hide(this._info.checked.id); }

  //Return this
  return this;
};
