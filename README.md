winjs-polymer-samples
=====================

Web Components is a set of specs which let web developers leverage their HTML, CSS and JavaScript knowledge to build widgets that can be reused easily and reliably.

Polymer (http://www.polymer-project.org/) is a library that uses the latest web technologies to let you create custom HTML elements. Its philosophy is "everything is an element". It divides its custom elements into two categories: UI elements (e.g. core-list, select) and Non UI elements (e.g. script, style, core-ajax). The lowest layer of Polymer is platform.js: a collection of libraries (or “polyfills”) for new web technologies that haven’t shipped yet across all browsers. Platform makes it possible for developers to use these standards today across all modern browsers. As these technologies are implemented in browsers, the polyfills will shrink and you’ll gain the benefits of native implementations. Platform.js automatically detects native support and switches to the fast path when available. Elements seamlessly start relying on the native stuff–and get faster in the process.

The purpose of this repo is to experiment creating web components based on existing WinJS controls, compare the development experience, and identify gaps in the current state of the specs.

We start by building a `<winjs-pivot>` web component. Refer to (https://github.com/winjs/winjs/blob/master/src/js/WinJS/Controls/Pivot.js) for the source code of the existing WinJS Pivot control. The Pivot control creates a tab control that displays multiple items.

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

## Using `<winjs-pivot>`

```html
<!-- HTML imports in <head> -->
<link rel="import" href="elements/winjs-pivot.html"/>
<link rel="import" href="elements/winjs-pivot-item.html"/>
<link rel="import" href="bower_components/core-list/core-list.html">

<!-- using <winjs-pivot> in the <body> -->
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

This particular markup creates a Pivot with 4 tabs simulating a mail app:
* all: which displays messages in a `<core-list>` web components (polymer's virtualized list)
* unread
* flagged
* urgent: which display messages in a `WinJS.UI.ListView`

## DOM visualization (in Chrome Canary)

`<winjs-pivot>` becomes a shadow host when Polymer calls internally `createShadowRoot`. Since the element has shadow DOM, its children are not rendered; the content of the shadow DOM is rendered instead.

![winjs-pivot shadow-dom] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-27%20at%201.25.16%20AM.png)

every `<winjs-pivot-item>` has its own shadow root, and depending on what it contains (e.g. `<core-list>` web component), it could have nested shadow roots.

![winjs-pivot shadow-dom2] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-28%20at%2010.58.16%20AM.png)

## `<winjs-pivot>` definition with Polymer

```html
<link rel="import" href="../bower_components/polymer/polymer.html">

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
  <script src="winjs-pivot.js"></script>
</polymer-element>
```

The content of the `<template>` element is parsed by the parser, but it is inert: scripts aren't processed, images aren't downloaded, and so on. The `<template>` element is not rendered.

The <content> element allows selecting nodes from the Light DOM and render them at predefined locations in the Shadow DOM.

Distributed nodes are elements that render at the insertion point (<content> element), in the main sample, it would be all the `<win-pivot-item>`.


`winjs-pivot.js` is defined as:

```javascript

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

```
`<winjs-pivot-item>` is defined as

```html
<link rel="import" href="../bower_components/polymer/polymer.html">

<polymer-element name="winjs-pivot-item" constructor="PivotItem" attributes="header">
  <template>
    <link rel="stylesheet" href="winjs-pivot-item.css">

    <div class="win-pivot-item-content">
      <content></content>
    </div>
  </template>
  <script src="winjs-pivot-item.js"></script>
</polymer-element>
```

Notice that the distributed nodes are elements that render at the insertion point (<content> element), in the main sample, it would be `<core-list>` inside the first `<win-pivot-item>`.

## Styling Summary (style encapsulation)

* One of the core features of Shadow DOM is the shadow boundary. It has a lot of nice properties, but one of the best is that it provides style encapsulation for free. Other styles rules defined on the page that target elements (e.g h3) don't bleed into my content. That's because selectors don't cross the shadow boundary.
* The `:host` allows you to select and style the element hosting a shadow tree
* If an element has at least one shadow tree, the `::shadow` pseudo-element matches the shadow root itself.

  ```css
  #host::shadow span {
    color: red;
  }
  ```
  
  styles all of the spans within its shadow tree. Supported with querySelector:

  ```javascript
  document.querySelector('x-tabs::shadow x-panel::shadow #foo');
  ```

  so that you don't have to 

  ```javascript
  document.querySelector('x-tabs').shadowRoot
          .querySelector('x-panel').shadowRoot
          .querySelector('#foo');
  ```
  
* The `/deep/` combinator is similar to ::shadow, but more powerful. It completely ignores all shadow boundaries and crosses into any number of shadow trees (useful in the world of Custom Elements where it's common to have multiple levels of Shadow DOM)
  ```css
  x-tabs /deep/ x-panel {
    ...
  }
  ```
  select all <x-panel> elements that are descendants of <x-tabs>
* `/deep/` is also useful to style navite elements (make the input[type="range"] inside the <video> control's pink, instead of rolling your own.
* Distributed nodes (elements that render at an insertion point (a `<content>` element)) retain styles from the main document. They are still logically in the light dom and don't move. They just render elsewhere
* Distributed nodes are children of the host element, so how can we target them from within the Shadow DOM? The answer is the CSS `::content` pseudo element. It's a way to target Light DOM nodes that pass through an insertion point. For example:  `::content > h3` styles any h3 tags that pass through an insertion point.

* Eric Bidelman answered something I was wondering: *Do the `::shadow` pseudo-element and `/deep/` combinator defeat the purpose of style encapsulation? Out of the box, Shadow DOM prevents accidental styling from outsiders but it never promises to be a bullet proof vest. Developers should be allowed to intentionally style inner parts of your Shadow tree...if they know what they're doing. Having more control is also good for flexibility, theming, and the re-usability of your elements*.


# Issues Discussed

* [#2 - discussed] (https://github.com/banguero/winjs-polymer-samples/issues/2) - What is the recommended way to define statics with polymer for polymer-element class?  (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot-item.html). Looking for something different than (http://www.polymer-project.org/docs/polymer/polymer.html#static) where if the definition is `<polymer-element name="winjs-pivot-item" constructor="PivotItem" attributes="header">`, I would like to set `PivotItem.isDeclarativeControlContainer` to a function after `PivotItem` is defined.

* [#3 - resolved] (https://github.com/banguero/winjs-polymer-samples/issues/3) - In Chrome Canary - `domReady` fires after all the nested `<win-pivot-items>` have been attached; however, on other browsers (e.g. regular Chrome), it does not wait for the children web components to be attached. What is the recommended pattern to determine when the nested web components are also attached? The `WebComponentsReady` event seems to work as a work-around in regular Chrome, but it gets fired too early in Safari. The prototype is using a random timeout for now, which explains why it takes a while to first load. (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot.html). Resolution: upgraded to polymer 0.3.1

* [#4 - discussed] (https://github.com/banguero/winjs-polymer-samples/issues/4) - WinJS Binding templates issue - declaring binding template directly in the body otherwise, we fail to find it due to shadow dom encapsulation (https://github.com/banguero/winjs-polymer-samples/blob/master/index.html)

* [#5 - w/workaround] (https://github.com/banguero/winjs-polymer-samples/issues/5) - WinJS ListView issue when used inside `<winjs-pivot-item>` webcomponent. The ListView's `isZombie` check to determine if it has been disposed relies on `document.body.contains(this.element)`, which fails due to shallow dom encapsulation. For now, ui.js is always returning false for isZombie checks.

* [#6 - discussed] (https://github.com/banguero/winjs-polymer-samples/issues/6) - Style content in a shadow DOM subtree. This spec (http://w3c.github.io/webcomponents/explainer/) indicates that one of the two ways to permit the page to style content in a shadow DOM subtree in a controlled way is by exposing a specific element assigning it a pseudo ID. Author styles can then refer to it as a pseudo-element. I could not find anything in Polymer's docs about this. Is that not supported in their polyfill?

* [#7 - resolved] (https://github.com/banguero/winjs-polymer-samples/issues/7) - is `:host(<selector>)` supported with polymer? or is there a restriction on the complexity of the `<selector>`?  (see http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/). `:host(.win-pivot-nosnap .win-pivot-surface)` did not seem to work for me. Resolution: use `:host(.win-pivot-nosnap) .win-pivot-surface`

* [#8 - discussed] (https://github.com/banguero/winjs-polymer-samples/issues/8) - What is the story for dev tools to extract metadata of web components?

* [#9 - discussed] (https://github.com/banguero/winjs-polymer-samples/issues/9) - How does polymer work with modules? For example, `<polymer-element name="winjs-pivot-item" constructor="PivotItem" attributes="header">` would expose a global `PivotItem`. How does this interact with AMD? Is this a limitation of polymer or of HTML imports?


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
* Shadow DOM Top 10 List survey (https://www.surveymonkey.com/results/SM-SQX77WF/)
* CSS Scoping  (http://dev.w3.org/csswg/css-scoping/)
* Polymer (lots of info there) http://www.polymer-project.org/
* Polymer core elements (http://polymer.github.io/core-docs/)


