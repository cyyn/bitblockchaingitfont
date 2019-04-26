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
    // 根据块的高度查询块信息
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
    //根据上个块查询块信息
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
    //根据下个块查询块信息
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
    // 跳转到这个高度的块信息列表
    handByheight() {
      location.href = "Blockdetails?blockheight=" + this.blockheight;
    },
    // 跳转到该地址信息列表
    handbyaddress(address){
         location.href="Addresslist?address="+address;
    }
  }
})