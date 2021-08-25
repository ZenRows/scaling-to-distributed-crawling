# crawling-scale-up

Repository for the [Mastering Web Scraping in Python: Scaling to Distributed Crawling](https://www.zenrows.com/blog/mastering-web-scraping-in-python-scaling-to-distributed-crawling) blogpost with the final code.

## Installation
You will need [Redis](https://redis.io/) and [python3 installed](https://www.python.org/downloads/). After that, install all the necessary libraries by running `pip install`.

```bash
pip install install requests beautifulsoup4 playwright "celery[redis]"
npx playwright install
```

## Execute

Configure the Redis connection on the [repo file](./repo.py) and Celery on the [tasks file](./tasks.py).

You need to start Celery and the run the main script that will start queueing pages to crawl.

```bash
celery -A tasks worker
```

```python
python3 main.py 
```

## Contributing
Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

## License
[MIT](./LICENSE)
