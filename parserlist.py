from urllib.parse import urlparse

from parsers import defaults, scrapemelive, quotestoscrape

parsers = {
    'scrapeme.live': scrapemelive,
    'quotes.toscrape.com': quotestoscrape,
}


def get_parser(url):
    hostname = urlparse(url).hostname

    if hostname in parsers:
        return parsers[hostname]

    return defaults
