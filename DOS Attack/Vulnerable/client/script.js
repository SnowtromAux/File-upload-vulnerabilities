document.getElementById('start-attack').addEventListener('click', () => {
    const status = document.getElementById('status');
    let attackInterval;

    const sendRequest = () => {
        fetch('http://localhost:3000/')
            .then(response => response.text())
            .then(data => {
                status.innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
                clearInterval(attackInterval);
                status.innerText = 'Attack stopped due to an error.';
            });
    };

    attackInterval = setInterval(sendRequest, 100); // Send a request every 100ms

    // Stop the attack after 10 seconds
    setTimeout(() => {
        clearInterval(attackInterval);
        status.innerText = 'Attack stopped.';
    }, 10000);
});
