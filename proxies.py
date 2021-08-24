import random


free_proxies = [
    {
        'http': 'http://62.33.210.34:58918',
        'https': 'http://194.233.69.41:443',
    },
    {
        'http': 'http://190.64.18.177:80',
        'https': 'http://203.193.131.74:3128',
    },
]

proxies = {
    'free': free_proxies,
}


def random_proxies(type='free'):
    return random.choice(proxies[type])
