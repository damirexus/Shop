var template = $("#template").html();
var title = new RegExp ('{{title}}', 'g');
var collections = $('[data-collection]');
var mainRow = $('#mainRow');


$('.back-to-top').click(function() {
    $('html, body').animate({scrollTop: 0}, 1000);
})

window.onload = function(){
    collections.parent().removeClass('active');
    $.ajax({
        url : "shop.json",
        method : "get",
        dataType : "json"
    })
    .done(function(res){
        displayCollections(res);
        collections.on('click', function(e){
            displayCollections.call(this, res, e)
        });
    })
};

function displayCollections(res, event){
    mainRow.html("");
    if (event) {
        event.preventDefault();
    }  
    var col = $(this).data('collection');
    
       
        if(col === 'male' || col === 'female') {
            var colFilter = res.filter(function(el) {
                return el.colection === col;
            })
            displayProduct(colFilter);            
        }  else if(col === 'newCol' || col === 'popular' || col === 'action') {
            collections.parent().removeClass('active');
            $(this).parent().addClass('active');
            var colFilter = res.filter(function (el){
                return el[col];
            })
           displayProduct(colFilter);   
        } else {
            displayProduct(res);
        }  
}

function displayProduct(filter){
    var text = "";
    filter.forEach(function(e){
        text = template.replace("{{imgSrc}}", e.imgSrc)
                        .replace(title, e.productTitle)
                        .replace("{{model}}", e.model)
                        .replace("{{price}}", e.price);
        mainRow.append(text);
    })
}
