const tapsNum = 2;
//make this equal to number of taps

$(document).ready(function() {
    $("#random").click(function(event){
        event.preventDefault();
        const number = Math.floor(Math.random() * tapsNum);
        const beer = $("#beer" + number).children("td").first().html();
        console.log(beer);
        $("#randomBeer").text(beer);
    })

});