class SyncHelper {
    constructor(dataGrid, cardView) {
        let isManual = false;

        dataGrid.on('optionChanged', (e) => {
            if (isManual) return;
            isManual = true;

            if (e.fullName === 'visible') {
                if (e.value === false) {
                    e.component.hideColumnChooser();
                }
            }
            
            // Selection functionality
            if (e.fullName === 'selectedRowKeys') {
                cardView.option('selectedCardKeys', e.value);
            }

            // Column visibility, order and sorting functionality
            if (e.name === 'columns') {
                if (e.fullName.endsWith('sortOrder')) {
                    cardView.clearSorting();
                }

                if (['visible', 'visibleIndex', 'sortOrder'].some(option => e.fullName.includes(option))) {
                    cardView.option(e.fullName, e.value);
                }
            }

            // Pager functionality
            if (e.name === 'paging') {
                // Current page size
                if (e.fullName.endsWith('pageSize')) {
                    cardView.option(e.fullName, e.value);
                }

                // Current page
                if (e.fullName.endsWith('pageIndex')) {
                    cardView.option(e.fullName, e.value);
                }
            }

            // Search panel functionality
            if (e.fullName === 'searchPanel.text') {
                cardView.option('searchPanel.text', e.value);
            }

            // Filtering functionality (filter panel and header filter)
            if (['filterValue', 'filterValues', 'filterType'].some(option => e.fullName.includes(option))) {
                cardView.option(e.fullName, e.value);
            }

            isManual = false;
        });

        cardView.on('optionChanged', (e) => {
            if (isManual) return;
            isManual = true;

            if (e.fullName === 'visible') {
                if (e.value === false) {
                    e.component.hideColumnChooser();
                }
            }
            
            // Selection functionality
            if (e.fullName === 'selectedCardKeys') {
                dataGrid.option('selectedRowKeys', e.value);
            }

            // Column visibility, order and sorting functionality
            if (e.name === 'columns') {
                if (e.fullName.endsWith('sortOrder')) {
                    dataGrid.clearSorting();
                }

                if (['visible', 'visibleIndex', 'sortOrder'].some(option => e.fullName.includes(option))) {
                    dataGrid.option(e.fullName, e.value);
                }
            }

            // Pager functionality
            if (e.name === 'paging') {
                // Current page size
                if (e.fullName.endsWith('pageSize')) {
                    dataGrid.option(e.fullName, e.value);
                }

                // Current page
                if (e.fullName.endsWith('pageIndex')) {
                    dataGrid.option(e.fullName, e.value);
                }
            }

            // Search panel functionality
            if (e.fullName === 'searchPanel.text') {
                dataGrid.option(e.fullName, e.value);
            }

            // Filtering functionality (filter panel and header filter)
            if (['filterValue', 'filterValues', 'filterType'].some(option => e.fullName.includes(option))) {
                dataGrid.option(e.fullName, e.value);
            }

            isManual = false;
        });
    }
}
