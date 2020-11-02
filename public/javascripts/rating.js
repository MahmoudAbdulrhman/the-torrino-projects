async function ratingHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const container = document.querySelector('.rating');
    const items = container.querySelectorAll('.rating-item');

    container.onclick = e => {
        const elClass = e.target.classList;
        if (!elClass.contains('active')) {
            items.forEach(
                item => item.classList.remove('active')
            );
            console.log(e.target.getAttribute("data-rate"));
            elClass.add('active');
        }
    };

    const response = await fetch('/api/posts/rating', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
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

document.querySelector('.rating-btn').addEventListener('click', ratingHandler);