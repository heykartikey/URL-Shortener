from flask import Flask, render_template, request, redirect, escape
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Shorter(db.Model):
    slug = db.Column(db.String(8), primary_key=True)
    url = db.Column(db.String(256), nullable=False)

    def __repr__(self):
        return f'<Inserted {self.slug} for {self.url}>'


from url import URLValidator
URLValidator = URLValidator()

import slug
SlugValidator = slug.SlugValidator(raiseException=False)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            url = URLValidator(request.form['url'])
        except Exception as err:
            return {'error': err.__str__()}

        alias = SlugValidator(request.form['slug'])

        while (Shorter.query.get(alias)):
            alias = slug.generate(SlugValidator.charset, SlugValidator.size)

        new_url = Shorter(url=escape(url), slug=alias)

        try:
            db.session.add(new_url)
            db.session.commit()
        except:
            return {'error': 'Database Error. Try later!'}

        return {'short_url': request.url_root + new_url.slug}

    return render_template('index.html')


@app.route('/<slug>')
def redirectTo(slug):
    url_to_redirect = Shorter.query.get_or_404(slug)

    return redirect(url_to_redirect.url)


if __name__ == '__main__':
    app.run()
