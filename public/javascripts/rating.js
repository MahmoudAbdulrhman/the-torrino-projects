$(document).on("click", ".star", e => {
    handleFormClick(e)
});

const handleFormClick = function(e) {
    let starValue = e.target.getAttribute("data-rate");
    let answerValue = e.target.getAttribute("answer_no");
    
    switch(starValue) {
        case "1":
            ratingValue = 1;
            ratingUpdate(ratingValue, answerValue);
        break;
        case "2":
            ratingValue = 2;
            ratingUpdate(ratingValue, answerValue);
        break;
        case "3":
            ratingValue = 3;
            ratingUpdate(ratingValue, answerValue);
        break;
        case "4":
            ratingValue = 4;
            ratingUpdate(ratingValue, answerValue);
        break;
        case "5":
            ratingValue = 5;
            ratingUpdate(ratingValue, answerValue);
        break;
    }
};

function ratingUpdate(ratingData, answerData) {
    // alert(answerData)
    fetch(`/api/answers/${answerData}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: answerData,
            rating: ratingData
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

