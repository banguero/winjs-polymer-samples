// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

(function listViewImplInit(global, WinJS, undefined) {
    "use strict";

    // Only set the attribute if its value has changed
    function setAttribute(element, attribute, value) {
        if (element.getAttribute(attribute) !== "" + value) {
            element.setAttribute(attribute, value);
        }
    }

    WinJS.Namespace.define("WinJS.UI", {
        _setAttribute: setAttribute,
        _getCursorPos: function (eventObject) {
            var docElement = document.documentElement;

            return {
                left: eventObject.clientX + (document.body.dir === "rtl" ? -docElement.scrollLeft : docElement.scrollLeft),
                top: eventObject.clientY + docElement.scrollTop
            };
        },
        _isSelectionRendered: function ListView_isSelectionRendered(itemBox) {
            // The tree is changed at pointerDown but _selectedClass is added only when the user drags an item below the selection threshold so checking for _selectedClass is not reliable.
            return itemBox.querySelectorAll(WinJS.UI._selectionPartsSelector).length > 0;
        }
    });
    
})(this, WinJS);

