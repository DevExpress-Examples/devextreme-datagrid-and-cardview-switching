import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';

import { useCallback, useState } from 'react';
import DataGrid, {
  Pager as GridPager,
  Paging as GridPaging,
  Selection as GridSelection,
  ColumnChooser as GridColumnChooser,
  SearchPanel as GridSearchPanel,
  HeaderFilter as GridHeaderFilter,
  FilterPanel as GridFilterPanel,
  Editing as GridEditing,
  Column as GridColumn,
} from 'devextreme-react/data-grid';
import CardView, {
  Pager as CardPager,
  Paging as CardPaging,
  Selection as CardSelection,
  ColumnChooser as CardColumnChooser,
  SearchPanel as CardSearchPanel,
  HeaderFilter as CardHeaderFilter,
  FilterPanel as CardFilterPanel,
  Editing as CardEditing,
  Column as CardColumn,
} from 'devextreme-react/card-view';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { useScreenSize } from './media-query';
import { DataSource } from 'devextreme/common/data';

interface ColumnOptions {
  [key: string]: any;
};

const url = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';

const dataSource = new DataSource({
  store: createStore({
    key: 'OrderID',
    loadUrl: `${url}/Orders`,
    insertUrl: `${url}/InsertOrder`,
    updateUrl: `${url}/UpdateOrder`,
    deleteUrl: `${url}/DeleteOrder`,
    onBeforeSend: (_, ajaxOptions) => {
      ajaxOptions.xhrFields = { withCredentials: true };
    },
  }),
});

const allowedPageSizes = [5, 10, 20];

function App(): JSX.Element {
  const { isScreenSmall } = useScreenSize();

  const [filterValue, setFilterValue] = useState<any>('');
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [searchPanelText, setSearchPanelText] = useState('');
  const [columnSortOrders, setColumnSortOrders] = useState<ColumnOptions>({});
  const [columnVisibilities, setColumnVisibilities] = useState<ColumnOptions>({});
  const [columnVisibleIndexes, setColumnVisibleIndexes] = useState<ColumnOptions>({});

  const onOptionChanged = useCallback(({ name, fullName, value, component }: any) => {
    if (name === 'columns') {
      const match = /\[(\d+)\]/.exec(fullName);
      const colIdx = match ? parseInt(match[1], 10) : null;
      if (colIdx === null) return;

      const dataField = component.columnOption(colIdx, 'dataField');

      if (fullName.includes('sortOrder')) {
        setColumnSortOrders((prev) => ({ ...prev, [dataField]: value }));
      } else if (fullName.includes('visibleIndex')) {
        setColumnVisibleIndexes((prev) => ({ ...prev, [dataField]: value }));
      } else if (fullName.includes('visible')) {
        setColumnVisibilities((prev) => ({ ...prev, [dataField]: value }));
      }
    }
  }, []);

  const CommonSettings = useCallback(({ isGrid }: { isGrid: boolean }) => {
    const Paging = isGrid ? GridPaging : CardPaging;
    const Pager = isGrid ? GridPager : CardPager;
    const Selection = isGrid ? GridSelection : CardSelection;
    const ColumnChooser = isGrid ? GridColumnChooser : CardColumnChooser;
    const SearchPanel = isGrid ? GridSearchPanel : CardSearchPanel;
    const HeaderFilter = isGrid ? GridHeaderFilter : CardHeaderFilter;
    const FilterPanel = isGrid ? GridFilterPanel : CardFilterPanel;
    const Editing = isGrid ? GridEditing : CardEditing;
    const Column = isGrid ? GridColumn : CardColumn;

    return (<>
      <Paging pageSize={pageSize} onPageSizeChange={setPageSize} pageIndex={pageIndex} onPageIndexChange={setPageIndex} />
      <Pager showPageSizeSelector={true} showInfo={true} allowedPageSizes={allowedPageSizes} />
      <Selection mode="multiple" />
      <ColumnChooser enabled={true} />
      <SearchPanel visible={true} text={searchPanelText} onTextChange={setSearchPanelText} />
      <HeaderFilter visible={true} />
      <FilterPanel visible={true} />
      <Editing
        mode="popup"
        allowAdding={true}
        allowUpdating={true}
        allowDeleting={true}
      />

      <Column
        dataField="OrderID"
        allowEditing={false}
        sortOrder={columnSortOrders.OrderID}
        visible={columnVisibilities.OrderID !== false}
        visibleIndex={columnVisibleIndexes.OrderID}
      />
      <Column
        dataField="ShipName"
        sortOrder={columnSortOrders.ShipName}
        visible={columnVisibilities.ShipName !== false}
        visibleIndex={columnVisibleIndexes.ShipName}
      />
      <Column
        dataField="ShipCountry"
        sortOrder={columnSortOrders.ShipCountry}
        visible={columnVisibilities.ShipCountry !== false}
        visibleIndex={columnVisibleIndexes.ShipCountry}
      />
      <Column
        dataField="OrderDate"
        dataType="date"
        sortOrder={columnSortOrders.OrderDate}
        visible={columnVisibilities.OrderDate !== false}
        visibleIndex={columnVisibleIndexes.OrderDate}
      />
      <Column
        dataField="Freight"
        sortOrder={columnSortOrders.Freight}
        visible={columnVisibilities.Freight !== false}
        visibleIndex={columnVisibleIndexes.Freight}
      >
        <HeaderFilter groupInterval={100} />
      </Column>
    </>);
  }, [pageSize, pageIndex, searchPanelText, columnSortOrders, columnVisibilities, columnVisibleIndexes]);

  return (
    <div className="demo-container">
      <DataGrid
        className='dx-card'
        visible={!isScreenSmall}
        dataSource={dataSource}
        remoteOperations={true}
        allowColumnReordering={true}
        height={800}
        onOptionChanged={onOptionChanged}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
        selectedRowKeys={selectedKeys}
        onSelectedRowKeysChange={setSelectedKeys}
        showBorders={true}
        columnAutoWidth={true}
      >
        <CommonSettings isGrid={true} />
      </DataGrid>

      <CardView
        className='dx-card'
        visible={isScreenSmall}
        dataSource={dataSource}
        remoteOperations={true}
        allowColumnReordering={true}
        height={800}
        onOptionChanged={onOptionChanged}
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
        selectedCardKeys={selectedKeys}
        onSelectedCardKeysChange={setSelectedKeys}
        cardsPerRow={'auto'}
      >
        <CommonSettings isGrid={false} />
      </CardView>
    </div>
  );
}

export default App;
