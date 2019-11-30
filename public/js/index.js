$(document).ready(function () {
  let productArray = [];
  let shoppingCart = [];

  // render function to display data
  function render(members) {
    for (let i = 0; i < members.length; i++) {

      $("#searchDump").append(
        `<tr>
          <td>${members[i].product_name}</td>
          <td>${members[i].department_name}</td>
          <td>${members[i].price}</td>
          <td>${members[i].stock_quantity} in stock</td>
          <td>${members[i].id}</td>
          <td>${members[i].product_name}</td>
          <td>${members[i].department_name}</td>
          <td>${members[i].price}</td>
          <td>${members[i].stock_quantity} in stock</td>
          <td>${members[i].id}</td>
          <td>${members[i].stock_quantity} in stock</td>
          <td>${members[i].id}</td>
          </tr>`
      );
    }
  }

  // function that captures user input to search for members
  function searchmembers() {
    $.get(`/api/products`).then(function (members) {
      // console.log(members);
      productArray = members.slice();
      render(members);
    });
  }

  searchmembers();

  $("#userPurchase").submit(function (event) {
    event.preventDefault();
    console.log(productArray);
    const productId = parseInt($("#productId").val());
    const productQuantity = parseInt($("#productQuantity").val());
    let membersStock = 0;

    // identifies correct product
    for (let i = 0; i < productArray.length; i++) {
      if (productId === productArray[i].id) {
        // checks if quantity is sufficient
        if (productQuantity <= productArray[i].stock_quantity) {
          // membersStock = productArray[i].stock_quantity - productQuantity;
          // console.log("Items are available!");
          const id = productArray[i].id;
          const product_name = productArray[i].product_name;
          const price = productArray[i].price;
          const stock_quantity = productArray[i].stock_quantity;
          const product_dep = productArray[i].department_name;
          shoppingCart.push({
            id: id,
            product_name: product_name,
            product_quantity: productQuantity,
            price: price,
            stock_quantity: stock_quantity
          }); // holds value user selected

          const items = document.querySelector('.items');
          items.innerHTML = (`<div>
              <table>
                <thead>
                  <tr class="w3-theme">
                    <th class="left"><span>Item</span></th>
                    <th class="left">Department</th>
                    <th class="qty-hdr">Price</th>
                    <th class="bag_itemtotal total-hdr">Qty</th>
                    <th class="bag_itemtotal total-hdr">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      ${product_name}
                    </td>
                    <td>
                      ${product_dep}
                    </td>
                    <td>
                      ${price}
                    </td>
                    <td>
                      ${productQuantity}
                    </td>
                    <td>
                      ${productQuantity * price}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>`)
          alert(
            `(${productQuantity}) ${productArray[i].product_name}(s) was added to your FLYcart for $${productArray[i].price} each!`
          );
        } else {
          alert("Item(s) are out of stock");
        }
      }
    }

    // console.log(productId, membersStock);
  });

  // listener for shopping cart array
  $("#shopping-cart").click(function (event) {
    event.preventDefault();
    if (shoppingCart.length === 0) {
      alert("Your shopping cart is empty");
    } else {
      $(".modal").css("display", "block"); // changes modal to display
    }
  });
  $(".close").click(function () {
    $(".modal").css("display", "none"); // changes modal to close
  });
  $("#purchase").click(function (event) {
    event.preventDefault();
    $(".modal").css("display", "none"); // changes modal to close
    console.log("Purchase complete.");
    const customerPurchase = [];
    for (let i = 0; i < shoppingCart.length; i++) {
      const id = shoppingCart[i].id;
      const updatedQuantity =
        shoppingCart[i].stock_quantity - shoppingCart[i].product_quantity;
      customerPurchase.push({
        id: id,
        updatedQuantity: updatedQuantity
      });
      $.ajax({
        url: "/api/products/" + id,
        type: "PUT",
        data: { updatedQuantity: updatedQuantity }
      });
      $("#searchDump").empty();
      searchmembers();
    }
  });
});