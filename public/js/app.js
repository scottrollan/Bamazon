
$(function(){
  let cartTotal = 0;
  let cartItems = [];
  let timeInterval; //used on line 77


  //hides modal and clears rows
  const render = function(items){
    console.log(items, "these should be our items")
    $('modal').modal('hide');
    $('#sale-items').empty();

    items.forEach(function(item){
      $('#sale-items').append(buildItemRow(item));
    });
  }

  //gets items from api/products list
  const getItems = function() {
    $.get('/api/products').then(render);
  }


  //create a row, where <tr>=tr, for each item in api/products
  const buildItemRow = function(item) {
    const tr = $('<tr>');
    
    //creates input field for row
    const input = $('<input>').attr({
      type: 'number',
      min: 0,
      id: item.id //#
    });

    //creates add-to-cart button with above input as number to add
    const button = $('<button>')
    .addClass('btn btn-warning add-to-cart')
    .text('Add to Cart')
    .attr('data-id', item.id); //ALVARO help!!

    //appends above 2 cols along with api/products data onto table row 
    tr.append (
      $('<td>').append(input),
      $('<td>').text(item.product_name),
      $('<td>').text(item.stock_quantity),
      $('<td>').text(`$${item.price}`),
      $('<td>').append(button)
    );
    return tr;
  }
  //end main page setup

  const addCartRow = function(qty, item) {
    const itemTotal = item.price * qty;
    
    cartTotal += itemTotal;
    item.stock_quantity -= qty;
    cartItems.push(item);
    const tr = $('<tr>').addClass(`cart-${item.id}`);

    tr.append(
      $('<td>').text(qty),
      $('<td>').text(item.product_name),
      $('<td>').text(`$${item.price}`),
      $('<td>').text(`$${itemTotal.toFixed(2)}`)
    );  

    $('#cart-items').append(tr);
    $('.cart-total').text(`$${cartTotal.toFixed(2)}`);

  }


  const message = function(type, text){
    $('#messages').addClass(`alert alert-${type}`).text(text).modal('show');
    //messages only appears for 3 seconds
    timeInterval = setTimeout(clearMessages, 3000)
  }

  const clearMessages = function() {
    $('#messages').empty().removeClass();
  }

  const addItemToCart = function() {
    
    clearMessages();
    const id = $(this).attr('data-id');
    $.get(`/api/products/${id}`).then(updateCart);
  }

  const updateCart = function(data) {
    console.log(data, "data from cart")
    const numRequested = $(`#${data.id}`).val(); //if not item.id, then what?????

    if (numRequested > data.stock_quantity) {
      message('danger', `Sorry. We only have ${data.stock_quantity} in stock.`);
    }else {
      console.log(numRequested, " num requested")
      addCartRow(numRequested, data);
     // message('success', 'Items successfully added to cart.');
      $(`#${data.id}`).val('');
    }
    //$('#messages').modal('show');
  }

  const checkout = function() {
    cartItems.forEach(function(item){
      $.ajax ({
        method: 'PUT',
        url: `/api/products/${item.id}`,
        data: item
      });
    });
    location.reload();
  }

  getItems();

  $(document).on('click','.add-to-cart', addItemToCart); //line 84 -- ALVARO
  $('#checkout').on('click', checkout);
  $('#close').on('click', getItems);
})