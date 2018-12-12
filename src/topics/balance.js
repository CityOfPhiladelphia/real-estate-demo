import helpers from '../util/helpers.js';

export default {
  key: 'balance',
  icon: 'usd-circle',
  label: 'Balance Details',
  // REVIEW can these be calculated from vue deps?
  dataSources: ['tips'],
  errorMessage: function() {
    return 'Could not locate tax records for that address.';
  },
  components: [
    {
      type: 'horizontal-table',
      options: {
        id: 'balanceDetails',
        download: {
          button: true,
          file: function(state) { return state.sources.tips.data.data.accountNum + '_BalanceDetails'; },
          introLines: [
            function(state) { return state.geocode.data.properties.street_address; },
            function(state) {
              const zipCode = state.geocode.data.properties.zip_code;
              const zip4 = state.geocode.data.properties.zip_4;
              const parts = [zipCode];
              if (zip4) parts.push(zip4);
              return 'Philadelphia PA ' + parts.join('-');
            },
            function(state) { return 'OPA # ' + state.sources.tips.data.data.accountNum.toString(); }
          ]
        },
        // downloadButton: true,
        // downloadFile: function(state) {
        //   return state.sources.tips.data.data.accountNum + '_BalanceDetails';
        // },
        totalRow: {
          enabled: true,
          totalField: 'year'
        },
        fields: [
          {
            label: 'Year',
            value: function(state, item){
              return item.year;
            },
            nullValue: 'no year available',
            transforms: [
              'misc'
            ]
          },
          {
            label: 'Principal',
            value: function(state, item){
              return item.principal.toFixed(2);
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Interest',
            value: function(state, item){
              return item.interest.toFixed(2);
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Penalty',
            value: function(state, item){
              return item.penalty.toFixed(2);
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Other',
            value: function(state, item){
              return item.other.toFixed(2);
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Total',
            value: function(state, item){
              return item.total.toFixed(2);
            },
            transforms: [
              'currency'
            ]
          },
          {
            label: 'Lien#',
            value: function(state, item){
              return item.lienNum;
            }
          },
          {
            label: 'City Solicitor',
            value: function(state, item){
              return item.solicitor;
            }
          },
          {
            label: 'Status',
            value: function(state, item) {
              return item.status;
            },
            popoverLink: true,
            popoverTransforms: [
              'statusMap',
            ],
            popoverPreText: function(state, item) {
              return '<i class="fa fa-info-circle" aria-hidden="true"></i> <strong>' + item.status + '</strong> - '
            },
          },
        ],
        sort: {
          // this should return the val to sort on
          getValue: function(item) {
            return item.year;
          },
          // asc or desc
          order: 'asc'
        },
      },
      slots: {
        title: 'Balance Details',
        items: function(state) {
          var data = state.sources['tips'].data.data.years;
          var rows = data.map(function(row){
            var itemRow = row;
            return itemRow;
          });
          return rows;
        },
      },
    },
  ],
}
