from playwright.sync_api import sync_playwright


def get_html(url, headers=None, proxy=None, timeout=10000):
    html = ''
    with sync_playwright() as p:
        browser_type = p.chromium
        browser = browser_type.launch(proxy=proxy)
        page = browser.new_page()
        page.set_extra_http_headers(headers)
        page.goto(url)
        page.wait_for_timeout(timeout)

        html = page.content()

        browser.close()

    return html
