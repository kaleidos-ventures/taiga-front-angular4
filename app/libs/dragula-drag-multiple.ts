/* tslint:disable */

import * as _ from "lodash";

export let dragMultiple: any = {};

const multipleSortableClass = "ui-multisortable-multiple";
const mainClass = "main-drag-item";
let inProgress = false;
let removeEventFn = null;

const reset = function(elm) {
    $(elm)
        .removeAttr("style")
        .removeClass("tg-backlog-us-mirror")
        .removeClass("backlog-us-mirror")
        .data("dragMultipleIndex", null)
        .data("dragMultipleActive", false);
};

const sort = function(positions) {
    const current = dragMultiple.items.elm;

    positions.after.reverse();

    $.each(positions.after, function() {
        reset(this);
        current.after(this);
    });

    $.each(positions.before, function() {
        reset(this);
        current.before(this);
    });
};

const drag = function() {
    const current = dragMultiple.items.elm;
    const container = dragMultiple.items.container;

    const shadow = dragMultiple.items.shadow;

    // following the drag element
    const currentLeft = shadow.position().left;
    const currentTop = shadow.position().top;
    const height = shadow.outerHeight();

    _.forEach(dragMultiple.items.draggingItems, function(elm, index) {
        const elmIndex = parseInt(elm.data("dragMultipleIndex"), 10);
        const top = currentTop + (elmIndex * height);

        elm
            .css({
                top,
                left: currentLeft,
            });
    });
};

const stop = function() {
    inProgress = false;

    refreshOriginal();

    const current = dragMultiple.items.elm;
    const container = dragMultiple.items.container;

    document.documentElement.removeEventListener("mousemove", removeEventFn);

    // reset
    dragMultiple.items = {};

    $("." + mainClass).removeClass(mainClass);
    $(".tg-backlog-us-mirror").remove();
    $(".backlog-us-mirror").removeClass("backlog-us-mirror");

    $(".tg-backlog-us-dragging")
        .removeClass("tg-backlog-us-dragging")
        .show();

    return $("." + multipleSortableClass);
};

const refreshOriginal = function() {
    const index = parseInt(dragMultiple.items.elm.data("dragMultipleIndex"), 10);

    const after = [];
    const before = [];

    _.forEach(dragMultiple.items.draggedItemsOriginal, function(item) {
        if (parseInt($(item).data("dragMultipleIndex"), 10) > index) {
            after.push(item);
        } else {
            before.push(item);
        }
    });

    after.reverse();

    _.forEach(after, function(item) {
        $(item).insertAfter(dragMultiple.items.elm);
    });

    _.forEach(before, function(item) {
        $(item).insertBefore(dragMultiple.items.elm);
    });
};

const isMultiple = function(elm, container) {
    const items = $(container).find("." + multipleSortableClass);

    if (!$(elm).hasClass(multipleSortableClass) || !(items.length > 1)) {
        return false;
    }

    return true;
};

const setIndex = function(items) {
    const before = [];
    const after = [];
    let mainFound = false;
    _.forEach(items, function(item, index) {
        if ($(item).data("dragMultipleIndex") === 0) {
            mainFound = true;
            return;
        }

        if (mainFound) {
            after.push(item);
        } else {
            before.push(item);
        }
    });

    before.reverse();

    _.forEach(after, function(item, index)  {
        $(item).data("dragMultipleIndex", index + 1);
    });

    _.forEach(before, function(item, index)  {
        $(item).data("dragMultipleIndex", -index - 1);
    });
};

dragMultiple.prepare = function(elm, container) {
    inProgress = true;

    let items: any = $(container).find("." + multipleSortableClass);

    _.forEach(items, function(item, index) {
        $(item)
            .data("position", null)
            .data("dragMultipleIndex", null);
    });

    $(elm)
        .data("dragmultiple:originalPosition", $(elm).position())
        .data("dragMultipleActive", true);

    dragMultiple.items = {};

    dragMultiple.items.elm = $(elm);
    dragMultiple.items.container = $(container);

    dragMultiple.items.elm.data("dragMultipleIndex", 0);

    setIndex(items);

    dragMultiple.items.shadow = $(".gu-mirror");

    dragMultiple.items.elm.addClass(mainClass);

    items = _.filter(items, function(item) {
        return !$(item).hasClass(mainClass);
    });

    dragMultiple.items.draggedItemsOriginal = items;

    const itemsCloned = _.map(items, function(item) {
        const clone = $(item).clone(true);

        clone
            .addClass("backlog-us-mirror")
            .addClass("tg-backlog-us-mirror")
            .data("dragmultiple:originalPosition", $(item).position())
            .data("dragMultipleActive", true)
            .css({
                zIndex: "9999",
                opacity: "0.8",
                position: "fixed",
                width: dragMultiple.items.elm.outerWidth(),
                height: dragMultiple.items.elm.outerHeight(),
            });

        $(item)
            .hide()
            .addClass("tg-backlog-us-dragging");

        return clone;
    });

    dragMultiple.items.draggingItems = itemsCloned;

    $(document.body).append(itemsCloned);
};

dragMultiple.start = function(item, container) {
    if (isMultiple(item, container)) {
        document.documentElement.addEventListener("mousemove", function() {
            if (!inProgress) {
                dragMultiple.prepare(item, container);
            }

            drag();

            removeEventFn = arguments.callee;
        });
    }
};

dragMultiple.stop = function() {
    if (inProgress) {
        return stop();
    } else {
        return [];
    }
};
