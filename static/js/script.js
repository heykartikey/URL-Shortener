async function fetchResponse(url, slug) {
    const response = await fetch('/', {
        'method': 'POST',
        'body': `url=${url}&slug=${slug}`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response.json();
}

function showMessage(responseJson, errorNode, successNode) {
    if (responseJson.hasOwnProperty('error')) {
        errorNode.innerText = responseJson.error;
        errorNode.style.display = 'block';
        successNode.style.display = 'none';
    } else {
        successNode.innerText = responseJson.short_url;
        successNode.style.display = 'block';
        errorNode.style.display = 'none';
    }
}

document.getElementById('submit').addEventListener('click', async event => {
    event.preventDefault();

    const urlNode = document.forms[0][0];
    const slugNode = document.forms[0][1];

    const responseJson = await fetchResponse(urlNode.value, slugNode.value);

    showMessage(responseJson,
        document.getElementById('error'),
        document.getElementById('success')
    );

    urlNode.value = '';
    slugNode.value = '';
});