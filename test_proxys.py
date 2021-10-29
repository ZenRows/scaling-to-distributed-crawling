import random
import time
import requests
import pprint
from multiprocessing.pool import ThreadPool
from enum import Enum
from torpy.http.requests import tor_requests_session
from stem import Signal
from stem.control import Controller
import pandas as pd
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from headers import random_headers


class ProxyTypes(Enum):
    FREE = 1
    FREE_CURATED = 2
    TOR = 3
    TOR_LOCAL = 4
    PAID = 5
    PAID_ROTATING = 6
    PAID_US = 7
    RESIDENTIAL = 8


timeout = 30
processes = 25
urls_file = 'urls/instagram.txt'
sample_count = 500
proxy_type = ProxyTypes.FREE  # // TODO
tor_hops_count = 3
tor_retries = 1
tor_local_url = 'socks5://127.0.0.1:9050'
tor_local_port = 9051
tor_local_password = "my password" # // TODO

print('PAID_US -- instagram', time.time())

proxy_list = []
if proxy_type == ProxyTypes.FREE:
    proxy_list = open("proxy_list.txt", "r").read().split("\n")
elif proxy_type == ProxyTypes.FREE_CURATED:
    proxy_list = open("proxy_list_curated.txt", "r").read().split("\n")

def renew_tor_ip():
    with Controller.from_port(port = tor_local_port) as controller:
        controller.authenticate(password=tor_local_password)
        controller.signal(Signal.NEWNYM)


def get_proxies():
    if proxy_type == ProxyTypes.TOR_LOCAL:
        renew_tor_ip()
        return {
            'http': tor_local_url,
            'https': tor_local_url,
        }

    if proxy_type == ProxyTypes.FREE:
        proxy = random.choice(proxy_list)
    elif proxy_type == ProxyTypes.PAID:
        proxy = 'maltzurra:0f6d83-8eb4d9-ed63ab-d62add-86dff2@megaproxy.rotating.proxyrack.net:222'  # // TODO
    elif proxy_type == ProxyTypes.PAID_ROTATING:
        proxy = f"maltzurra:0f6d83-8eb4d9-ed63ab-d62add-86dff2@209.205.212.34:{random.randint(1200, 1250)}"  # // TODO
    elif proxy_type == ProxyTypes.PAID_US:
        proxy = f"maltzurra-country-US:0f6d83-8eb4d9-ed63ab-d62add-86dff2@209.205.212.34:{random.randint(1200, 1250)}"  # // TODO
    elif proxy_type == ProxyTypes.RESIDENTIAL:
        proxy = f"m7EVVUUsg3BIyNUH:wifi;;;;@proxy.soax.com:{random.randint(9000, 9299)}"   # // TODO

    proxies = {
        "http": f"http://{proxy}",
        "https": f"http://{proxy}",
    }

    return proxies


def is_blocked(status_code, content, final_url):
    return status_code == 429 or 'captcha.amazon.com' in content or '/captchaPerimeterX/' in final_url or '/accounts/login/' in final_url


def check_errors(status_code, content, final_url, time_taken):
    success = False
    error_code = False
    blocked = False
    timeout = False
    proxy_error = False

    if "ConnectTimeoutError" in content:
        timeout = True

    if "ProxyError" in content:
        proxy_error = True

    if status_code != 200 or is_blocked(status_code, content, final_url):
        if status_code != 200:
            error_code = True
        if is_blocked(status_code, content, final_url):
            blocked = True
    else:
        success = True

    return {
        "success": success,
        "error_code": error_code,
        "blocked": blocked,
        "timeout": timeout,
        "proxy_error": proxy_error,
        "time_taken": time_taken,
    }


def call_url(url):
    print('----- call url -> ', url)
    content = ''
    status_code = 500
    final_url = ''

    try:
        proxies = get_proxies()
        headers = random_headers()

        start_time = time.time()
        if proxy_type == ProxyTypes.TOR:
            with tor_requests_session(hops_count=tor_hops_count, retries=tor_retries) as session:
                response = session.get(url, headers=headers, timeout=timeout, verify=False)
        else:
            response = requests.get(
                url,
                proxies=proxies,
                headers=headers,
                timeout=timeout,
                verify=False,
            )
        end_time = time.time()

        content = str(response.content, response.apparent_encoding or 'latin1')
        status_code = response.status_code
        final_url = response.url
    except Exception as e:
        end_time = time.time()
        content = str(e)
        print(e)
    finally:
        return check_errors(status_code, content, final_url, end_time - start_time)


urls = open(urls_file, "r").read().split("\n")
urls = random.sample(urls, sample_count)

pool = ThreadPool(processes)
results = pool.map(call_url, urls)
pool.close()
pool.join()


success_count = 0
error_count = 0
blocked_count = 0
timeout_count = 0
proxy_error_count = 0
total_time = 0
total_success_time = 0
for result in results:
    if result['success'] == True:
        success_count += 1
        total_success_time += result['time_taken']

    if result['error_code'] == True:
        error_count += 1

    if result['blocked'] == True:
        blocked_count += 1

    if result['timeout'] == True:
        timeout_count += 1

    if result['proxy_error'] == True:
        proxy_error_count += 1

    total_time += result['time_taken']

pprint.pp({
    "processes": processes,
    "total_requests": len(results),
    "success_count": success_count,
    "error_count": error_count,
    "blocked_count": blocked_count,
    "timeout_count": timeout_count,
    "proxy_error_count": proxy_error_count,
    "avg_time": total_time / len(results),
    "avg_success_time": total_success_time / success_count if success_count > 0 else '-',
})

df_all = pd.DataFrame.from_dict(results)
df_success = df_all[df_all['success'] == True]

print('---------- sum ALL --------------')
print(df_all.sum())
print('---------- time_taken ALL --------------')
print(df_all['time_taken'].describe())
print('---------- time_taken SUCCESS --------------')
print(df_success['time_taken'].describe())
