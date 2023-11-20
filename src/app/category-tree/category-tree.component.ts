// category-tree.component.ts
import { Component, Injectable, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface CategoryNode {
  CategoryId: number;
  CategoryName: string;
  ParentCategoryId: number | null;
  Subcategories?: CategoryNode[];
}

@Injectable()
export class CategoryTreeService {
  dataChange = new BehaviorSubject<CategoryNode[]>([]);

  get data(): CategoryNode[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient) {
    this.initialize();
  }

  initialize() {
    this.getCategories().subscribe(data => {
      this.dataChange.next(data || []); // Ensure data is not undefined
    });
  }

  getCategories(): Observable<CategoryNode[]> {
    return this.http.get<CategoryNode[]>('http://localhost:5079/api/category/all');
  }
}

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.css'],
  providers: [CategoryTreeService]
})
export class CategoryTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<CategoryNode>(node => (node.Subcategories ? node.Subcategories : []));
  dataSource = new MatTreeNestedDataSource<CategoryNode>();

  constructor(private categoryTreeService: CategoryTreeService) { }

  ngOnInit(): void {
    this.categoryTreeService.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  hasChild = (_: number, node: CategoryNode) => !!node.Subcategories && node.Subcategories.length > 0;
}

