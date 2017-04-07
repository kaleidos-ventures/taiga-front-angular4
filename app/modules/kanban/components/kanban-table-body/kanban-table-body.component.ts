import {Component, Input} from "@angular/core";

@Component({
    selector: "tg-kanban-table-body",
    template: require("./kanban-table-body.pug"),
})
export class KanbanTableBody {
    @Input() statuses: any;
    @Input() items: any;
    @Input() folds: any;
    @Input() zoom: any;
    @Input() nested: boolean;
    @Input() archivedWatched: any;
    @Input() project: any;
    blockFolded:any = {}

    trackStatusFn(idx, status) {
        return status.get("id");
    }

    trackItemFn(idx, us) {
        return us.get("id");
    }

    foldBlock(block) {
        this.blockFolded[block.get('id')] = true;
    }

    unfoldBlock(block) {
        this.blockFolded[block.get('id')] = false;
    }
}
