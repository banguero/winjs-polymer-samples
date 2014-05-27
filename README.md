winjs-polymer-samples
=====================

Samples Using WinJS and Polymer

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

![winjs-pivot shadow-dom] (https://raw.githubusercontent.com/banguero/winjs-polymer-samples/master/screenshots/Screen%20Shot%202014-05-27%20at%201.25.16%20AM.png)

# Open Issues

* What is the recommended way to define statics with polymer for polymer-element class? (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot-item.html)

* In Chrome canary - domReady fires after all the nested win-pivot-items have been attached; however, on other browsers (e.g. regular Chrome), it does not wait for the children to be attached. What is the recommended pattern to determine when the nested components are also attached? The WebComponentsReady event seems to work as a work-around in regular Chrome, but it gets fired too early in Safari, using a random timeout for now. (https://github.com/banguero/winjs-polymer-samples/blob/master/elements/winjs-pivot.html)

* WinJS Binding templates issue - declaring binding template directly in the body otherwise, we fail to find it due to shadow dom encapsulation (https://github.com/banguero/winjs-polymer-samples/blob/master/index.html)
