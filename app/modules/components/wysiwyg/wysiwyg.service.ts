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
 * File: modules/components/wysiwyg/wysiwyg.service.coffee
 */

import {Injectable} from "@angular/core";
import * as Autolinker from "autolinker";
import * as _ from "lodash";
import * as markdownit from "markdown-it";
import * as toMarkdown from "to-markdown";
import {markdownitLazyHeaders} from "../../../libs/markdown-it-lazy-headers";
import {getMatches, slugify} from "../../../libs/utils";
import {WysiwygCodeHightlighterService} from "./wysiwyg-code-hightlighter.service";
declare var _version: string;

@Injectable()
export class WysiwygService {
    emojis: any;
    tagBuilder: any;

    constructor(private wysiwygCodeHightlighterService: WysiwygCodeHightlighterService) {}

    searchEmojiByName(name) {
        return _.filter(this.emojis, (it: any) => it.name.indexOf(name) !== -1);
    }

    // TODO: Move to the Redux flux
    // setEmojiImagePath(emojis) {
    //     return this.emojis = _.map(emojis, function(it: any) {
    //         it.image = `/${_version}/emojis/` + it.image;
    //
    //         return it;
    //     });
    // }
    //
    // loadEmojis() {
    //     return $.getJSON(`/${_version}/emojis/emojis-data.json`).then(this.setEmojiImagePath.bind(this));
    // }

    getEmojiById(id) {
        return _.find(this.emojis, (it: any) => it.id === id);
    }

    getEmojiByName(name) {
        return _.find(this.emojis, (it: any) => it.name === name);
    }

    replaceImgsByEmojiName(html) {
        const emojiIds = getMatches(html, /emojis\/([^"]+).png"/gi);

        for (const emojiId of emojiIds) {
            const regexImgs = new RegExp(`<img(.*)${emojiId}[^>]+\>`, "g");
            const emoji = this.getEmojiById(emojiId);
            html = html.replace(regexImgs, `:${emoji.name}:`);
        }

        return html;
    }

    replaceEmojiNameByImgs(text) {
        const emojiIds = getMatches(text, /:([\w ]*):/g);

        for (const emojiId of emojiIds) {
            const regexImgs = new RegExp(`:${emojiId}:`, "g");
            const emoji = this.getEmojiByName(emojiId);

            if (emoji) {
                text = text.replace(regexImgs, `![alt](${emoji.image})`);
            }
        }

        return text;
    }

    pipeLinks(text) {
        return text.replace(/\[\[(.*?)\]\]/g, function(match, p1, offset, str) {
            const linkParams = p1.split("|");

            const link = linkParams[0];
            const title = linkParams[1] || linkParams[0];

            return `[${title}](${link})`;
        });
    }

    linkTitleWithSpaces(text) {
        const link = /\[[^\]]*\]\(([^\)]*)\)/g; // [Title-with-spaces](Title with spaces)

        return text.replace(link, function(match, p1, offset, str) {
            if (p1.indexOf(" ") >= 0) {
                return match.replace(/\(.*\)/, `(${slugify(p1)})`);
            } else {
                return match;
            }
        });
    }

    replaceUrls(html) {
        const el = document.createElement( "html" );
        el.innerHTML = html;

        const links = el.querySelectorAll("a");

        for (const link of [].slice.call(links)) {
            if (link.getAttribute("href").indexOf("/profile/") !== -1) {
                link.parentNode.replaceChild(document.createTextNode(link.innerText), link);
            } else if (link.getAttribute("href").indexOf("/t/") !== -1) {
                link.parentNode.replaceChild(document.createTextNode(link.innerText), link);
            }
        }

        return el.innerHTML;
    }

    searchWikiLinks(html, project) {
        const el = document.createElement( "html" );
        el.innerHTML = html;

        const links = el.querySelectorAll("a");

        for (const link of [].slice.call(links)) {
            if (link.getAttribute("href").indexOf("/") === -1) {
                // TODO: Build it with the angular 2 routing system
                const url = "/project/" + project.get('slug') + "/wiki/" + link.getAttribute("href")

                link.setAttribute("href", url);
            }
        }

        return el.innerHTML;
    }

    removeTrailingListBr(text) {
        return text.replace(/<li>(.*?)<br><\/li>/g, "<li>$1</li>");
    }

    getMarkdown(html) {
        // https://github.com/yabwe/medium-editor/issues/543
        const cleanIssueConverter = {
            filter: ["html", "body", "span", "div"],
            replacement(innerHTML) {
                return innerHTML;
            },
        };

        const codeLanguageConverter = {
            filter:  (node) => {
                return (node.nodeName === "PRE") &&
                  node.firstChild &&
                  (node.firstChild.nodeName === "CODE");
            },
            replacement: (content, node) => {
                let lan = this.wysiwygCodeHightlighterService.getLanguageInClassList(node.firstChild.classList);
                if (!lan) { lan = ""; }

                return `\n\n\`\`\`${lan}\n${_.trim(node.firstChild.textContent)}\n\`\`\`\n\n`;
            },
         };

        html = html.replace(/&nbsp;(<\/.*>)/g, "$1");
        html = this.replaceImgsByEmojiName(html);
        html = this.replaceUrls(html);
        html = this.removeTrailingListBr(html);

        const markdown = toMarkdown(html, {
            gfm: true,
            converters: [cleanIssueConverter, codeLanguageConverter],
        });

        return markdown;
    }

    parseMentionMatches(text) {
        const serviceName = "twitter";
        const { tagBuilder } = this;
        const matches = [];

        const regex = /@[^\s]{1,50}[^.\s]/g;
        let m = regex.exec(text);

        while (m !== null) {
            const offset = m.index;
            const prevChar = text.charAt( offset - 1 );

            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) =>
                matches.push( new Autolinker.match.Mention({
                    tagBuilder,
                    matchedText   : match,
                    offset,
                    serviceName,
                    mention       : match.slice(1),
                })),
            );

            m = regex.exec(text);
        }

        return matches;
    }

    autoLinkHTML(html, project) {
        // override Autolink parser
        let matchRegexStr = String(Autolinker.matcher.Mention.prototype.matcherRegexes.twitter);
        if (matchRegexStr.indexOf(".") === -1) {
            matchRegexStr = "@[^\s]{1,50}[^.\s]";
        }

        const autolinker = new Autolinker({
            mention: "twitter",
            hashtag: "twitter",
            replaceFn: (match) => {
                if  (match.getType() === "mention") {
                    // TODO: Build it with the angular 2 routing system
                    const profileUrl = "/profile/" + match.getMention();
                    return `<a class="autolink" href="${profileUrl}">@${match.getMention()}</a>`;
                } else if (match.getType() === "hashtag") {
                    // TODO: Build it with the angular 2 routing system
                    const url = "/project/" + project.get('slug') + "/t/" + match.getHashtag();
                    return `<a class="autolink" href="${url}">#${match.getHashtag()}</a>`;
                }
            },
        });

        Autolinker.matcher.Mention.prototype.parseMatches = this.parseMentionMatches.bind(autolinker);

        return autolinker.link(html);
    }

    getHTML(text, project) {
        if (!text || !text.length) { return ""; }

        const options = {
            breaks: true,
        };

        text = this.replaceEmojiNameByImgs(text);
        text = this.pipeLinks(text);
        text = this.linkTitleWithSpaces(text);

        const md = markdownit({
            breaks: true,
        });

        md.use(markdownitLazyHeaders);
        let result = md.render(text);
        result = this.searchWikiLinks(result, project);

        result = this.autoLinkHTML(result, project);

        return result;
    }
}
