const searchBtn = document.getElementById('searchBtn');
const postIdInput = document.getElementById('postId');
const postContainer = document.getElementById('postContainer');

function getPost(postId) {
return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
.then(response => {
if (!response.ok) {
throw new Error('Error');
}
return response.json();
})
.catch(error => {
console.error('Error', error);
});
}

function getComments(postId) {
return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
.then(response => {
if (!response.ok) {
throw new Error('Error');
}
return response.json();
})
.catch(error => {
console.error('Error', error);
});
}

function showPost(post) {
const postElement = document.createElement('div');
postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <button id="commentsBtn">Show comments</button>
      <div id="commentsContainer"></div>
    `;
postContainer.appendChild(postElement);
const commentsBtn = postElement.querySelector('#commentsBtn');
const commentsContainer = postElement.querySelector('#commentsContainer');
commentsBtn.addEventListener('click', () => {
getComments(post.id).then(comments => {
commentsContainer.innerHTML = '';
comments.forEach(comment => {
const commentElement = document.createElement('div');
commentElement.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.body}</p>
            <p><em>${comment.email}</em></p>
          `;
commentsContainer.appendChild(commentElement);
});
});
});
}

searchBtn.addEventListener('click', () => {
const postId = postIdInput.value;
postContainer.innerHTML = '';
getPost(postId).then(post => {
showPost(post);
});
});