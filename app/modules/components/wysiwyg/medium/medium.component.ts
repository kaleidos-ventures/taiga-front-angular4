import {getIcon} from "./medium.utils";
import {Component, Input, ElementRef, HostBinding, HostListener, Output, EventEmitter} from "@angular/core";
import {MentionExtension} from "../../../../libs/medium-mention";
import * as Medium from "medium-editor"
import * as AutoList from "medium-editor-autolist";
import * as extensions from "./medium.extensions";

@Component({
    selector: "tg-medium-editor",
    template: "",
})
export class MediumEditor {
    @HostBinding("innerHTML") @Input() html: string;
    @Output() htmlChange: EventEmitter<string>;
    @Input() placeholder: string = "";
    instance: Medium;

    onChange(event) {
        this.htmlChange.emit(this.el.nativeElement.innerHTML)
    }

    constructor(private el: ElementRef) {
        this.htmlChange = new EventEmitter();
        this.instance = new Medium(this.el.nativeElement, {
            imageDragging: false,
            placeholder: {
                text: this.placeholder,
            },
            toolbar: {
                buttons: [
                    {
                        name: "bold",
                        contentDefault: getIcon("editor-bold"),
                    },
                    {
                        name: "italic",
                        contentDefault: getIcon("editor-italic"),
                    },
                    {
                        name: "strikethrough",
                        contentDefault: getIcon("editor-cross-out"),
                    },
                    {
                        name: "anchor",
                        contentDefault: getIcon("editor-link"),
                    },
                    {
                        name: "image",
                        contentDefault: getIcon("editor-image"),
                    },
                    {
                        name: "orderedlist",
                        contentDefault: getIcon("editor-list-n"),
                    },
                    {
                        name: "unorderedlist",
                        contentDefault: getIcon("editor-list-o"),
                    },
                    {
                        name: "h1",
                        contentDefault: getIcon("editor-h1"),
                    },
                    {
                        name: "h2",
                        contentDefault: getIcon("editor-h2"),
                    },
                    {
                        name: "h3",
                        contentDefault: getIcon("editor-h3"),
                    },
                    {
                        name: "quote",
                        contentDefault: getIcon("editor-quote"),
                    },
                    {
                        name: "removeFormat",
                        contentDefault: getIcon("editor-no-format"),
                    },
                    {
                        name: "rtl",
                        contentDefault: getIcon("editor-rtl"),
                    },
                    {
                        name: "code",
                        contentDefault: getIcon("editor-code"),
                    },
                ],
            },
            extensions: {
                paste: new extensions.CustomPasteHandler(),
                code: new extensions.CodeButton(),
                autolist: new AutoList(),
                alignright: new extensions.AlignRightButton(),
                mediumMention: new MentionExtension({
                    getItems(mention, mentionCb) {
                        // return wysiwygMentionService.search(mention).then(mentionCb);
                    },
                }),
            },
        });
        this.instance.subscribe('editableChange', this.onChange.bind(this));
    }
}
