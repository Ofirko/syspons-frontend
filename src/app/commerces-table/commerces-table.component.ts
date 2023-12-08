import { AfterViewInit, Component, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommercesTableDataSource } from './commerces-table-datasource';
import { Commerce as CommercesTableItem } from '../commerces/commerce';
import { CommerceService } from '../commerces/commerce.service';

@Component({
  selector: 'app-commerces-table',
  templateUrl: './commerces-table.component.html',
  styleUrls: ['./commerces-table.component.scss']
})
export class CommercesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CommercesTableItem>;
  dataSource = new CommercesTableDataSource();
  constructor(private commerceService: CommerceService) { }
  isLoading = true;

  getCommerces(): void {
    this.commerceService.getCommerces()
    .subscribe(commerces => {
      this.dataSource.data = commerces;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getCommerces();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'color', 'department', 'material', 'price'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
