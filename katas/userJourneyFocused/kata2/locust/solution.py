from locust import HttpUser, task
import locust_plugins
import random
import logging
import json

class BooksAppUser(HttpUser):
    host = 'http://localhost:3000/api/v1/booksApp/'
    
    book_id = ''
    basket_id = ''
    
    
    def go_to_main_page(self):
        res = self.client.get("books")
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

    def filter_random_book(self, books):
        randomBook = random.choice(books)
        logging.info(randomBook)


    def pick_random_book(self):
        resp = self.go_to_main_page()
        logging.info(resp)
        # if resp:
        #     random_book_id = filter_random_book(resp);

        # self.go_to_books_details()

    def loop(self, times, method):
        for _ in range(times):
            return method()

    @task
    def user_journey(self):
        self.pick_random_book()
        # self.loop()




        #
        # if self.book_id is not None:
        #
        #     self.add_book_to_basket()
        # if self.basket_id is not None:
        #     self.go_to_basket()
        #     self.submit_order()


