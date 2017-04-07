import {Component, Input} from "@angular/core";

@Component({
    selector: "tg-kanban-archived-status-intro",
    template: `<div class="kanban-column-intro"
                    *ngIf="status.get('is_archived') && !hasStoriesToShow"
                    translate="KANBAN.HIDDEN_USER_STORIES"></div>
              `,
})
export class KanbanArchivedStatusIntro {
    @Input() status: any;
    @Input() hasStoriesToShow: any;
}
