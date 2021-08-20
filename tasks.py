from celery import Celery

from crawler import crawl, add_results_to_queue
from parserlist import get_parser

queue_name = 'celery'
app = Celery(
    'tasks',
    broker_url='redis://127.0.0.1:6379/1',
    # result_backend='redis://127.0.0.1:6379/1',
    # result_expires=30,
)
app_client = app.connection().channel().client


@app.task
def queue_url(url, maximum_items):
    queued_count = app_client.llen(queue_name) # Celery's queue length

    parser = get_parser(url) # get the parser, either custom or the default one
    result = crawl(url, queued_count, maximum_items,
                   parser.get_html, parser.extract_content)

    if result is None:
        return False

    links, content = result
    parser.store_content(url, content)
    add_results_to_queue(links, parser.allow_url_filter)

    return True
