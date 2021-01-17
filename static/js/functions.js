function createAnchorElement(props) {
    const element = document.createElement('a');

    if (props !== undefined && props !== null) {
        for (key in props) {
            element[key] = props[key];
        }
    }

    return element;
}

function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function appendItemToBoard(slug) {
    const url = localStorage.getItem(slug);

    let listItem = document.createElement('li');

    let originalURLNode = createAnchorElement({
        'title': url,
        'innerText': url
    });

    let copySlugNode = createAnchorElement({
        'innerText': 'copy!',
        'title': slug
    });

    copySlugNode.classList.add('copy');

    copySlugNode.addEventListener('click', event => {
        copy(document.URL + event.target.title);

        event.target.innerText = 'copied!';

        window.setTimeout(() => {
            event.target.innerText = 'copy!';
        }, 1000);
    });

    listItem.appendChild(originalURLNode);
    listItem.appendChild(copySlugNode);

    document.getElementById('board-ul').appendChild(listItem);
}

function storeInLocalStorage(slug, url) {
    if (typeof Storage !== undefined) {
        localStorage.setItem(slug, url);
    }
}

function toggleDisplay(element) {
    (element.style.display =
        element.style.display === 'block' ? 'none' : 'block');
}