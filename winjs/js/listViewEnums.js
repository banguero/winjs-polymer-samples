// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

(function listViewImplInit(global, WinJS, undefined) {
    "use strict";


        WinJS.Namespace.define("WinJS.UI", {

            /// <field locid="WinJS.UI.ListView.ObjectType" helpKeyword="WinJS.UI.ObjectType">
            /// Specifies the type of an IListViewEntity.
            /// </field>
            ObjectType: {
                /// <field locid="WinJS.UI.ListView.ObjectType.item" helpKeyword="WinJS.UI.ObjectType.item">
                /// This value represents a ListView item.
                /// </field>
                item: "item",
                /// <field locid="WinJS.UI.ListView.ObjectType.groupHeader" helpKeyword="WinJS.UI.ObjectType.groupHeader">
                /// This value represents a ListView group header.
                /// </field>
                groupHeader: "groupHeader"
            },

            /// <field locid="WinJS.UI.ListView.SelectionMode" helpKeyword="WinJS.UI.SelectionMode">
            /// Specifies the selection mode for a ListView.
            /// </field>
            SelectionMode: {
                /// <field locid="WinJS.UI.ListView.SelectionMode.none" helpKeyword="WinJS.UI.SelectionMode.none">
                /// Items cannot be selected.
                /// </field>
                none: "none",
                /// <field locid="WinJS.UI.ListView.SelectionMode.single" helpKeyword="WinJS.UI.SelectionMode.single">
                /// A single item may be selected.
                /// <compatibleWith platform="Windows" minVersion="8.0"/>
                /// </field>
                single: "single",
                /// <field locid="WinJS.UI.ListView.SelectionMode.multi" helpKeyword="WinJS.UI.SelectionMode.multi">
                /// Multiple items may be selected.
                /// </field>
                multi: "multi"
            },

            /// <field locid="WinJS.UI.TapBehavior" helpKeyword="WinJS.UI.TapBehavior">
            /// Specifies how an ItemContainer or items in a ListView respond to the tap interaction.
            /// </field>
            TapBehavior: {
                /// <field locid="WinJS.UI.TapBehavior.directSelect" helpKeyword="WinJS.UI.TapBehavior.directSelect">
                /// Tapping the item invokes it and selects it. Navigating to the item with the keyboard changes the
                /// the selection so that the focused item is the only item that is selected.
                /// <compatibleWith platform="Windows" minVersion="8.0"/>
                /// </field>
                directSelect: "directSelect",
                /// <field locid="WinJS.UI.TapBehavior.toggleSelect" helpKeyword="WinJS.UI.TapBehavior.toggleSelect">
                /// Tapping the item invokes it. If the item was selected, tapping it clears the selection. If the item wasn't
                /// selected, tapping the item selects it.
                /// Navigating to the item with the keyboard does not select or invoke it.
                /// </field>
                toggleSelect: "toggleSelect",
                /// <field locid="WinJS.UI.TapBehavior.invokeOnly" helpKeyword="WinJS.UI.TapBehavior.invokeOnly">
                /// Tapping the item invokes it. Navigating to the item with keyboard does not select it or invoke it.
                /// </field>
                invokeOnly: "invokeOnly",
                /// <field locid="WinJS.UI.TapBehavior.none" helpKeyword="WinJS.UI.TapBehavior.none">
                /// Nothing happens.
                /// </field>
                none: "none"
            },


            /// <field locid="WinJS.UI.SwipeBehavior" helpKeyword="WinJS.UI.SwipeBehavior">
            /// Specifies whether items are selected when the user performs a swipe interaction.
            /// <compatibleWith platform="Windows" minVersion="8.0"/>
            /// </field>
            SwipeBehavior: {
                /// <field locid="WinJS.UI.SwipeBehavior.select" helpKeyword="WinJS.UI.SwipeBehavior.select">
                /// The swipe interaction selects the items touched by the swipe.
                /// </field>
                select: "select",
                /// <field locid="WinJS.UI.SwipeBehavior.none" helpKeyword="WinJS.UI.SwipeBehavior.none">
                /// The swipe interaction does not change which items are selected.
                /// </field>
                none: "none"
            }
        });
    
})(this, WinJS);

// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
(function constantsInit(global, WinJS, undefined) {
    "use strict";

    var thisWinUI = WinJS.UI;
    thisWinUI._listViewClass = "win-listview";
    thisWinUI._viewportClass = "win-viewport";
    thisWinUI._rtlListViewClass = "win-rtl";
    thisWinUI._horizontalClass = "win-horizontal";
    thisWinUI._verticalClass = "win-vertical";
    thisWinUI._scrollableClass = "win-surface";
    thisWinUI._itemsContainerClass = "win-itemscontainer";
    thisWinUI._padderClass = "win-itemscontainer-padder";
    thisWinUI._proxyClass = "_win-proxy";
    thisWinUI._itemClass = "win-item";
    thisWinUI._itemBoxClass = "win-itembox";
    thisWinUI._itemsBlockClass = "win-itemsblock";
    thisWinUI._containerClass = "win-container";
    thisWinUI._backdropClass = "win-backdrop";
    thisWinUI._footprintClass = "win-footprint";
    thisWinUI._groupsClass = "win-groups";
    thisWinUI._selectedClass = "win-selected";
    thisWinUI._swipeableClass = "win-swipeable";
    thisWinUI._swipeClass = "win-swipe";
    thisWinUI._selectionBorderClass = "win-selectionborder";
    thisWinUI._selectionBackgroundClass = "win-selectionbackground";
    thisWinUI._selectionCheckmarkClass = "win-selectioncheckmark";
    thisWinUI._selectionCheckmarkBackgroundClass = "win-selectioncheckmarkbackground";
    thisWinUI._selectionPartsSelector = ".win-selectionborder, .win-selectionbackground, .win-selectioncheckmark, .win-selectioncheckmarkbackground";
    thisWinUI._pressedClass = "win-pressed";
    thisWinUI._headerClass = "win-groupheader";
    thisWinUI._headerContainerClass = "win-groupheadercontainer";
    thisWinUI._groupLeaderClass = "win-groupleader";
    thisWinUI._progressClass = "win-progress";
    thisWinUI._selectionHintClass = "win-selectionhint";
    thisWinUI._revealedClass = "win-revealed";
    thisWinUI._itemFocusClass = "win-focused";
    thisWinUI._itemFocusOutlineClass = "win-focusedoutline";
    thisWinUI._zoomingXClass = "win-zooming-x";
    thisWinUI._zoomingYClass = "win-zooming-y";
    thisWinUI._listLayoutClass = "win-listlayout";
    thisWinUI._gridLayoutClass = "win-gridlayout";
    thisWinUI._headerPositionTopClass = "win-headerpositiontop";
    thisWinUI._headerPositionLeftClass = "win-headerpositionleft";
    thisWinUI._structuralNodesClass = "win-structuralnodes";
    thisWinUI._uniformGridLayoutClass = "win-uniformgridlayout";
    thisWinUI._uniformListLayoutClass = "win-uniformlistlayout";
    thisWinUI._cellSpanningGridLayoutClass = "win-cellspanninggridlayout";
    thisWinUI._laidOutClass = "win-laidout";
    thisWinUI._nonDraggableClass = "win-nondraggable";
    thisWinUI._nonSelectableClass = "win-nonselectable";
    thisWinUI._nonSwipeableClass = "win-nonswipeable";
    thisWinUI._dragOverClass = "win-dragover";
    thisWinUI._dragSourceClass = "win-dragsource";
    thisWinUI._clipClass = "win-clip";
    thisWinUI._selectionModeClass = "win-selectionmode";
    thisWinUI._noCSSGrid = "win-nocssgrid";
    
    thisWinUI._INVALID_INDEX = -1;
    thisWinUI._UNINITIALIZED = -1;

    thisWinUI._LEFT_MSPOINTER_BUTTON = 0;
    thisWinUI._RIGHT_MSPOINTER_BUTTON = 2;

    thisWinUI._TAP_END_THRESHOLD = 10;
    
    thisWinUI._DEFAULT_PAGES_TO_LOAD = 5;
    thisWinUI._DEFAULT_PAGE_LOAD_THRESHOLD = 2;

    thisWinUI._MIN_AUTOSCROLL_RATE = 150;
    thisWinUI._MAX_AUTOSCROLL_RATE = 1500;
    thisWinUI._AUTOSCROLL_THRESHOLD = 100;
    thisWinUI._AUTOSCROLL_DELAY = 50;

    thisWinUI._DEFERRED_ACTION = 250;
    thisWinUI._DEFERRED_SCROLL_END = 250;

    // For horizontal layouts
    thisWinUI._VERTICAL_SWIPE_SELECTION_THRESHOLD = 39;
    thisWinUI._VERTICAL_SWIPE_SPEED_BUMP_START = 0;
    thisWinUI._VERTICAL_SWIPE_SPEED_BUMP_END = 127;
    thisWinUI._VERTICAL_SWIPE_SELF_REVEAL_GESTURE = 15;

    // For vertical layouts
    thisWinUI._HORIZONTAL_SWIPE_SELECTION_THRESHOLD = 27;
    thisWinUI._HORIZONTAL_SWIPE_SPEED_BUMP_START = 0;
    thisWinUI._HORIZONTAL_SWIPE_SPEED_BUMP_END = 150;
    thisWinUI._HORIZONTAL_SWIPE_SELF_REVEAL_GESTURE = 23;

    thisWinUI._SELECTION_CHECKMARK = "\uE081";

    thisWinUI._LISTVIEW_PROGRESS_DELAY = 2000;
})(this, WinJS);
