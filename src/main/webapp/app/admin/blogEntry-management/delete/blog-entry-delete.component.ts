import { Component } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BlogEntry } from '../blogEntry-management.model';
import { BlogEntryManagementService } from '../service/blogEntry-management.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-blog-entry-delete',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './blog-entry-delete.component.html',
  styleUrl: './blog-entry-delete.component.scss'
})
export class BlogEntryDeleteComponent {
  blogEntry?: BlogEntry;

  constructor(
    private blogEntryService: BlogEntryManagementService,
    private activeModal: NgbActiveModal
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.blogEntryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }

}
