import "Flot";
import "Flot/jquery.flot.time";
import "jquery.flot.tooltip";
import "flot-axislabels";
import "l.js";
import * as _ from "lodash";
import "markdown-it";
import "prismjs";
import "prismjs/plugins/custom-class/prism-custom-class";
import "reflect-metadata";
import "zone.js";

// Styles imports
import "./styles/core/main.scss";
import "../node_modules/intro.js/introjs.css";
import "../node_modules/dragula/dist/dragula.css";
import "../node_modules/awesomplete/awesomplete.css";
import "../node_modules/medium-editor/dist/css/medium-editor.css";
import "../node_modules/medium-editor/dist/css/themes/default.css";
import "../node_modules/prismjs/themes/prism-okaidia.css";

import "./export-to-plugins";

import {generateUniqueSessionIdentifier} from "./libs/utils";

export let taigaContribPlugins = [];
export let sessionId = generateUniqueSessionIdentifier();

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

(window as any).taigaConfig = {
    api: "http://localhost:8000/api/v1/",
    eventsUrl: null,
    tribeHost: null,
    eventsMaxMissedHeartbeats: 5,
    eventsHeartbeatIntervalTime: 60000,
    debug: true,
    defaultLanguage: "en",
    themes: ["taiga", "material-design", "high-contrast"],
    defaultTheme: "taiga",
    publicRegisterEnabled: true,
    feedbackEnabled: true,
    privacyPolicyUrl: null,
    termsOfServiceUrl: null,
    maxUploadFileSize: null,
    importers: [],
    contribPlugins: [],
};

(window as any).taigaContribPlugins = [];
(window as any)._decorators = [];
(window as any).addDecorator = (provider, decorator) => (window as any)._decorators.push({provider, decorator});
(window as any).getDecorators = () => (window as any)._decorators;

function loadStylesheet(path: string) {
    $("head").append(`<link rel="stylesheet" href="${path}" type="text/css" />`);
}

function loadPlugin(pluginPath: string) {
    return new Promise(function(resolve, reject) {
        const success = function(plugin) {
            (window as any).taigaContribPlugins.push(plugin);
            if (plugin.css) {
                loadStylesheet(plugin.css);
            }

            //dont' wait for css
            if (plugin.js) {
                return ljs.load(plugin.js, resolve);
            } else {
                return resolve();
            }
        };

        const fail = () => console.error("error loading", pluginPath);

        return $.getJSON(pluginPath).then(success, fail);
    });
}

function loadPlugins(plugins: string[]) {
    const promises = _.map(plugins, (pluginPath) => loadPlugin(pluginPath));
    return Promise.all(promises);
}

const promise = $.getJSON("/conf.json");
promise.done((data) => (window as any).taigaConfig = _.assign({}, (window as any).taigaConfig, data));
promise.fail(() => console.error("Your conf.json file is not a valid json file, please review it."));
promise.always(function() {
    if (!(window as any).taigaConfig.debug) {
        enableProdMode();
    }

    if ((window as any).taigaConfig.contribPlugins.length > 0) {
        return loadPlugins((window as any).taigaConfig.contribPlugins).then(() => {
            platformBrowserDynamic().bootstrapModule(AppModule);
        });
    } else {
        platformBrowserDynamic().bootstrapModule(AppModule);
    }
});
