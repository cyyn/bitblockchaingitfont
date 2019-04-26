var app = new Vue({
    el: '#app',
    data: {
        address:'',
        transactiondetails:'',
        TransactionDetailDTO:'',
    },
    mounted() {
          var url=new URL(location.href);
          var address=url.searchParams.get("address");
          this.address=address;
          this.getByaddress();
    },
    methods: {
        getByaddress() {
            axios.get('http://localhost:8080/transactiondetail/seletrandetaailaddress', {
                params: {
                    address : this.address,
                }
             })
                .then(function (response) {
                    console.log(response);
                    app.TransactionDetailDTO=response.data;
                    app.transactiondetails=response.data.transactiondetails;
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
})