import re
from urllib.parse import urlparse


class URLValidator:
    regex = re.compile(
        r'[((http(s)?):\/\/)?(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}'
        r'\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)',
        re.IGNORECASE
    )

    def __call__(self, uri):
        if not uri:
            raise Exception('No URL specified!')

        if len(uri) > 2048:
            raise Exception(
                f'URL exceeds its maximum length of 2048 characters (given length={len(uri)})')

        if(not re.match(self.regex, uri)):
            raise Exception('URL Malformed! Try entering a valid URL')

        if(urlparse(uri).scheme == ''):
            return f'http://{uri}'

        return uri
