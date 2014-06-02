(function() {
  // Defines a Item of a Pivot control. 
  Polymer('winjs-pivot-item', {

    created: function() {
      console.log("created winjs-pivot-item");

      // What is the recommended way to define statics with polymer?
      if (!PivotItem.isDeclarativeControlContainer) {
        PivotItem.isDeclarativeControlContainer = WinJS.Utilities.markSupportedForProcessing(function (item, callback) {
          if (callback === WinJS.UI.processAll) {
              return;
          }

          item._processors = item._processors || [];
          item._processors.push(callback);

          // Once processed the first time synchronously queue up new processors as they come in
          if (item._processed) {
              item._process();
          }
        });
      }
    },

    ready: function() {
          console.log("ready winjs-pivot-item");

          this.setAttribute('role', 'tabpanel');
          WinJS.Utilities.addClass(this, "winjs-pivot-item");
          this.style.opacity = 0;
          this._processors = [WinJS.UI.processAll];
    },

    attached: function() {
          console.log("attached winjs-pivot-item");
    },

    domReady: function() {
          console.log("domReady winjs-pivot-item");
    },

    detached: function() {
          console.log("detached winjs-pivot-item");
    },

    attributeChanged: function(attrName, oldVal, newVal) {
          //console.log("attributeChanged winjs-pivot-item: " + attrName, 'old: ' + oldVal, 'new:', newVal);
    },

    // Gets the DOM element that hosts the PivotItem.
    get elementHost() {
      return this;
    },

    // Gets the DOM element that hosts the PivotItem's content.
    get contentElement() {
      return this.firstElementChild;
    },

    header: "header",

    _process: function PivotItem_process() {
      var that = this;

      if (this._processors) {
          this._processors.push(function () {
              return WinJS.Utilities.Scheduler.schedulePromiseAboveNormal();
          });
      }

      this._processed = (this._processors || []).reduce(function (promise, processor) {
          return promise.then(function () {
              return processor(that.contentElement);
          });
      }, this._processed || WinJS.Promise.as());
      this._processors = null;

      return this._processed;
    },
  });
})();