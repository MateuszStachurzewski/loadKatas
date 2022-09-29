from locust import HttpUser, task
import locust_plugins
import logging
import json
import uuid

class BooksAppUser(HttpUser):
    host = 'http://localhost:3000/api/v1/booksApp/'

    email = ''
    name = ''
    password = 'TestPassword'
    book_id = ''
    basket_id = ''

    def create_account(self):
        payload = {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "language": "English",
            "country": "Poland",
            "currency": "USD"
        }
        headers = {
            'Content-Type': 'application/json',
        }
        res = self.client.post(url="register", headers=headers, data=json.dumps(payload))
        # logging.info(res)
        # logging.info(res.json())

    def login(self):
        payload = {
            "email": self.email,
            "password": self.password
        }
        headers = {
            'Content-Type': 'application/json',
        }
        res = self.client.post(url="login", headers=headers, data=json.dumps(payload))
        # logging.info(res)
        # logging.info(res.json())

    def go_to_main_page(self):
        res = self.client.get("books")
        # logging.info(res)
        # logging.info(res.json())

    def search_for_books_by_name(self):
        payload = {
            "name": "It Ends with Us: A Novel"
        }
        headers = {
            'Content-Type': 'application/json',
        }
        res = self.client.post(url="books", headers=headers, data=json.dumps(payload))
        self.book_id = res.json().get('_id', None)
        # logging.info(res)
        # logging.info(res.json())

    def go_to_books_details(self):
        logging.info(self.book_id)
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

    def on_start(self):
        # Generate email
        self.email = f'{uuid.uuid4()}@gmail.com'
        self.name = f'{uuid.uuid4()}'
        self.go_to_main_page()
        self.create_account()

    @task
    def user_journey(self):
        self.go_to_main_page()
        self.login()
        self.go_to_main_page()
        self.search_for_books_by_name()
        if self.book_id is not None:
            self.go_to_books_details()
            self.add_book_to_basket()
        if self.basket_id is not None:
            self.go_to_basket()
            self.submit_order()
