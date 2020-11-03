async function statusHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const container = document.querySelector('.close');

    container.onclick = e => {
        const elClass = e.target.classList;
        
        const response = await fetch('/api/posts', {
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
        
    };

    
}

document.querySelector('.status-btn').addEventListener('click', statusHandler);