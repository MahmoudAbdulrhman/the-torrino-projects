const container = document.querySelector('.rating');
const items = container.querySelectorAll('.star')
console.log("Hello");

// document.querySelectorAll('.rating').forEach(form => {
//     form.addEventListener('click', event => {
//         handleFormClick(event);
//     })
// })

$(document).on('click', '.star', e => {
    console.log("clicked star2!")
    handleFormClick(e)
})

//container.onclick = e => {
const handleFormClick = function(e) {
    const elClass = e.target.classList;
    if (!elClass.contains('active')) {
        items.forEach(
            item => item.classList.remove('active')
        );
        console.log(e.target.getAttribute("data-rate") + " star rating!");
        elClass.add('active');
        let starValue = e.target.getAttribute("data-rate");
        console.log(starValue);
        // const answer_id = e.target.getAttribute("data-answerid")
        console.log(answer_id)
        switch(starValue) {
            case "1":
                alert("1 star");
                ratingValue = 1;
                ratingUpdate(ratingValue)
            break;
            case "2":
                alert("2 stars");
                ratingValue = 2;
                ratingUpdate(ratingValue)
            break;
            case "3":
                alert("3 stars");
                ratingValue = 3;
                ratingUpdate(ratingValue)
            break;
            case "4":
                alert("4 stars");
                ratingValue = 4;
                ratingUpdate(ratingValue)
            break;
            case "5":
                alert("5 stars");
                ratingValue = 5;
                ratingUpdate(ratingValue)
            break;
            default:
                alert("no stars");
        }
    }
};

function ratingUpdate(ratingData, answer_id = "wrong!") {


    console.log(answer_id);
 
    // const answer_id = document.querySelector(".rating").value.trim();
    // const question_id = window.location.toString().split('/')[
       
    // ];
    if (answer_id) {
        const response = fetch(`/api/answers/${answer_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: answer_id,
                question_id: question_id,
                rating: ratingData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(rating);
        if (response.ok) {
            document.location.reload(); 
        } else {
            alert(response.statusText);
        }
    }
}