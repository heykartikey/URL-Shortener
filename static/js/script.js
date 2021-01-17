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

function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function showItem(slug) {
    const url = localStorage.getItem(slug);

    let liItem = document.createElement('li');
    let urlItem = document.createElement('a');

    urlItem.title = urlItem.innerText = url;

    let copyItem = document.createElement('a');
    copyItem.classList.add('copy');
    copyItem.innerText = 'copy!'
    copyItem.title = slug;

    copyItem.addEventListener('click', event => {
        copy(document.URL + event.target.title);
        event.target.innerText = 'done!';
        window.setTimeout(() => {
            event.target.innerText = 'copy!';
        }, 1000);
    });

    liItem.appendChild(urlItem);
    liItem.appendChild(copyItem);

    document.getElementById('board-ul').appendChild(liItem);
}


function storeLocally(slug, url) {
    if (typeof Storage === undefined) return;

    localStorage.setItem(slug, url);
    showItem(slug);
}

function showRespone(responseJson, errorNode, successNode) {
    if (responseJson.hasOwnProperty('error')) {
        errorNode.innerText = responseJson.error;
        errorNode.style.display = 'block';
        successNode.style.display = 'none';
    } else {
        successNode.innerText = responseJson.short_url.join('');
        successNode.style.display = 'block';
        errorNode.style.display = 'none';

        storeLocally(responseJson.short_url[1], responseJson.url);
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

    urlNode.value = '';
    slugNode.value = '';
});

document.getElementById('switch').addEventListener('click', event => {
    let board = document.getElementById('board');

    (board.style.display =
        board.style.display === 'block' ? 'none' : 'block'
    );

    let switchIcon = document.getElementById('switch').children[0];

    if (switchIcon.classList.contains('close')) {
        switchIcon.classList.add('menu');
        switchIcon.classList.remove('close');
    } else {
        switchIcon.classList.add('close');
        switchIcon.classList.remove('menu');
    }
});