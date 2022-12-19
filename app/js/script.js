$(document).ready(function () {
    //Fetch All Records
    function loadTable() {
        $("#load-table").html("");
        $.ajax({
            url: '../php/api-fetch-all.php',
            type: "GET",
            success: function (data) {
                if (data.status == false) {
                    $("#load-table").append("<tr><td colspan='6'><h2>" + data.message + "</h2></td></tr>");
                } else {
                    $.each(data, function (key, value) {
                        $("#load-table").append("<tr>" +
                            "<td>" + value.id + "</td>" +
                            "<td>" + value.name + "</td>" +
                            "<td>" + value.email + "</td>" +
                            "<td><button class='delete-btn' data-id='" + value.id + "'>Delete</button></td>" +
                            "</tr>");
                    });
                }
            }
        });
    }

    loadTable();

    //Show Success or Error Messages
    function message(message, status) {
        if (status == true) {
            $("#success-message").html(message).slideDown();
            $("#error-message").slideUp();
            setTimeout(function () {
                $("#success-message").slideUp();
            }, 4000);

        } else if (status == false) {
            $("#error-message").html(message).slideDown();
            $("#success-message").slideUp();
            setTimeout(function () {
                $("#error-message").slideUp();
            }, 4000);
        }
    }

    // Function for form Data to JSON Object
    function jsonData(targetForm) {
        var arr = $(targetForm).serializeArray();

        var obj = {};
        for (var a = 0; a < arr.length; a++) {
            if (arr[a].value == "") {
                return false;
            }
            obj[arr[a].name] = arr[a].value;
        }

        var json_string = JSON.stringify(obj);

        return json_string;

    }

    //Insert New Record
    $("#add-button").on("click", function (e) {
        e.preventDefault();

        var jsonObj = jsonData("#addForm");

        if (jsonObj == false) {
            message("All Fields are required.", false);
        } else {
            $.ajax({
                url: '../php/api-insert.php',
                type: "POST",
                data: jsonObj,
                success: function (data) {
                    message(data.message, data.status);

                    if (data.status == true) {
                        loadTable();
                        $("#addForm").trigger("reset");
                    }
                }
            });
        }
    });

    //Delete Record
    $(document).on("click", ".delete-btn", function () {
        if (confirm("Do you really want to delete this record ? ")) {
            var id = $(this).data("id");
            var obj = { id: id };
            var myJSON = JSON.stringify(obj);

            var row = this;

            $.ajax({
                url: '../php/api-delete.php',
                type: "POST",
                data: myJSON,
                success: function (data) {
                    message(data.message, data.status);

                    if (data.status == true) {
                        $(row).closest("tr").fadeOut();
                    }
                }
            });
        }
    });

});
