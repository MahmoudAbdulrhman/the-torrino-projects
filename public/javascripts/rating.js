// async function ratingHandler(event) {
//     event.preventDefault();

//     const id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const container = document.querySelector('.rating');
//     const items = container.querySelectorAll('.rating-item');

//     container.onclick = e => {
//         const elClass = e.target.classList;
//         if (!elClass.contains('active')) {
//             items.forEach(
//                 item => item.classList.remove('active')
//             );
//             console.log(e.target.getAttribute("data-rate"));
//             elClass.add('active');
//         }
//     };

//     const response = await fetch('/api/posts/rating', {
//         method: 'PUT',
//         body: JSON.stringify({
//             post_id: id
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

//     if (response.ok) {
//         document.location.reload();
//     } else {
//         alert(response.statusText);
//     }
// }

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
              break;
            case "2":
                alert("2 stars");
              break;
              case "3":
                alert("3 stars");
              break;
              case "4":
                alert("4 stars");
              break;
              case "5":
                alert("5 stars");
              break;
            default:
                alert("no stars");
        }
    }
};

// document.querySelector('.rating-btn').addEventListener('click', ratingHandler);