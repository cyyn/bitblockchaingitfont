var app = new Vue({
    el: '#app',
    data: {
        bitcoinblocklist: []
    },
    computed: {
        showbitcoinblocklist(){
            var now = Date.now();
            this.bitcoinblocklist.forEach(block => {
                block.showtime=parseInt((now - block.time)/1000/60);
                block.showsizeOnDisk=block.sizeOnDisk.toLocaleString('en')
            });
            return this.bitcoinblocklist;
        }
    },
    mounted() {
        console.log("开始执行");
        this.getblocklist();
    },
    methods: {
        getblocklist() {
            axios.get('http://localhost:8080/block/getRecentBlocks')
                .then(function (response) {
                    console.log(response);
                    app.bitcoinblocklist=response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
})