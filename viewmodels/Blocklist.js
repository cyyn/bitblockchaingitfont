var app = new Vue({
  el: '#app',
  data: {
    blocklist: '',
    blockheight: '',
    blocktransaction: '',
  },
  mounted() {
    console.log('view mounted');
    var url = new URL(location.href);
    var blockheight = url.searchParams.get("blockheight");
    this.blockheight = blockheight;
    this.getblocklist();
  },
  methods: {
    getblocklist() {
      axios.get('http://localhost:8080/block/getBlockDetailByHeight', {
        params: {
          blockheight: this.blockheight,
        }
      })
        .then(function (response) {
          console.log(response);
          app.blocklist = response.data;
          app.blocktransaction = response.data.transactions;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    handprevBlockhash() {
      axios.get('http://localhost:8080/block/getBlockDetailByHash', {
        params: {
          blockhash: this.blocklist.prevBlockhash,
        }
      })
        .then(function (response) {
          console.log(response);
          app.blocklist = response.data;
          app.blocktransaction = response.data.transactions;
          this.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    handnextBlockhash() {
      axios.get('http://localhost:8080/block/getBlockDetailByHash', {
        params: {
          blockhash: this.blocklist.nextBlockhash,
        }
      })
        .then(function (response) {
          console.log(response);
          app.blocklist = response.data;
          app.blocktransaction = response.data.transactions;
          this.reload();
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    handByheight() {
      location.href = "Blockdetails?blockheight=" + this.blockheight;
    }
  }
})