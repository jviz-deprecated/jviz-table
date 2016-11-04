//Build the table
jviz.modules.table.prototype.build = function()
{
  //Append the table container
  jviz.dom.append(this._parent, { id: this._id, class: this._class });

  //Append the table
  jviz.dom.append(this._id, { id: this._table.id, class: this._table.class });

  //Append the table head
  jviz.dom.append(this._table.id, { id: this._head.id, class: this._head.class });

  //Append the table body
  jviz.dom.append(this._table.id, { id: this._body.id, class: this._body.class });

  //Build the page container
  jviz.dom.append(this._id, { id: this._page.id, class: this._page.class });

  //Build the page entries
  jviz.dom.append(this._page.id, { id: this._page.entries.id, class: this._page.entries.class });

  //Build the next button
  jviz.dom.append(this._page.id, { id: this._page.btn.next.id, class: this._page.btn.next.class });

  //Build the page counter div
  jviz.dom.append(this._page.id, { id: this._page.counter.id, class: this._page.counter.class });

  //Build the page counter label 1
  jviz.dom.append(this._page.counter.id, { id: this._page.counter.label1.id, class: this._page.counter.label1.class });

  //Build the page counter input
  jviz.dom.append(this._page.counter.id, { _tag: 'input', type: 'number', id: this._page.counter.input.id, class: this._page.counter.input.class });

  //Build the page counter label 2
  jviz.dom.append(this._page.counter.id, { id: this._page.counter.label2.id, class: this._page.counter.label2.class });

  //Build the previous button
  jviz.dom.append(this._page.id, { id: this._page.btn.prev.id, class: this._page.btn.prev.class });

  //Add the label1 text
  jviz.dom.html(this._page.counter.label1.id, this._page.counter.label1.text);

  //Add the label2 text
  jviz.dom.html(this._page.counter.label2.id, this._page.counter.label2.text);

  //Add the previous button text
  jviz.dom.html(this._page.btn.prev.id, this._page.btn.prev.text);

  //Add the next button text
  jviz.dom.html(this._page.btn.next.id, this._page.btn.next.text);

  //Continue
  return this;
};
