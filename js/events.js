//Add the table events
jviz.modules.table.prototype.events = function()
{
  //Save this
  var self = this;
  
  //Page counter event
  jviz.dom.on(this._page.counter.input.id, 'change', function(){ return self.pageChange(); });

  //Add the next button event
  jviz.dom.on(this._page.btn.next.id, 'click', function(){ return self.pageNext(); });

  //Add the previous button event
  jviz.dom.on(this._page.btn.prev.id, 'click', function(){ return self.pagePrev(); });

  //Return this
  return this;
};
