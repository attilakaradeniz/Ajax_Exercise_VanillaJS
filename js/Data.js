class AjaxObj {
    constructor() {
        this.responseJSON;
        this.counter = 0;
    }

    init() {
        let that = this;
        let buttonAjax = $("#btnAjax");
        buttonAjax.on("click", function () {
            that.httpReq();
        });
    }

    httpReq() {
        let that = this;
        $.ajax({
            url: "https://httpbin.org/get",
            method: "GET",
            success: function (response) {
                that.responseJSON = response;
                // here comes make table func call
                that.makeTable();

            },
            error: function (error) {
                $('#error').html('Data not found!');
            }
        });
    }

    makeTable() {
        let that = this;
        let table = $("table tbody");
        let data = that.responseJSON;
        let markup = "";
        let tableDiv = $(".col-12");

        if (this.counter > 0) {
            table.remove();
            this.counter = 0;
            markup = "<table><tr><th>Key</th><th>Value</th></tr></table>";
            tableDiv.append(markup);
        } else {
            for (let headerItem in data.headers) {
                if (headerItem == "Sec-Fetch-Dest") {
                    continue;
                }
                markup = "<tr><td>" + headerItem + "</td><td>" + data.headers[headerItem] + "</td></tr>";
                table.append(markup);
            }

            for (let headerItem in data) {
                if (headerItem == "args" || headerItem == "headers") {
                    continue;
                }
                markup = "<tr><td>" + headerItem + "</td><td>" + data[headerItem] + "</td></tr>";
                table.append(markup);
            }
            this.counter++;
        }

    }

}