import repo
from collectors import basic


def extract_content(url, soup):
    return soup.title.string


def store_content(url, content):
    repo.set_content(key=url, value=content)


def allow_url_filter(url):
    return True


def get_html(url):
    return basic.get_html(url)
