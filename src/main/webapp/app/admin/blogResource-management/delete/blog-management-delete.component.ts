import { Component } from '@angular/core';
import SharedModule from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Blog } from '../blogResource-management.model';
import { BlogManagementService } from '../service/blog-management.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-delete',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './blog-management-delete.component.html',
  styleUrl: './blog-management-delete.component.scss'
})
export class BlogManagementDeleteComponent {
  blog? : Blog;

  constructor(
    private blogService: BlogManagementService,
    private activeModal: NgbActiveModal,
  ) {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id:number):void {
    this.blogService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }

}
