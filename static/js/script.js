function fetch_short_url() {
    let xhr = new XMLHttpRequest();

    let urlNode = document.getElementsByName('url')[0];
    let slugNode = document.getElementsByName('slug')[0];

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const json = JSON.parse(xhr.responseText);

            const err = document.getElementById('error');
            const sxs = document.getElementById('success');

            if (json.hasOwnProperty('error')) {
                err.innerText = json.error;
                err.style.display = 'block';
                sxs.style.display = 'none';
            } else {
                sxs.innerText = json.short_url;
                sxs.style.display = 'block';
                err.style.display = 'none';
            }

            urlNode.value = ""
            slugNode.value = ""
        }
    }

    xhr.open("POST", "/create");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    xhr.send(`url=${urlNode.value}&slug=${slugNode.value}`);
}

document.getElementById('submit').addEventListener('click', event => {
    event.preventDefault();
    fetch_short_url();
});