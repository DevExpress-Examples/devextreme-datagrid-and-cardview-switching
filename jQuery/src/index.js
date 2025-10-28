$(() => {
  const url = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';
  const dataSource = new DevExpress.data.DataSource({
    store: DevExpress.data.AspNet.createStore({
      key: 'OrderID',
      loadUrl: `${url}/Orders`,
      insertUrl: `${url}/InsertOrder`,
      updateUrl: `${url}/UpdateOrder`,
      deleteUrl: `${url}/DeleteOrder`,
      onBeforeSend(method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
      },
    }),
  });

  const commonConfig = {
    dataSource,
    remoteOperations: true,
    allowColumnReordering: true,
    pager: {
      showPageSizeSelector: true,
      showInfo: true,
      allowedPageSizes: [5, 10, 20],
    },
    paging: {
      pageSize: 10,
    },
    selection: {
      mode: 'multiple',
    },
    columnChooser: {
      enabled: true,
    },
    searchPanel: {
      visible: true,
    },
    headerFilter: {
      visible: true,
    },
    filterPanel: {
      visible: true,
    },
    editing: {
      mode: 'popup',
      allowUpdating: true,
      allowAdding: true,
      allowDeleting: true,
    },
    columns: [
      { dataField: 'OrderID', allowEditing: false },
      { dataField: 'ShipName' },
      { dataField: 'ShipCountry' },
      { dataField: 'OrderDate', dataType: 'date' },
      { dataField: 'Freight', headerFilter: { groupInterval: 100 } },
    ],
    height: 800,
  };

  let isScreenSmall = $(window).width() < 960;

  const dataGrid = $('#dataGrid').dxDataGrid({
    ...commonConfig,
    visible: !isScreenSmall,
    showBorders: true,
    columnAutoWidth: true,
  }).dxDataGrid('instance');

  const cardView = $('#cardView').dxCardView({
    ...commonConfig,
    visible: isScreenSmall,
    cardsPerRow: 'auto',
  }).dxCardView('instance');

  const helper = new SyncHelper(dataGrid, cardView);

  $(window).on('resize', () => {
    isScreenSmall = $(window).width() < 960;
    if (isScreenSmall) {
      dataGrid.option('visible', false);
      cardView.option('visible', true);
    } else {
      cardView.option('visible', false);
      dataGrid.option('visible', true);
    }
  });
});
