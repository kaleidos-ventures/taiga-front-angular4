import * as MediumEditor from "medium-editor";
import * as _ from "lodash";

//     const getIcon = (icon) =>
//         `<svg class="icon icon-${icon}">
//     <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${icon}"></use>
// </svg>`
//     ;
const isCodeBlockSelected = (range) => !!getRangeCodeBlock(range).length;
const getRangeCodeBlock = (range) => $(range.endContainer).parentsUntil(".editor", "code");
const refreshCodeBlocks = function(mediumInstance) {
    if (!mediumInstance) { return; }

    // clean empty <p> content editable adds it when range.extractContents has been execute it
    for (const mainChildren of mediumInstance.elements[0].children) {
        if (mainChildren && (mainChildren.tagName.toLowerCase() === "p") && !mainChildren.innerHTML.trim().length) {
            mainChildren.parentNode.removeChild(mainChildren);
        }
    }

    const preList = mediumInstance.elements[0].querySelectorAll("pre");

    return (() => {
        const result = [];
        for (const pre of preList) {
        // prevent edit a pre
            let item;
            pre.setAttribute("contenteditable", false);

            // TODO: Pass it in any way
            // pre.setAttribute("title", $translate.instant("COMMON.WYSIWYG.DB_CLICK"));

            // prevent text selection in firefox
            pre.addEventListener("mousedown", (e) => e.preventDefault());

            if (pre.nextElementSibling && (pre.nextElementSibling.nodeName.toLowerCase() === "p") && !pre.nextElementSibling.children.length) {
                item = pre.nextElementSibling.appendChild(document.createElement("br"));

            // add p after every pre
            } else if (!pre.nextElementSibling || (["p", "ul", "h1", "h2", "h3"].indexOf(pre.nextElementSibling.nodeName.toLowerCase()) === -1)) {
                const p = document.createElement("p");
                p.appendChild(document.createElement("br"));

                item = pre.parentNode.insertBefore(p, pre.nextSibling);
            }
            result.push(item);
        }
        return result;
    })();
};

const removeCodeBlockAndHightlight = function(selection, mediumInstance) {
    let code;
    if ($(selection).is("code")) {
        code = selection;
    } else {
        code = $(selection).closest("code")[0];
    }

    const pre = code.parentNode;

    const p = document.createElement("p");
    p.innerText = code.innerText;

    pre.parentNode.replaceChild(p, pre);
    return mediumInstance.checkContentChanged(mediumInstance.elements[0]);
};

const addCodeBlockAndHightlight = function(range, mediumInstance) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");

    if (!range.startContainer.parentNode.nextSibling) {
        $("<br/>").insertAfter(range.startContainer.parentNode);
    }

    const start = range.endContainer.parentNode.nextSibling;

    const extract = range.extractContents();

    code.appendChild(extract);

    pre.appendChild(code);

    start.parentNode.insertBefore(pre, start);

    refreshCodeBlocks(mediumInstance);
    return mediumInstance.checkContentChanged(mediumInstance.elements[0]);
};


export const AlignRightButton = MediumEditor.extensions.button.extend({
    name: "rtl",
    init() {
        const option = _.find(this.base.options.toolbar.buttons, (it: any) => it.name === "rtl");

        this.button = this.document.createElement("button");
        this.button.classList.add("medium-editor-action");
        this.button.innerHTML = option.contentDefault || "<b>RTL</b>";
        this.button.title = "RTL";
        return this.on(this.button, "click", this.handleClick.bind(this));
    },

    getButton() {
        return this.button;
    },
    handleClick(event) {
        const range = MediumEditor.selection.getSelectionRange(document);
        if (range.commonAncestorContainer.parentNode.style.textAlign === "right") {
            return document.execCommand("justifyLeft", false);
        } else {
            return document.execCommand("justifyRight", false);
        }
    },

});

// MediumEditor extension to add <code>
export const CodeButton = MediumEditor.extensions.button.extend({
    name: "code",
    init() {
        const option = _.find(this.base.options.toolbar.buttons, (it: any) => it.name === "code");

        this.button = this.document.createElement("button");
        this.button.classList.add("medium-editor-action");
        this.button.innerHTML = option.contentDefault || "<b>Code</b>";
        this.button.title = "Code";
        return this.on(this.button, "click", this.handleClick.bind(this));
    },

    getButton() {
        return this.button;
    },

    tagNames: ["code"],

    handleClick(event) {
        const range = MediumEditor.selection.getSelectionRange(self.document);

        if (isCodeBlockSelected(range)) {
            removeCodeBlockAndHightlight(range.endContainer, this.base);
        } else {
            addCodeBlockAndHightlight(range, this.base);
            removeSelections();
        }

        const toolbar = this.base.getExtensionByName("toolbar");

        if (toolbar) {
            return toolbar.hideToolbar();
        }
    },

});

const removeSelections = function() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            return window.getSelection().empty();
        }
    } else if (window.getSelection().removeAllRanges) {
        return window.getSelection().removeAllRanges();

    } else if ((document as any).selection) {
        return (document as any).selection.empty();
    }
};


export const CustomPasteHandler = MediumEditor.extensions.paste.extend({
    doPaste(pastedHTML, pastedPlain, editable) {
        const html = MediumEditor.util.htmlEntities(pastedPlain);
        return MediumEditor.util.insertHTMLCommand(this.document, html);
    },
});
