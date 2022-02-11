$('#add_user').submit(function (event) {
  alert('The data was inserted successfully!');
});

// This is JQUERY syntax for the UPDATE form:
$('#update_user').submit(function (event) {
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n['name']] = n['value'];
  });

  var request = {
    url: `http://localhost:5000/api/users/${data.id}`,
    method: 'PUT',
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert('Data Uploaded Successfully!');
  });
});

//This is the JQUERY syntax for DELETE button:
if (window.location.pathname == '/') {
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function () {
    var id = $(this).attr('data-id');

    var request = {
      url: `http://localhost:5000/api/users/${id}`,
      method: 'DELETE',
    };

    if (confirm('Are you sure you want to delete this user?')) {
      $.ajax(request).done(function (response) {
        alert('Data Deleted Successfully!');
        location.reload();
      });
    }
  });
}
