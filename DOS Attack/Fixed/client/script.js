document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-request');
    const status = document.getElementById('status');

    const sendRequest = () => {
        fetch('http://localhost:3000/')
            .then(response => response.text())
            .then(data => {
                status.innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
                status.innerText = 'Error: Too many requests.';
            });
    };

    sendButton.addEventListener('click', () => {
        sendRequest();
    });
});