import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

import { useCallback, useState } from 'react';
import DataGrid, { Pager, Paging, Selection, ColumnChooser, SearchPanel, HeaderFilter, FilterPanel, Editing, Column } from 'devextreme-react/data-grid';
import CardView from 'devextreme-react/card-view';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useScreenSize } from './media-query';

const url = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';

const dataSource = createStore({
  key: 'OrderID',
  loadUrl: `${url}/Orders`,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const allowedPageSizes = [5, 10, 20];

const freightHeaderFilter = { groupInterval: 100 };

function App(): JSX.Element {
  const { isScreenSmall } = useScreenSize();
  
  return (
    <div className="demo-container">
      <DataGrid
        className='dx-card'
        visible={!isScreenSmall}
        dataSource={dataSource}
        remoteOperations={true}
        allowColumnReordering={true}
        height={800}
        showBorders={true}
        columnAutoWidth={true}
      >
        <Paging pageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} allowedPageSizes={allowedPageSizes} />
        <Selection mode="multiple" />
        <ColumnChooser enabled={true} />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} />
        <FilterPanel visible={true} />
        <Editing
          mode="popup"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        <Column dataField="OrderID" allowEditing={false} />
        <Column dataField="ShipName" />
        <Column dataField="ShipCountry" />
        <Column dataField="OrderDate" dataType="date" />
        <Column dataField="Freight" headerFilter={freightHeaderFilter} />
      </DataGrid>

      <CardView
        className='dx-card'
        visible={isScreenSmall}
        dataSource={dataSource}
        remoteOperations={true}
        allowColumnReordering={true}
        height={800}
        cardsPerRow={'auto'}
      >
        <Pager showPageSizeSelector={true} showInfo={true} allowedPageSizes={allowedPageSizes} />
        <Paging pageSize={10} />
        <Selection mode="multiple" />
        <ColumnChooser enabled={true} />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} />
        <FilterPanel visible={true} />
        <Editing
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        />

        <Column dataField="OrderID" allowEditing={false} />
        <Column dataField="ShipName" />
        <Column dataField="ShipCountry" />
        <Column dataField="OrderDate" dataType="date" />
        <Column dataField="Freight" headerFilter={freightHeaderFilter} />
      </CardView>
    </div>
  );
}

export default App;
