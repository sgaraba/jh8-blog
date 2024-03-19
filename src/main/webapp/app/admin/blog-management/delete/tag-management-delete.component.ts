import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import SharedModule from "../../../shared/shared.module";
import { Tag } from '../blog-management.model';
import {TagManagementService} from "../service/tag-management.service";

@Component({
  selector: 'jhi-delete',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './tag-management-delete.component.html',
  styleUrl: './tag-management-delete.component.scss'
})
export class TagManagementDeleteComponent {
  tag? : Tag;

  constructor(
    private tagService: TagManagementService,
    private activeModal: NgbActiveModal,
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id:number): void {
    this.tagService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }

}
