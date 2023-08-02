$(document).ready(function () {
    $("#addCustomerForm").submit(function (e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const firstName = $("#first_name").val();
        const lastName = $("#last_name").val();
        const street = $("#street").val();
        const address = $("#address").val();
        const city = $("#city").val();
        const state = $("#state").val();
        const email = $("#email").val();
        const phone = $("#phone").val();

        // Check if first_name and last_name are provided
        if (!firstName || !lastName) {
            alert("First Name and Last Name are mandatory.");
            return;
        }

        // Call the Create New Customer API
        $.ajax({
            url: baseURL,
            type: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: JSON.stringify({
                "cmd": "create",
                "first_name": firstName,
                "last_name": lastName,
                "street": street,
                "address": address,
                "city": city,
                "state": state,
                "email": email,
                "phone": phone
            }),
            contentType: "application/json",
            success: function (data) {
                alert("Customer created successfully.");
                window.location.href = "customer_list.html"; // Redirect to the customer list screen after successful creation
            },
            error: function (error) {
                if (error.status === 401) {
                    alert("Authentication failed. Please login again.");
                    window.location.href = "index.html"; // Redirect to the login page if token is invalid
                } else if (error.status === 400) {
                    alert("First Name or Last Name is missing.");
                } else {
                    alert("Failed to create customer.");
                }
            }
        });
    });
});
