const url = new URL(window.document.URL)
if (url.search != "") {
    const span = document.createElement('span');

    if (url.searchParams.get('error')) {
        span.innerText = url.searchParams.get('error');
        span.style = "color:#900";
    } else if (url.searchParams.get('short_url')) {
        span.innerText = url.origin + '/' + url.searchParams.get('short_url');
        span.style = "color:green"
    }

    document.body.appendChild(span);

    window.setTimeout(() => {
        document.body.getElementsByTagName('span')[0].innerText = ''
    }, 3000);
}