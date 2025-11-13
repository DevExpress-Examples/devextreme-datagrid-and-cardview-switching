<script setup lang="ts">
import { ref } from 'vue';

import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDataGrid, { DxPager, DxPaging, DxSelection, DxColumnChooser, DxSearchPanel, DxHeaderFilter, DxFilterPanel, DxEditing, DxColumn } from 'devextreme-vue/data-grid';
import DxCardView from 'devextreme-vue/card-view';
import { createStore } from 'devextreme-aspnet-data-nojquery';

defineProps({
  isScreenSmall: {
    type: Boolean,
    default: false,
  },
});

const url = 'https://js.devexpress.com/Demos/NetCore/api/DataGridWebApi';

const store = createStore({
  key: 'OrderID',
  loadUrl: `${url}/Orders`,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
  onBeforeSend: (_, ajaxOptions) => {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const allowedPageSizes = [5, 10, 20];
const filterValue = ref('');
const selectedKeys = ref([]);
const pageSize = ref(10);
const pageIndex = ref(0);
const searchPanelText = ref('');
const columns = ref([
  { dataField: 'OrderID', sortOrder: undefined, visible: true, visibleIndex: 0 },
  { dataField: 'ShipName', sortOrder: undefined, visible: true, visibleIndex: 1 },
  { dataField: 'ShipCountry', sortOrder: undefined, visible: true, visibleIndex: 2 },
  { dataField: 'OrderDate', sortOrder: undefined, visible: true, visibleIndex: 3 },
  { dataField: 'Freight', sortOrder: undefined, visible: true, visibleIndex: 4 },
]);

</script>
<template>
  <div class="demo-container">
    <DxDataGrid
      class="dx-card"
      :visible="!isScreenSmall"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      v-model:filter-value="filterValue"
      v-model:selected-row-keys="selectedKeys"
      :height="800"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxPaging
        v-model:page-size="pageSize"
        v-model:page-index="pageIndex"
      />
      <DxPager
        :show-page-size-selector="true"
        :show-info="true"
        :allowed-page-sizes="allowedPageSizes"
      />
      <DxSelection mode="multiple"/>
      <DxColumnChooser :enabled="true"/>
      <DxSearchPanel
        :visible="true"
        v-model:text="searchPanelText"
      />
      <DxHeaderFilter :visible="true"/>
      <DxFilterPanel :visible="true"/>
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
      />

      <DxColumn
        v-for="(column, index) in columns"
        :key="index"
        :data-field="column.dataField"
        v-model:sort-order="columns[index].sortOrder"
        v-model:visible="columns[index].visible"
        v-model:visible-index="columns[index].visibleIndex"
        :allow-editing="column.dataField !== 'OrderID'"
        :data-type="column.dataField === 'OrderDate' ? 'date' : undefined"
      >
        <DxHeaderFilter
          v-if="column.dataField === 'Freight'"
          :group-interval="100"
        />
      </DxColumn>
    </DxDataGrid>
    <DxCardView
      class="dx-card"
      :visible="isScreenSmall"
      :data-source="store"
      :remote-operations="true"
      :allow-column-reordering="true"
      v-model:filter-value="filterValue"
      v-model:selected-card-keys="selectedKeys"
      :height="800"
      cards-per-row="auto"
    >
      <DxPaging
        v-model:page-size="pageSize"
        v-model:page-index="pageIndex"
      />
      <DxPager
        :show-page-size-selector="true"
        :show-info="true"
        :allowed-page-sizes="allowedPageSizes"
      />
      <DxSelection mode="multiple"/>
      <DxColumnChooser :enabled="true"/>
      <DxSearchPanel
        :visible="true"
        v-model:text="searchPanelText"
      />
      <DxHeaderFilter :visible="true"/>
      <DxFilterPanel :visible="true"/>
      <DxEditing
        mode="popup"
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
      />

      <DxColumn
        v-for="(column, index) in columns"
        :key="index"
        :data-field="column.dataField"
        v-model:sort-order="columns[index].sortOrder"
        v-model:visible="columns[index].visible"
        v-model:visible-index="columns[index].visibleIndex"
        :allow-editing="column.dataField !== 'OrderID'"
        :data-type="column.dataField === 'OrderDate' ? 'date' : undefined"
      >
        <DxHeaderFilter
          v-if="column.dataField === 'Freight'"
          :group-interval="100"
        />
      </DxColumn>
    </DxCardView>
  </div>
</template>
<style scoped>
.demo-container {
  min-width: 300px;
  max-width: 1000px;
  margin: auto;
}

.dx-card {
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
}

:deep(.dx-cardview-card:not(.dx-cardview-card-selection) .dx-cardview-card-header .dx-icon) {
    color: var(--dx-color-link);
}
</style>
