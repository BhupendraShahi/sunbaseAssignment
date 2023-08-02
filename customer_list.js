$(document).ready(function () {
  const token = localStorage.getItem("token");

  // Call the Get Customer List API to fetch the customer data
  $.ajax({
    url: `${baseURL}?cmd=get_customer_list`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (data) {
      const customerTable = $("#customerTable");
      data.forEach((customer) => {
        customerTable.append(`
                    <tr>
                        <td>${customer.first_name}</td>
                        <td>${customer.last_name}</td>
                        <td>${customer.street}</td>
                        <td>${customer.address}</td>
                        <td>${customer.city}</td>
                        <td>${customer.state}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>
                            <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
                            <button onclick="editCustomer('${customer.uuid}')">Edit</button>
                        </td>
                    </tr>
                `);
      });
    },
    error: function (error) {
      if (error.status === 401) {
        alert("Authentication failed. Please login again.");
        window.location.href = "index.html"; // Redirect to the login page if token is invalid
      } else {
        alert("Failed to fetch customer list.");
      }
    },
  });
});

function deleteCustomer(uuid) {
  const token = localStorage.getItem("token");

  // Call the Delete Customer API to delete a specific customer
  $.ajax({
    url: baseURL,
    type: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      cmd: "delete",
      uuid: uuid,
    }),
    contentType: "application/json",
    success: function (data) {
      alert("Customer deleted successfully.");
      location.reload(); // Refresh the customer list after deletion
    },
    error: function (error) {
      alert("Failed to delete customer.");
    },
  });
}


function editCustomer(uuid) {
  const token = localStorage.getItem("token");

  // Fetch the customer details for editing
  $.ajax({
    url: `${baseURL}?cmd=get_customer`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      uuid: uuid,
    },
    success: function (customer) {
      // Populate the edit form fields with customer data
      $("#editFirstName").val(customer.first_name);
      $("#editLastName").val(customer.last_name);
      $("#editStreet").val(customer.street);
      $("#editAddress").val(customer.address);
      $("#editCity").val(customer.city);
      $("#editState").val(customer.state);
      $("#editEmail").val(customer.email);
      $("#editPhone").val(customer.phone);

      // Show the edit modal
      $("#editModal").modal("show");
    },
    error: function (error) {
      alert("Failed to fetch customer details for editing.");
    },
  });

  // Save edited customer details
  $("#saveEditButton").on("click", function () {
    const editedCustomer = {
      uuid: uuid,
      first_name: $("#editFirstName").val(),
      last_name: $("#editLastName").val(),
      street: $("#editStreet").val(),
      address: $("#editAddress").val(),
      city: $("#editCity").val(),
      state: $("#editState").val(),
      email: $("#editEmail").val(),
      phone: $("#editPhone").val(),
    };

    // Call the Update Customer API
    $.ajax({
      url: baseURL,
      type: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        cmd: "update",
        uuid: uuid,
        ...editedCustomer,
      }),
      contentType: "application/json",
      success: function (data) {
        alert("Customer updated successfully.");
        $("#editModal").modal("hide");
        location.reload(); // Refresh the customer list after updating
      },
      error: function (error) {
        alert("Failed to update customer.");
      },
    });
  });
}
