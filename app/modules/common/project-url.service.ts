import {Injectable} from "@angular/core";
import * as Immutable from "immutable";

@Injectable()
export class ProjectUrlService {
    get(project: Immutable.Map<string, any>) {
        if (project.get('is_backlog_activated') && (project.get('my_permissions').indexOf("view_us") > -1)) {
            return "/project/" + project.get('slug') + "backlog";
        }
        if (project.get('is_kanban_activated') && (project.get('my_permissions').indexOf("view_us") > -1)) {
            return "/project/" + project.get('slug') + "/kanban";
        }
        if (project.get('is_wiki_activated') && (project.get('my_permissions').indexOf("view_wiki_pages") > -1)) {
            return "/project/" + project.get('slug') + "/wiki";
        }
        if (project.get('is_issues_activated') && (project.get('my_permissions').indexOf("view_issues") > -1)) {
            return "/project/" + project.get('slug') + "/issues";
        }

        return "/project/" + project.get('slug');
    }
}
