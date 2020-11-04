async function statusHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const container = document.querySelector('.close');

    container.onclick = e => {
        const elClass = e.target.classList;
        if (!elClass.contains('close')) {
            const response = await fetch('/api/posts', {
                method: 'PUT',
                body: JSON.stringify({
                    post_id: id,
                    status: false
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
    };  
}

document.querySelector('.close-btn').addEventListener('click', statusHandler);