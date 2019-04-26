var app = new Vue({
    el: '#app',
    data: {
        blocklist: '',
        blockheight: '',
    },
    mounted() {
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
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        handblockhash() {
            axios.get('http://localhost:8080/block/getBlockDetailByHash', {
                params: {
                    blockhash: this.blocklist.blockhash,
                }
            })
                .then(function (response) {
                    console.log(response)
                    location.href = "Blocklist?blockheight=" + response.data.height;
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
                    console.log(response)
                    location.href = "Blocklist?blockheight=" + response.data.height;
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
                    console.log(response)
                    location.href = "Blocklist?blockheight=" + response.data.height;
                })
                .catch(function (error) {
                    console.log(error);
                })
        },

    }
})