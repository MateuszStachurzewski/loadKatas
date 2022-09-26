from locust import HttpUser, task
import locust_plugins
import random
import logging
import json

class BooksAppUser(HttpUser):
    host = 'http://localhost:3000/api/v1/booksApp/'

    books = []
    book_id = ''
    basket_id = ''
    
    
    def go_to_main_page(self):
        res = self.client.get("books")
        self.books = res.json()
        # logging.info(res)
        # logging.info(res.json())


    def go_to_books_details(self):
        res = self.client.get(f"books/{self.book_id}")
        # logging.info(res)
        # logging.info(res.json())

    def add_book_to_basket(self):
        payload = {
            "id": f"{self.book_id}"
        }
        headers = {
            'Content-Type': 'application/json',
        }

        res = self.client.post(url="basket", headers=headers, data=json.dumps(payload))
        # logging.info(res)
        # logging.info(res.text)

    def go_to_basket(self):
        res = self.client.get("basket")
        self.basket_id = res.json().get('_id', None)
        # logging.info(res)
        # logging.info(res.json())

    def submit_order(self):
        payload = {
            "basketID": f"{self.basket_id}"
        }
        headers = {
            'Content-Type': 'application/json',
        }
        self.client.post(url="orders", headers=headers, data=json.dumps(payload))

    def filter_random_book(self):
        random_book = random.choice(self.books)
        self.book_id = random_book.get('_id')

    def pick_random_book(self):
        self.go_to_main_page()
        if self.books:
            self.filter_random_book()

        if self.book_id:
            self.go_to_books_details()

    def loop(self, args):
        for _ in range(args.get('times')):
            args.get('method')()

    def random_executor(self, methods):
        random_method = random.choice(methods)
        method = random_method.get('method')
        args = random_method.get('args')
        if args:
            method(args)
        else:
            method()

    @task
    def user_journey(self):
        methods_to_execute = [
            {
                'method': self.loop,
                'args': {'times': 3, 'method': self.pick_random_book}
             },
            {
                'method': self.pick_random_book,
                'args': None
             }
        ]
        self.random_executor(methods_to_execute)

        if self.book_id is not None:
            self.add_book_to_basket()
        if self.basket_id is not None:
            self.go_to_basket()
            self.submit_order()


