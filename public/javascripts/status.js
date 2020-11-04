    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
        const container = document.querySelector('.close-btn');
        container.onclick = e => {
            const response = fetch(`/api/questions/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    question_id: id,
                    status: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }    
            })
        }

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }