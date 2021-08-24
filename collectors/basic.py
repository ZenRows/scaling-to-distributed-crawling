import requests


def get_html(url, headers=None, proxies=None):
    try:
        response = requests.get(url, headers=headers, proxies=proxies)
        return response.content
    except Exception as e:
        print(e)

    return ''
