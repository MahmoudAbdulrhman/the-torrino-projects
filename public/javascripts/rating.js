const container = document.querySelector('.rating');
const items = container.querySelectorAll('.rating-item')

container.onclick = e => {
    const elClass = e.target.classList;
    if (!elClass.contains('active')) {
        items.forEach(
            item => item.classList.remove('active')
        );
        console.log(e.target.getAttribute("data-rate") + " star rating!");
        elClass.add('active');
        let starValue = e.target.getAttribute("data-rate");
        console.log(starValue);
            
        switch(starValue) {
            case "1":
                alert("1 star");
                let ratingValue = 1;
                ratingUpdate(ratingValue)
            break;
            case "2":
                alert("2 stars");
                let ratingValue = 2;
                ratingUpdate(ratingValue)
            break;
            case "3":
                alert("3 stars");
                let ratingValue = 3;
                ratingUpdate(ratingValue)
            break;
            case "4":
                alert("4 stars");
                let ratingValue = 4;
                ratingUpdate(ratingValue)
            break;
            case "5":
                alert("5 stars");
                let ratingValue = 5;
                ratingUpdate(ratingValue)
            break;
            default:
                alert("no stars");
        }
    }
};

function ratingUpdate(ratingValue) {
    event.preventDefault();

    const answer_rating = document.querySelector('rating').value.trim();

    const question_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (answer_rating) {
        const response = await fetch('/api/answers', {
            method: 'PUT',
            body: JSON.stringify({
                id: question_id,
                answer_text,
                rating: ratingValue
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
