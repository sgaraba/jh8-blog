import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import SharedModule from "../../../shared/shared.module";
import { Tag } from '../blog-management.model';

@Component({
  selector: 'jhi-tag-management-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tag-management-detail.component.html',
  styleUrl: './tag-management-detail.component.scss'
})
export class TagManagementDetailComponent implements OnInit {
  tag: Tag | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ tag }) => {
      this.tag = tag;
    });
  }

}
