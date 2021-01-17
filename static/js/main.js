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

function showRespone(responseJson, errorNode, successNode) {
    if (responseJson.hasOwnProperty('error')) {
        errorNode.innerText = responseJson.error;

        errorNode.style.display = 'block';
        successNode.style.display = 'none';
    } else {
        successNode.innerText = document.URL + responseJson.slug;

        successNode.style.display = 'block';
        errorNode.style.display = 'none';

        storeInLocalStorage(responseJson.slug, responseJson.originalURL);
        appendItemToBoard(responseJson.slug);
    }
}

document.getElementById('submit').addEventListener('click', async event => {
    event.preventDefault();

    const urlNode = document.forms[0][0];
    const slugNode = document.forms[0][1];

    const responseJson = await fetchResponse(urlNode.value, slugNode.value);

    showRespone(responseJson,
        document.getElementById('error'),
        document.getElementById('success')
    );
});

function toggleIcon(element) {
    if (element.classList.contains('close')) {
        element.classList.add('menu');
        element.classList.remove('close');
    } else {
        element.classList.add('close');
        element.classList.remove('menu');
    }
}

document.getElementById('switch').addEventListener('click', e => {
    toggleDisplay(document.getElementById('board'));
    toggleIcon(document.getElementById('switch').children[0]);
});