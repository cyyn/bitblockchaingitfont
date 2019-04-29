var app = new Vue({
    el: '#app',
    data: {
        input:'',
        bitcoinblocklist: [],
        activeName: 'first',
        bittransactionlist: [],
        blockhash: '',
    },
    computed: {
        showbitcoinblocklist() {
            var now = Date.now();
            this.bitcoinblocklist.forEach(block => {
                block.showtime = parseInt((now - block.time) / 1000 / 60);
                block.showsizeOnDisk = block.sizeOnDisk.toLocaleString('en')
            });
            return this.bitcoinblocklist;
        },
        showbitcoinTransactionlist() {
            var now = Date.now();
            this.bittransactionlist.forEach(transaction => {
                transaction.showtime = parseInt((now - transaction.timemiao) / 1000 / 60);
            });
            return this.bittransactionlist;
        }
    },
    mounted() {
        console.log("开始执行");
        this.getblocklist();
        this.gettransactionlist();
    },
    methods: {
        // 展示块信息
        getblocklist() {
            axios.get('http://localhost:8080/block/getRecentBlocks')
                .then(function (response) {
                    console.log(response);
                    app.bitcoinblocklist = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        //展示交易信息
        gettransactionlist() {
            axios.get('http://localhost:8080/block/getblockhash', {
                params: {
                    blockhash: this.blockhash,
                }
            })
                .then(function (response) {
                    app.bittransactionlist = response.data;
                    // app.blockhash=response.data(0).blockhash;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
    }
})