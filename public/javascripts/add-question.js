async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
console.log(title);
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/questions`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.user_idText);
  }
}

document.querySelector('.new-question-form').addEventListener('submit', newFormHandler);