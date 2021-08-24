import time
import re
import random


def get_html(url):
    try:
        page = int(re.search(r'\d+', url).group())
        with open('./data/' + str(page) + '.html') as fp:
            time.sleep(random.randint(1, 10) / 10)
            return fp.read()
    except Exception as e:
        print(e)

    return ''
