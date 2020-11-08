$(document).on("click", ".star", e => {
    handleFormClick(e)
})

const handleFormClick = function(e) {
 
        let starValue = e.target.getAttribute("data-rate");
        let answerValue = e.target.getAttribute("answer_no")
        console.log(starValue);
        console.log(answerValue);
        switch(starValue) {
            case "1":
                alert("1 star");
                ratingValue = 1;
                ratingUpdate(ratingValue, answerValue);
            break;
            case "2":
                alert("2 stars");
                ratingValue = 2;
                ratingUpdate(ratingValue, answerValue);
            break;
            case "3":
                alert("3 stars");
                ratingValue = 3;
                ratingUpdate(ratingValue, answerValue);
            break;
            case "4":
                alert("4 stars");
                ratingValue = 4;
                ratingUpdate(ratingValue, answerValue);
            break;
            case "5":
                alert("5 stars");
                ratingValue = 5;
                ratingUpdate(ratingValue, answerValue);
            break;
            default:
                alert("no stars");
        }
}

function ratingUpdate(ratingData, answerData) {
    // event.preventDefault();
    console.log(answerData)
    const response = fetch(`/api/answers/${answerData}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: answerData,
            rating: ratingData
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }

}