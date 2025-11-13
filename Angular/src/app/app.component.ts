import { Component } from '@angular/core';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { ScreenService } from './screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  store: AspNetData.CustomStore;

  isSmallScreen = false;

  columns = [{
    dataField: 'OrderID',
    sortOrder: undefined,
    visible: true,
    visibleIndex: 0,
  }, {
    dataField: 'ShipName',
    sortOrder: undefined,
    visible: true,
    visibleIndex: 1,
  }, {
    dataField: 'ShipCountry',
    sortOrder: undefined,
    visible: true,
    visibleIndex: 2,
  }, {
    dataField: 'OrderDate',
    sortOrder: undefined,
    visible: true,
    visibleIndex: 3,
  }, {
    dataField: 'Freight',
    sortOrder: undefined,
    visible: true,
    visibleIndex: 4,
  }];

  allowedPageSizes = [5, 10, 20];

  filterValue = '';

  selectedKeys = [];

  pageSize = 10;

  pageIndex = 0;

  searchPanelText = '';

  constructor(private readonly screen: ScreenService) {
    const url = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';
    this.store = AspNetData.createStore({
      key: 'OrderID',
      loadUrl: `${url}/Orders`,
      insertUrl: `${url}/InsertOrder`,
      updateUrl: `${url}/UpdateOrder`,
      deleteUrl: `${url}/DeleteOrder`,
      onBeforeSend(method: string, ajaxOptions: any) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    });
  }

  ngOnInit(): void {
    this.screen.changed.subscribe(() => this.updateComponent());

    this.updateComponent();
  }

  updateComponent(): void {
    this.isSmallScreen = this.screen.sizes['screen-small'];
  }

  onOptionChanged(e: any): void {
    if (e.fullName === 'visible' && e.value === false) {
      e.component.hideColumnChooser();
    }
  }
}
