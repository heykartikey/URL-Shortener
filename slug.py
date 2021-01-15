import random
import re
import string


def isValid(slug, size):
    return re.fullmatch(f'[a-zA-Z0-9]{size}', slug)


def generate(charset, size):
    return ''.join(random.choices(charset, k=size))


class SlugValidator:
    charset = string.ascii_letters + string.digits
    size = 6

    def __init__(self, *, raiseException=False):
        self.raiseException = raiseException

    def __call__(self, slug):
        if not self.raiseException:
            if isValid(slug, self.size):
                return slug

            return generate(self.charset, self.size)

        if not isValid(slug, self.size):
            raise Exception(
                f'Malformed slug! Make sure it contains lowercase letters, uppercase letters, and digits only of length {self.size}.')

        return slug
