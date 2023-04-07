from locust import HttpUser, task
import locust_plugins
import random
import logging
import json

class BooksAppUser(HttpUser):
    host = 'http://localhost:3000/api/v1/booksApp/'

    books = None
    book_id = None
    basket_id = None
    
    
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


    @task(3)
    def user_journey_looking_for_book(self):
        self.go_to_main_page()

        if not self.books:
            raise Exception('Books list is empty')

        self.filter_random_book()

        if not self.book_id:
            raise Exception('book_id is not defined')

        self.go_to_books_details()


    @task(1)
    def user_journey_buying_a_book(self):
        self.go_to_main_page()

        if not self.books:
            raise Exception('Books list is empty')

        self.filter_random_book()

        if not self.book_id:
            raise Exception('book_id is not defined')

        self.go_to_books_details()
        self.add_book_to_basket()
        self.go_to_basket()

        if not self.basket_id:
            raise Exception('basket_id is not defined')


        self.submit_order()

