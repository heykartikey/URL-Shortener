from flask import Flask, render_template, request, redirect, escape, url_for
from flask_sqlalchemy import SQLAlchemy

import random
import re
import string

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Shorter(db.Model):
    slug = db.Column(db.String(8), primary_key=True)
    url = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Inserted {self.slug} for {self.url}>'


def is_valid_url(url):
    return re.match(r'https?:\/\/(www.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)', url)


def is_valid_slug(slug):
    return re.match(r'^[A-Za-z0-9]{6}$', slug)


def generate_slug(size=6):
    return ''.join(random.choice(string.ascii_letters + string.digits)
                   for _ in range(size))


def create():
    url = request.form['url']
    slug = request.form['slug']

    if(not is_valid_url(url)):
        return render_template('index.html', error='Invalid URL')

    if(not is_valid_slug(slug)):
        slug = generate_slug()

    while (Shorter.query.get(slug)):
        slug = generate_slug()

    new_url = Shorter(url=escape(url), slug=slug)

    try:
        db.session.add(new_url)
        db.session.commit()
        return render_template('index.html', short_url=request.url_root + new_url.slug)
    except:
        return render_template('index.html', error="Database Error. Try later!")


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        return create()
    return render_template('index.html')


@app.route('/<slug>')
def redirectTo(slug):
    url_to_redirect = Shorter.query.get_or_404(slug)

    return redirect(url_to_redirect.url)


if __name__ == "__main__":
    app.run()
