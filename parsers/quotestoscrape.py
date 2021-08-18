import repo
from collectors import basic
from headers import random_headers
from proxies import random_proxies


def extract_content(url, soup):
    return [{
        'quote': product.find(class_='text').text,
        'author': product.find(class_='author').text
    } for product in soup.select('.quote')]


def store_content(url, content):
    for item in content:
        if item['quote'] and item['author']:
            list_key = f"crawling:quote:{item['author']}"
            repo.add_to_list(list_key, item['quote'])


def allow_url_filter(url):
    return 'quotes.toscrape.com/page/' in url and '#' not in url


def get_html(url):
    return basic.get_html(url, headers=random_headers(), proxies=random_proxies())
