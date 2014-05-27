winjs-polymer-samples
=====================

Web Components is a set of specs which let web developers leverage their HTML, CSS and JavaScript knowledge to build widgets that can be reused easily and reliably.

Polymer (http://www.polymer-project.org/) is a library that uses the latest web technologies to let you create custom HTML elements. Its philosophy is "everything is an element". It divides its custom elements into two categories: UI elements (e.g. core-list, select) and Non UI elements (e.g. script, style, core-ajax). The lowest layer of Polymer is platform.js: a collection of libraries (or “polyfills”) for new web technologies that haven’t shipped yet across all browsers. Platform makes it possible for developers to use these standards today across all modern browsers. As these technologies are implemented in browsers, the polyfills will shrink and you’ll gain the benefits of native implementations. Platform.js automatically detects native support and switches to the fast path when available. Elements seamlessly start relying on the native stuff–and get faster in the process.

The purpose of this repo is to experiment creating web components based on existing WinJS controls, compare the development experience, and identify gaps in the current state of the specs.

We start by building a `<winjs-pivot>` web component. Refer to (https://github.com/winjs/winjs/blob/master/src/js/WinJS/Controls/Pivot.js) for the source code of the existing WinJS Pivot control.

# Installation Steps

Clone a copy of the master winjs-polymer-samples git repo:
```
git clone https://github.com/banguero/winjs-polymer-samples.git
```

Change to the `winjs-polymer-samples` directory:
```
cd winjs-polymer-samples
```

Install the [grunt command-line interface](https://github.com/gruntjs/grunt-cli) globally:
```
npm install -g grunt-cli
```

> **Note:** You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to install Grunt globally.

Grunt dependencies are installed separately in each cloned git repo. Install the dependencies with:
```
npm install
```

Install bower
```
npm install -g bower
```

> **Note:** You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to install Bower globally.

Update bower dependencies for the current project
```
bower update
```

Run the following and the WinJS JavaScript and CSS files will be put in the `bin` directory:
```
grunt test
```

# Demo

http://winjsrocks.com/polymer-samples/

![winjs-pivot] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-26%20at%2010.55.53%20PM.png)

# Demo Details

## Markup

```html
<winjs-pivot title="INBOX - EMAIL" selectedIndex="0">
  <winjs-pivot-item header="all">
    <!-- core-list is polymer's virtualized list web component -->
    <core-list id="list" data="{{data}}" height="100">
      <template repeat>
        <div class="item">
          <div class="message">
            <div class="from">{{name}}</div>
            <div class="subject win-pivot-slide1">{{subject}}</div>
            <div class="details win-pivot-slide2">{{details}}</div>
          </div>
        </div>
      </template>
    </core-list>
  </winjs-pivot-item>

  <winjs-pivot-item header="unread">
    unread content here
  </winjs-pivot-item>

  <winjs-pivot-item header="flagged">
    flagged content here
  </winjs-pivot-item>

  <winjs-pivot-item header="urgent">
      <!-- WinJS.UI.ListView is WinJS's virtualized list control -->
    <div class="urgentLV" data-win-control="WinJS.UI.ListView" data-win-options="{ itemDataSource: Urgent.dataSource, layout: { type: WinJS.UI.ListLayout }, itemTemplate: select('.mailItemTemplate'), selectionMode: 'none' }"></div>
  </winjs-pivot-item>

</winjs-pivot>
```

## DOM visualization (in Chrome Canary)

`<winjs-pivot>` becomes a shadow host when Polymer calls internally `createShadowRoot`. Since the element has shadow DOM, its children are not rendered; the content of the shadow DOM is rendered instead.

![winjs-pivot shadow-dom] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-27%20at%201.25.16%20AM.png)

every `<winjs-pivot-item>` has its own shadow root, and depending on what it contains (e.g. `<core-list>` web component), it could have nested shadow roots.

![winjs-pivot shadow-dom2] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-28%20at%2010.58.16%20AM.png)

## `<winjs-pivot>` definition with Polymer

```html
<polymer-element name="winjs-pivot" constructor="Pivot">
  <template>
    <link rel="stylesheet" href="winjs-pivot.css">

    <div class="win-pivot-title">{{title}}</div>
    <div class="win-pivot-headers"></div>
    <div class="win-pivot-viewport" role="group">
      <div class="win-pivot-surface">
        <content></content>
      </div>
    </div>
  </template>
  <script>
    (function() {

      ...

      // Tab control which displays an item of content.
      Polymer('winjs-pivot', {

        created: function() {
          console.log("created winjs-pivot");
        },

        ready: function() {
          console.log("ready winjs-pivot");

          this.setAttribute('role', 'tablist');
          
          // Initialization code here
          
          ....
        },

        attached: function() {
          console.log("attached winjs-pivot");
        },

        domReady: function() {
          console.log("domReady winjs-pivot");
          ...
        },

        detached: function() {
          console.log("detached winjs-pivot");
        },

        attributeChanged: function(attrName, oldVal, newVal) {
          console.log("attributeChanged winjs-pivot: " + attrName, 'old: ' + oldVal, 'new:', newVal);
        },


        // Gets or sets the index of the item in view.
        get selectedIndex() {
          if (this._items.length === 0) {
              return -1;
          }

          if (+this._pendingIndexOnScreen === this._pendingIndexOnScreen) {
              return this._pendingIndexOnScreen;
          }

          return this._currentIndexOnScreen;
        },

        set selectedIndex(value) {
          if (value >= 0 && value < this._items.length) {
              if (this._pendingRefresh) {
                  this._pendingIndexOnScreen = value;
              } else {
                  this._navMode = this._navMode || navigationModes.api;
                  this._loadItem(value);
              }
          }
        },
        
        ...
      });

    })();
  </script>
</polymer-element>
```

# Open Issues

* What is the recommended way to define statics with polymer for polymer-element class? (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot-item.html). Looking for something different than (http://www.polymer-project.org/docs/polymer/polymer.html#static) where if the definition is `<polymer-element name="winjs-pivot-item" constructor="PivotItem" attributes="header">`, I would like to set `PivotItem.isDeclarativeControlContainer` to a function after `PivotItem` is defined.

* In Chrome Canary - `domReady` fires after all the nested `<win-pivot-items>` have been attached; however, on other browsers (e.g. regular Chrome), it does not wait for the children web components to be attached. What is the recommended pattern to determine when the nested web components are also attached? The `WebComponentsReady` event seems to work as a work-around in regular Chrome, but it gets fired too early in Safari. The prototype is using a random timeout for now, which explains why it takes a while to first load. (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot.html)

* WinJS Binding templates issue - declaring binding template directly in the body otherwise, we fail to find it due to shadow dom encapsulation (https://github.com/banguero/winjs-polymer-samples/blob/master/index.html)

* WinJS ListView issue when used inside `<winjs-pivot-item>` webcomponent. The ListView's `isZombie` check to determine if it has been disposed relies on `document.body.contains(this.element)`, which fails due to shallow dom encapsulation. For now, ui.js is always returning false for isZombie checks.

* Style content in a shadow DOM subtree. This spec (http://w3c.github.io/webcomponents/explainer/) indicates that one of the two ways to permit the page to style content in a shadow DOM subtree in a controlled way is by exposing a specific element assigning it a pseudo ID. Author styles can then refer to it as a pseudo-element. I could not find anything in Polymer's docs about this. Is that not supported in their polyfill?

* What is the story for dev tools to extract metadata of web components?

# Appendix

## Recommended Reading

* Web Components explainer (http://w3c.github.io/webcomponents/explainer/)
* Custom Elements spec (http://w3c.github.io/webcomponents/spec/custom/)
* HTML imports spec (http://w3c.github.io/webcomponents/spec/imports/)
* Templates spec (http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#the-template-element)
* Shadow DOM spec (http://w3c.github.io/webcomponents/spec/shadow/)
* Shadow DOM 101 (http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
* Shadow DOM 201 (http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
* Shadow DOM 301 (http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)
* Polymer (lots of info there) http://www.polymer-project.org/
* Polymer core elements (http://polymer.github.io/core-docs/)


