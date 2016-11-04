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

  //Build the page label
  jviz.dom.append(this._page.counter.id, { _tag: 'span', id: this._page.counter.label.page.id });

  //Build the page counter input
  jviz.dom.append(this._page.counter.id, { _tag: 'input', type: 'number', id: this._page.counter.input.id, class: this._page.counter.input.class });

  //Build the page counter label 2
  jviz.dom.append(this._page.counter.id, { tag: 'span', id: this._page.counter.label.total.id });

  //Build the previous button
  jviz.dom.append(this._page.id, { id: this._page.btn.prev.id, class: this._page.btn.prev.class });

  //Add the page label text
  jviz.dom.html(this._page.counter.label1.id, this._page.counter.label.page.text);

  //Add the total label text
  jviz.dom.html(this._page.counter.label2.id, this._page.counter.label.total.text);

  //Add the previous button text
  jviz.dom.html(this._page.btn.prev.id, this._page.btn.prev.text);

  //Add the next button text
  jviz.dom.html(this._page.btn.next.id, this._page.btn.next.text);

  //Save this
  var self = this;

  //Page counter event
  jviz.dom.on(this._page.counter.input.id, 'change', function(){ return self.pageChange(); });

  //Add the next button event
  jviz.dom.on(this._page.btn.next.id, 'click', function(){ return self.pageNext(); });

  //Add the previous button event
  jviz.dom.on(this._page.btn.prev.id, 'click', function(){ return self.pagePrev(); });

  //Continue
  return this;
};
