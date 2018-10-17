var template = $('#template_d').html();
var mainRowDetailed = $('#mainRow_d');
var jsonProizvodi = [];

window.onload = function() {
    $.ajax({
        url : "detailed.json",
        method : "get",
        dataType : "json"
    })
    
    .done(function(json) {
        jsonProizvodi = json;
        displayProduct(json[0]);
    });
      
};

$('.product').on('click', '.product-image-holder > a', function(e) {
    e.preventDefault();    
    var index = parseInt($(this).attr('json-index'));
    displayProduct(jsonProizvodi[index]);
    //alert(index);
});

// onload da se učita početni template - product1

function displayProduct(e) {
    var innerHtml = template.replace(new RegExp("{{imgSrc}}", 'g'), e.imgSrc)
                    .replace(new RegExp ("{{productTitle}}", 'g'), e.productTitle)
                    .replace(new RegExp("{{model}}", 'g'), e.model)
                    .replace(new RegExp("{{price}}", 'g'), e.price)
                    .replace('{{color0}}', e.colors[0])
                    .replace('{{color1}}', e.colors[1])
                    .replace('{{color2}}', e.colors[2]);
    mainRowDetailed.html(innerHtml);
}















$('.back-to-top').click(function() {
    $('html, body').animate({scrollTop: 0}, 1000);
})




