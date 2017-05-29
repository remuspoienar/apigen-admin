import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ApiResource } from '../../models/api-resource.model';

import { ApiDataService } from '../../services/api-data.service';

@Component({
  selector: 'resource-index',
  templateUrl: './resource-index.component.html'
})
export class ResourceIndexComponent implements OnInit {

  @Input() apiResource: ApiResource;
  @Output() new: EventEmitter<any> = new EventEmitter();

  @ViewChild('theTable') table: any;

  rows: Array<Object>;
  allColumns: Array<Object>;
  columns: Array<Object>;
  selected: Array<Object>;
  expanded: Object;
  page: Object;
  sortParams: Object;
  pageParams: Object;
  loading: boolean;

  constructor(
    private _apiData: ApiDataService) {
    this.columns = [];
    this.selected = [];
    this.expanded = {};
    this.allColumns = this.columns;
    this.page = { 'page': 1, 'per': 10 };
    this.sortParams = { 'sort_column': 'id', 'sort_direction': 'asc' };
    this.pageParams = this.page;
    this.loading = false;
  }

  ngOnInit() {
    this.apiResource.allAtributeNames.forEach((column: string) => this.allColumns.push({ 'name': column, 'prop': column, 'sortable': true }));
    this.setPage({ offset: 0 });
  }

  showNewResource() {
    this.new.emit();
  }

  setPage(event: any) {
    this.setPageParams(event);
    this.fetchRows();
  }

  onSelect(event: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...event.selected);
  }

  onDetailToggle(event: any) {
    console.log('Detail Toggled', event);
  }

  onSort(event: any) {
    this.setSortParams(event);
    this.resetPageParams();
    this.fetchRows();
  }

  toggleExpandRow(row: any) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  toggle(col: any) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c['name'] !== col['name'];
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col: any) {
    return this.columns.find(c => {
      return c['name'] === col['name'];
    });
  }

  setPageParams(event: any) {
    this.page['page'] = event.offset + 1;
    let pageParams = {}; Object.assign(pageParams, this.page);
    pageParams['includes'] = this.allColumns.map(x => x['name']);
    this.pageParams = pageParams;
  }

  setSortParams(event: any) {
    this.sortParams = {
      'sort_column': event.sorts[0].prop,
      'sort_direction': event.sorts[0].dir
    };
  }

  resetPageParams() {
    this.pageParams['page'] = 1;
  }

  fetchRows() {
    this.loading = true;
    return this._apiData.getResourceRecords(this.apiResource.tableName, this.queryParams).subscribe(data => {
      this.page['count'] = data['page']['count'];
      this.rows = data['rows'];
      this.loading = false;
    }, error => console.log(error));
  }

  get queryParams() {
    return Object.assign({}, this.pageParams, this.sortParams);
  }

}
