$(function(){
    loadProducts();
    $("#addBtn").click(addProducts);
    $("#products").on("click",".btn-danger",handleDelete);
    $("#products").on("click",".btn-warning",handleUpdate);
    $("#updateSave").click(function(){
        var id = $("$updateId").val();
        var title = $("$updateTitle").val();
        var details = $("$updateBody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data:{title,details},
            method:"PUT",
            success:{function(response){
                console.log(response);
                loadProducts();
                $("updateModal").modal("hide");
            }}
        });
    });
});
function handleUpdate(){
    var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");

  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateID").val(response._id);
      $("#updateName").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateColor").val(response.color);
      $("#updateDepartment").val(response.department);
      $("#updateDescription").val(response.description);
      $("#updateProduct").modal("show");
    }
  );
}

function addProducts(title,details){
    var name=$("#name").val();
    var department=$("#department").val();
    var color=$("#color").val();
    var description=$("#description").val();
    var price=$("#price").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/",
        method: "POST",
        data: {name,department,color,description,price} ,
        success: function(response){
            $("#name").val('');
            $("#department").val('');
            $("#color").val('');
            $("#description").val('');
            $("#price").val('');
            loadProducts();
        },
        error:function(){
            alert("Failed to add new Recipe");
        }
    });
}
function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/"+id,
        method: "DELETE",
        success:function(){
            loadProducts();
        }
    });
}
function loadProducts() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/",
        method: "GET",
        error:function(response){
            alert("Unkown Error Occured.");
        },
        success: function(response) {
            var products = $("#products");
            products.empty();
            for(var i=0; i< response.length; i++){
                var pro = response[i];
                products.append(`<div class="product" data-id="${pro._id}"> <h3>${pro.name}</h3> <p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button>Department: ${pro.department}</br>Color: ${pro.color}</br>Price: ${pro.price}</br>Discription: ${pro.description}</p></div>`);            }
            
        }
    });
}