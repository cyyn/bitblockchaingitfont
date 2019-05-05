var app = new Vue({
    el: '#app',
    data: {
        TransactionHash:'',
        txhash: '',
        TransactionHashone:'',
    },
    mounted() {
        console.log('view mounted');
        var url = new URL(location.href);
        var txhash = url.searchParams.get("txhash");
        this.txhash = txhash;
        this.getTransactionHash();
    },
    methods: {
        getTransactionHash() {
            axios.get('http://localhost:8080/transactiondetail/seletransactiondetailhash', {
                params: {
                    txhash:this.txhash,
                }
            })
                .then(function (response) {
                    console.log(response);
                    app.TransactionHash = response.data;
                    app.TransactionHashone=response.data[0];
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        handbyaddress(address){
            location.href="Addresslist?address="+address;
       }
    }
})