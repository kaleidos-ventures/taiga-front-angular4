/*
 * Copyright (C) 2014-2017 Andrey Antukh <niwi@niwi.nz>
 * Copyright (C) 2014-2017 Jesús Espino Garcia <jespinog@gmail.com>
 * Copyright (C) 2014-2017 David Barragán Merino <bameda@dbarragan.com>
 * Copyright (C) 2014-2017 Alejandro Alonso <alejandro.alonso@kaleidos.net>
 * Copyright (C) 2014-2017 Juan Francisco Alcántara <juanfran.alcantara@kaleidos.net>
 * Copyright (C) 2014-2017 Xavi Julian <xavier.julian@kaleidos.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: modules/components/wysiwyg/wysiwyg.directive.coffee
 */

import {Component, Input, OnInit} from "@angular/core";
import {WysiwygService} from "./wysiwyg.service";
import {StorageService} from "../../base/storage";
import * as Immutable from "immutable";

@Component({
    selector: "tg-wysiwyg",
    template: require("./wysiwyg.pug"),
})
export class Wysiwyg implements OnInit {
    @Input() text: string;
    @Input() placeholder: string;
    @Input() project: Immutable.Map<string, any>;
    mode: string;
    html: string;
    editMode: boolean = false;

    constructor(private storage: StorageService, private wysiwygService: WysiwygService) {}

    ngOnInit() {
        this.mode = this.storage.get('editor-mode', 'html');
        this.setHtmlMedium(this.text);
    }

    setMode(mode) {
        this.storage.set("editor-mode", mode);
        if (mode === "markdown") {
            this.updateMarkdownWithCurrentHtml();
        } else {
            this.setHtmlMedium(this.text);
        }
        this.mode = mode;

        // TODO
        // mediumInstance.trigger("editableBlur", {}, editorMedium[0]);
    }

    updateMarkdownWithCurrentHtml() {
        let element = $(this.html);
        element.find("code br").replaceWith("\n");
        let html = element.html();
        this.text = this.wysiwygService.getMarkdown(html);
    };

    setHtmlMedium(markdown) {
        this.html = this.wysiwygService.getHTML(markdown, this.project);
        // editorMedium.html(html);
        // wysiwygCodeHightlighterService.addHightlighter(mediumInstance.elements[0]);
        //
        // if ($scope.editMode) {
        //     return refreshCodeBlocks(mediumInstance);
        // }
    };

//     const removeSelections = function() {
//         if (window.getSelection) {
//             if (window.getSelection().empty) {
//                 return window.getSelection().empty();
//             }
//         } else if (window.getSelection().removeAllRanges) {
//             return window.getSelection().removeAllRanges();
//
//         } else if ((document as any).selection) {
//             return (document as any).selection.empty();
//         }
//     };
//
//     const getRangeCodeBlock = (range) => $(range.endContainer).parentsUntil(".editor", "code");
//
//     const isCodeBlockSelected = (range) => !!getRangeCodeBlock(range).length;
//
//     const removeCodeBlockAndHightlight = function(selection, mediumInstance) {
//         let code;
//         if ($(selection).is("code")) {
//             code = selection;
//         } else {
//             code = $(selection).closest("code")[0];
//         }
//
//         const pre = code.parentNode;
//
//         const p = document.createElement("p");
//         p.innerText = code.innerText;
//
//         pre.parentNode.replaceChild(p, pre);
//         return mediumInstance.checkContentChanged(mediumInstance.elements[0]);
//     };
//
//     const addCodeBlockAndHightlight = function(range, mediumInstance) {
//         const pre = document.createElement("pre");
//         const code = document.createElement("code");
//
//         if (!range.startContainer.parentNode.nextSibling) {
//             $("<br/>").insertAfter(range.startContainer.parentNode);
//         }
//
//         const start = range.endContainer.parentNode.nextSibling;
//
//         const extract = range.extractContents();
//
//         code.appendChild(extract);
//
//         pre.appendChild(code);
//
//         start.parentNode.insertBefore(pre, start);
//
//         refreshCodeBlocks(mediumInstance);
//         return mediumInstance.checkContentChanged(mediumInstance.elements[0]);
//     };
//
//     const refreshCodeBlocks = function(mediumInstance) {
//         if (!mediumInstance) { return; }
//
//         // clean empty <p> content editable adds it when range.extractContents has been execute it
//         for (const mainChildren of mediumInstance.elements[0].children) {
//             if (mainChildren && (mainChildren.tagName.toLowerCase() === "p") && !mainChildren.innerHTML.trim().length) {
//                 mainChildren.parentNode.removeChild(mainChildren);
//             }
//         }
//
//         const preList = mediumInstance.elements[0].querySelectorAll("pre");
//
//         return (() => {
//             const result = [];
//             for (const pre of preList) {
//             // prevent edit a pre
//                 let item;
//                 pre.setAttribute("contenteditable", false);
//
//                 pre.setAttribute("title", $translate.instant("COMMON.WYSIWYG.DB_CLICK"));
//
//                 // prevent text selection in firefox
//                 pre.addEventListener("mousedown", (e) => e.preventDefault());
//
//                 if (pre.nextElementSibling && (pre.nextElementSibling.nodeName.toLowerCase() === "p") && !pre.nextElementSibling.children.length) {
//                     item = pre.nextElementSibling.appendChild(document.createElement("br"));
//
//                 // add p after every pre
//                 } else if (!pre.nextElementSibling || (["p", "ul", "h1", "h2", "h3"].indexOf(pre.nextElementSibling.nodeName.toLowerCase()) === -1)) {
//                     const p = document.createElement("p");
//                     p.appendChild(document.createElement("br"));
//
//                     item = pre.parentNode.insertBefore(p, pre.nextSibling);
//                 }
//                 result.push(item);
//             }
//             return result;
//         })();
//     };
//
//     const AlignRightButton = MediumEditor.extensions.button.extend({
//         name: "rtl",
//         init() {
//             const option = _.find(this.base.options.toolbar.buttons, (it: any) => it.name === "rtl");
//
//             this.button = this.document.createElement("button");
//             this.button.classList.add("medium-editor-action");
//             this.button.innerHTML = option.contentDefault || "<b>RTL</b>";
//             this.button.title = "RTL";
//             return this.on(this.button, "click", this.handleClick.bind(this));
//         },
//
//         getButton() {
//             return this.button;
//         },
//         handleClick(event) {
//             const range = MediumEditor.selection.getSelectionRange(document);
//             if (range.commonAncestorContainer.parentNode.style.textAlign === "right") {
//                 return document.execCommand("justifyLeft", false);
//             } else {
//                 return document.execCommand("justifyRight", false);
//             }
//         },
//
//     });
//
//
//     // MediumEditor extension to add <code>
//     const CodeButton = MediumEditor.extensions.button.extend({
//         name: "code",
//         init() {
//             const option = _.find(this.base.options.toolbar.buttons, (it: any) => it.name === "code");
//
//             this.button = this.document.createElement("button");
//             this.button.classList.add("medium-editor-action");
//             this.button.innerHTML = option.contentDefault || "<b>Code</b>";
//             this.button.title = "Code";
//             return this.on(this.button, "click", this.handleClick.bind(this));
//         },
//
//         getButton() {
//             return this.button;
//         },
//
//         tagNames: ["code"],
//
//         handleClick(event) {
//             const range = MediumEditor.selection.getSelectionRange(self.document);
//
//             if (isCodeBlockSelected(range)) {
//                 removeCodeBlockAndHightlight(range.endContainer, this.base);
//             } else {
//                 addCodeBlockAndHightlight(range, this.base);
//                 removeSelections();
//             }
//
//             const toolbar = this.base.getExtensionByName("toolbar");
//
//             if (toolbar) {
//                 return toolbar.hideToolbar();
//             }
//         },
//
//     });
//
//     const CustomPasteHandler = MediumEditor.extensions.paste.extend({
//         doPaste(pastedHTML, pastedPlain, editable) {
//             const html = MediumEditor.util.htmlEntities(pastedPlain);
//             return MediumEditor.util.insertHTMLCommand(this.document, html);
//         },
//     });
//
//     // bug
//     // <pre><code></code></pre> the enter key press doesn't work
//     const oldIsBlockContainer = MediumEditor.util.isBlockContainer;
//
//     MediumEditor.util.isBlockContainer = function(element) {
//         let tagName;
//         if (!element) {
//             return oldIsBlockContainer(element);
//         }
//
//         if (element.tagName) {
//             ({ tagName } = element);
//         } else {
//             ({ tagName } = element.parentNode);
//         }
//
//         if (tagName.toLowerCase() === "code") {
//             return true;
//         }
//
//         return oldIsBlockContainer(element);
//     };
//
//     const link = function($scope, $el, $attrs) {
//         let mediumInstance = null;
//         const editorMedium = $el.find(".medium");
//         const editorMarkdown = $el.find(".markdown");
//         let codeBlockSelected = null;
//
//         const isEditOnly = !!$attrs.$attr.editonly;
//         const notPersist = !!$attrs.$attr.notPersist;
//
//         $scope.required = !!$attrs.$attr.required;
//         $scope.editMode = isEditOnly || false;
//         $scope.mode = $storage.get("editor-mode", "html");
//         $scope.markdown = "";
//         $scope.codeEditorVisible = false;
//         $scope.codeLans = [];
//
//         wysiwygService.loadEmojis();
//
//         wysiwygCodeHightlighterService.getLanguages().then((codeLans) => $scope.codeLans = codeLans);
//
//         const setEditMode = (editMode) => $scope.editMode = editMode;
//
//         const setHtmlMedium = function(markdown) {
//             const html = wysiwygService.getHTML(markdown);
//             editorMedium.html(html);
//             wysiwygCodeHightlighterService.addHightlighter(mediumInstance.elements[0]);
//
//             if ($scope.editMode) {
//                 return refreshCodeBlocks(mediumInstance);
//             }
//         };
//
//         $scope.saveSnippet = function(lan, code) {
//             $scope.codeEditorVisible = false;
//             codeBlockSelected.innerText = code;
//             const codePre = codeBlockSelected.parentNode;
//
//             if (lan === "remove-formating") {
//                     codeBlockSelected.className = "";
//                     codePre.className = "";
//
//                     removeCodeBlockAndHightlight(codeBlockSelected, mediumInstance);
//             } else if (_.trim(code).length) {
//                 if (lan) {
//                     codeBlockSelected.className = `language-${lan}`;
//                     codePre.className = `language-${lan}`;
//                 } else {
//                     codeBlockSelected.className = "";
//                     codePre.className = "";
//                 }
//
//                 wysiwygCodeHightlighterService.hightlightCode(codeBlockSelected);
//                 mediumInstance.checkContentChanged(mediumInstance.elements[0]);
//             } else {
//                 codeBlockSelected.parentNode.parentNode.removeChild(codeBlockSelected.parentNode);
//                 mediumInstance.checkContentChanged(mediumInstance.elements[0]);
//             }
//
//             throttleChange();
//
//             return null;
//         };
//
//         $scope.setMode = function(mode) {
//             $storage.set("editor-mode", mode);
//
//             if (mode === "markdown") {
//                 updateMarkdownWithCurrentHtml();
//             } else {
//                 setHtmlMedium($scope.markdown);
//             }
//
//             $scope.mode = mode;
//             return mediumInstance.trigger("editableBlur", {}, editorMedium[0]);
//         };
//
//         $scope.save = function(e) {
//             if (e) { e.preventDefault(); }
//
//             if ($scope.mode === "html") {
//                 updateMarkdownWithCurrentHtml();
//             }
//
//             setHtmlMedium($scope.markdown);
//
//             if ($scope.required && !$scope.markdown.length) { return; }
//
//             $scope.saving  = true;
//             $scope.outdated = false;
//
//             $scope.onSave({text: $scope.markdown, cb: saveEnd});
//
//         };
//
//         $scope.cancel = function(e) {
//             if (e) { e.preventDefault(); }
//
//             if (!isEditOnly) {
//                 setEditMode(false);
//             }
//
//             if (notPersist) {
//                 clean();
//             } else if ($scope.mode === "html") {
//                 setHtmlMedium($scope.content || null);
//             }
//
//             $scope.markdown = $scope.content;
//
//             discardLocalStorage();
//             mediumInstance.trigger("blur", {}, editorMedium[0]);
//             $scope.outdated = false;
//             refreshCodeBlocks(mediumInstance);
//
//             $scope.onCancel();
//
//         };
//
//         const clean = function() {
//             $scope.markdown = "";
//             return editorMedium.html("");
//         };
//
//         const saveEnd = function() {
//             $scope.saving  = false;
//
//             if (!isEditOnly) {
//                 setEditMode(false);
//             }
//
//             if (notPersist) {
//                 clean();
//             }
//
//             discardLocalStorage();
//             mediumInstance.trigger("blur", {}, editorMedium[0]);
//
//             return analytics.trackEvent("develop", "save wysiwyg", $scope.mode, 1);
//         };
//
//         const uploadEnd = function(name, url) {
//             if (isImage(name)) {
//                 return mediumInstance.pasteHTML(`<img src='${url}' /><br/>`);
//             } else {
//                 name = $("<div/>").text(name).html();
//                 return mediumInstance.pasteHTML(`<a target='_blank' href='${url}'>${name}</a><br/>`);
//             }
//         };
//
//         const isOutdated = function() {
//             const store = $storage.get($scope.storageKey);
//
//             if (store && store.version && (store.version !== $scope.version)) {
//                 return true;
//             }
//
//             return false;
//         };
//
//         const isDraft = function() {
//             const store = $storage.get($scope.storageKey);
//
//             if (store) {
//                 return true;
//             }
//
//             return false;
//         };
//
//         const getCurrentContent = function() {
//             const store = $storage.get($scope.storageKey);
//
//             if (store) {
//                 return store.text;
//             }
//
//             return $scope.content;
//         };
//
//         const discardLocalStorage = () => $storage.remove($scope.storageKey);
//
//         const cancelWithConfirmation = function() {
//             if ($scope.content === $scope.markdown) {
//                 $scope.cancel();
//
//                 (document.activeElement as HTMLElement).blur();
//                 document.body.click();
//
//                 return null;
//             }
//
//             const title = $translate.instant("COMMON.CONFIRM_CLOSE_EDIT_MODE_TITLE");
//             const message = $translate.instant("COMMON.CONFIRM_CLOSE_EDIT_MODE_MESSAGE");
//
//             return $confirm.ask(title, null, message).then(function(askResponse) {
//                 $scope.cancel();
//                 return askResponse.finish();
//             });
//         };
//
//         // firefox adds br instead of new lines inside <code>, taiga must replace the br by \n before sending to the server
//         const replaceCodeBrToNl = function() {
//             const html = $("<div></div>").html(editorMedium.html());
//             html.find("code br").replaceWith("\n");
//
//             return html.html();
//         };
//
//         const updateMarkdownWithCurrentHtml = function() {
//             const html = replaceCodeBrToNl();
//             return $scope.markdown = wysiwygService.getMarkdown(html);
//         };
//
//         const localSave = function(markdown) {
//             if ($scope.storageKey) {
//                 const store: any = {};
//                 store.version = $scope.version || 0;
//                 store.text = markdown;
//                 return $storage.set($scope.storageKey, store);
//             }
//         };
//
//         const change = function() {
//             if ($scope.mode === "html") {
//                 updateMarkdownWithCurrentHtml();
//             }
//
//             localSave($scope.markdown);
//
//             return $scope.onChange({markdown: $scope.markdown});
//         };
//
//         const throttleChange = _.throttle(change, 200);
//
//         const create = function(text, editMode) {
//             if (editMode == null) { editMode = false; }
//             if (text.length) {
//                 const html = wysiwygService.getHTML(text);
//                 editorMedium.html(html);
//             }
//
//             mediumInstance = new MediumEditor(editorMedium[0], {
//                 imageDragging: false,
//                 placeholder: {
//                     text: $scope.placeholder,
//                 },
//                 toolbar: {
//                     buttons: [
//                         {
//                             name: "bold",
//                             contentDefault: getIcon("editor-bold"),
//                         },
//                         {
//                             name: "italic",
//                             contentDefault: getIcon("editor-italic"),
//                         },
//                         {
//                             name: "strikethrough",
//                             contentDefault: getIcon("editor-cross-out"),
//                         },
//                         {
//                             name: "anchor",
//                             contentDefault: getIcon("editor-link"),
//                         },
//                         {
//                             name: "image",
//                             contentDefault: getIcon("editor-image"),
//                         },
//                         {
//                             name: "orderedlist",
//                             contentDefault: getIcon("editor-list-n"),
//                         },
//                         {
//                             name: "unorderedlist",
//                             contentDefault: getIcon("editor-list-o"),
//                         },
//                         {
//                             name: "h1",
//                             contentDefault: getIcon("editor-h1"),
//                         },
//                         {
//                             name: "h2",
//                             contentDefault: getIcon("editor-h2"),
//                         },
//                         {
//                             name: "h3",
//                             contentDefault: getIcon("editor-h3"),
//                         },
//                         {
//                             name: "quote",
//                             contentDefault: getIcon("editor-quote"),
//                         },
//                         {
//                             name: "removeFormat",
//                             contentDefault: getIcon("editor-no-format"),
//                         },
//                         {
//                             name: "rtl",
//                             contentDefault: getIcon("editor-rtl"),
//                         },
//                         {
//                             name: "code",
//                             contentDefault: getIcon("editor-code"),
//                         },
//                     ],
//                 },
//                 extensions: {
//                     paste: new CustomPasteHandler(),
//                     code: new CodeButton(),
//                     autolist: new AutoList(),
//                     alignright: new AlignRightButton(),
//                     mediumMention: new MentionExtension({
//                         getItems(mention, mentionCb) {
//                             return wysiwygMentionService.search(mention).then(mentionCb);
//                         },
//                     }),
//                 },
//             });
//
//             $scope.changeMarkdown = throttleChange;
//
//             mediumInstance.subscribe("editableInput", (e) => $scope.$applyAsync(throttleChange));
//
//             mediumInstance.subscribe("editableClick", function(e) {
//                 const r = new RegExp("^(?:[a-z]+:)?//", "i");
//
//                 if (e.target.href) {
//                     if (r.test(e.target.getAttribute("href")) || (e.target.getAttribute("target") === "_blank")) {
//                         e.stopPropagation();
//                         return window.open(e.target.href);
//                     } else {
//                         return $location.url(e.target.href);
//                     }
//                 }
//             });
//
//             mediumInstance.subscribe("editableDrop", (event) => $scope.onUploadFile({files: event.dataTransfer.files, cb: uploadEnd}));
//
//             mediumInstance.subscribe("editableKeydown", function(e) {
//                 const code = e.keyCode ? e.keyCode : e.which;
//
//                 const mention = $(".medium-mention");
//
//                 if (((code === 40) || (code === 38)) && mention.length) {
//                     e.stopPropagation();
//                     e.preventDefault();
//
//                     return;
//                 }
//
//                 if ($scope.editMode && (code === 27)) {
//                     e.stopPropagation();
//                     return $scope.$applyAsync(cancelWithConfirmation);
//                 } else if (code === 27) {
//                     return editorMedium.blur();
//                 }
//             });
//
//             setEditMode(editMode);
//
//             return $scope.$applyAsync(function() {
//                 wysiwygCodeHightlighterService.addHightlighter(mediumInstance.elements[0]);
//                 return refreshCodeBlocks(mediumInstance);
//             });
//         };
//
//         $(editorMedium[0]).on("mousedown", function(e) {
//             if (e.target.getAttribute("href")) {
//                 e.preventDefault();
//                 return e.stopPropagation();
//             } else {
//                 return $scope.$applyAsync(function() {
//                     if (!$scope.editMode) {
//                         setEditMode(true);
//                         return refreshCodeBlocks(mediumInstance);
//                     }
//                 });
//             }
//         });
//
//         $(editorMedium[0]).on("dblclick", "pre", (e) =>
//             $scope.$applyAsync(function() {
//                 $scope.codeEditorVisible = true;
//
//                 codeBlockSelected = e.currentTarget.querySelector("code");
//
//                 $scope.currentCodeLanguage = wysiwygCodeHightlighterService.getLanguageInClassList(codeBlockSelected.classList);
//                 return $scope.code = codeBlockSelected.innerText;
//             }),
//         );
//
//         const unwatch = $scope.$watch("content", function(content) {
//             if (!_.isUndefined(content)) {
//                 $scope.outdated = isOutdated();
//
//                 if (!mediumInstance && isDraft()) {
//                     setEditMode(true);
//                 }
//
//                 if (($scope.markdown.length || content.length) && ($scope.markdown === content)) {
//                     return;
//                 }
//
//                 content = getCurrentContent();
//
//                 $scope.markdown = content;
//
//                 if (mediumInstance) {
//                     mediumInstance.destroy();
//                 }
//
//                 if (tgLoader.open()) {
//                     const unwatchLoader = tgLoader.onEnd(function() {
//                         create(content, $scope.editMode);
//                         return unwatchLoader();
//                     });
//                 } else {
//                     create(content, $scope.editMode);
//                 }
//
//                 return unwatch();
//             }
//         });
//
//         return $scope.$on("$destroy", function() {
//             if (mediumInstance) {
//                 if (editorMedium.length) { $(editorMedium[0]).off(); }
//                 return mediumInstance.destroy();
//             }
//         });
//     };
//
//     return {
//         templateUrl: "common/components/wysiwyg-toolbar.html",
//         scope: {
//             placeholder: "@",
//             version: "<",
//             storageKey: "<",
//             content: "<",
//             onCancel: "&",
//             onSave: "&",
//             onUploadFile: "&",
//             onChange: "&",
//         },
//         link,
//     };
}
