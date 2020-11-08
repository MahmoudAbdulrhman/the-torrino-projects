async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="questions-title"]').value;
    const question_content = document.querySelector('input[name="question-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
  
    const response = await fetch(`/api/questions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            question_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-question-form').addEventListener('submit', editFormHandler);