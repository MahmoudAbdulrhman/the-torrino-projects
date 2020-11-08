const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
        const container = document.querySelector('.close-btn');
        container.onclick = () => {
            const response = fetch(`/api/questions/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    question_id: id,
                    status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }    
            })
                if (response.ok) {
                    document.location.reload();
                } else {
                    alert(response.statusText);
                }
        }

 
const questionStatus = () => {
    
    let x = document.getElementById("answer-block");
    
    const response = fetch(`/api/questions/${id}`, {
        method: 'GET',
        body: JSON.stringify({
            id,
            status
        }),
        headers: {
            'Content-Type': 'application/json'
        }    
    })
    console.log(response)
    if (response.status === false) {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

questionStatus()
       