from locust import HttpUser, task, between
from locust import events
import locust_plugins
import logging
import json
import uuid


class User():
    def __init__(self, email, name):
        self.email = email
        self.name = name
        self.password = 'TestPassword'
        self.language = 'English'
        self.country = 'Poland'
        self.currency = 'USD'


class BooksAppUser(HttpUser):
    wait_time = between(5, 5)

    host = 'http://localhost:3000/api/v1/booksApp/'

    loyalUser = None
    tempUser = None

    book_id = ''
    basket_id = ''

    def create_account(self, user):
        payload = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "language": user.language,
            "country": user.country,
            "currency": user.currency
        }
        headers = {
            'Content-Type': 'application/json',
        }
        res = self.client.post(url="register", headers=headers, data=json.dumps(payload))

        # logging.info(res)
        # logging.info(res.json())

    def login(self, user):
        payload = {
            "email": user.email,
            "password": user.password
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
        email = f'{uuid.uuid4()}@gmail.com'
        name = f'{uuid.uuid4()}'
        self.loyalUser = User(email, name)

        self.go_to_main_page()
        self.create_account(self.loyalUser)

    @task
    def first_time_shopper(self):
        self.go_to_main_page()
        self.search_for_books_by_name()
        if self.book_id is not None:
            self.go_to_books_details()
            self.add_book_to_basket()
            self.go_to_basket()

            """
            As opposed to a loyal shopper, one-time shopper will use
            different account for each scenario run.
            """
            email = f'{uuid.uuid4()}@gmail.com'
            name = f'{uuid.uuid4()}'
            self.tempUser = User(email, name)

            self.create_account(self.tempUser)
            self.login(self.tempUser)

            self.go_to_basket()
            self.submit_order()

    @task
    def loyal_shopper(self):
        self.go_to_main_page()
        self.login(self.loyalUser)
        self.go_to_main_page()
        self.search_for_books_by_name()
        if self.book_id is not None:
            self.go_to_books_details()
            self.add_book_to_basket()
        if self.basket_id is not None:
            self.go_to_basket()
            self.submit_order()
