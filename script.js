const baseURL = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";

$(document).ready(function () {
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    const login_id = $("#username").val();
    const password = $("#password").val();

    // Call the Authentication API to get the token
    $.ajax({
      url: "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",
      type: "POST",
      data: JSON.stringify({
        login_id: login_id,
        password: password,
      }),
      contentType: "application/json",
      success: function (data) {
        const bearerToken = data.token; // Assuming the token field is named 'token'
        localStorage.setItem("token", bearerToken);
        window.location.href = "customer_list.html"; // Redirect to the customer list screen
      },
      error: function (error) {
        alert("Login failed. Please check your credentials.");
      },
    });
  });
});
