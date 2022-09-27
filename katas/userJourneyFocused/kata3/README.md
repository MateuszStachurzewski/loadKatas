## Handling authenticated users

### App: BooksApp v1

### Description
Being authenticated provides a lot of benefits for the users like e.g. collecting loyalty points or receiving
attractive discounts. This is why one of the epics sitting in the backlog of your project is that users should 
be able to create accounts and log in.

Some users will be doing shopping while being authenticated therefore you need to make sure that 
your application can handle the load given users log in before shopping.

### Task
Create a user journey where a user authenticates before shopping.
1. Go to main page with books listing
2. Log in
3. Go back to main page with books listing
2. Search for a book by name
3. Go to book's details
4. Add the book to basket
5. Go to basket
6. Submit order

### Success Criteria:
- the user journey is executed in the above order
- the user journey can be run on 10 different users
- each user logs in only once per the execution of the whole test suite

### Tips:
- read the repository's `/loadKatas/README.md`
- take a look at swagger endpoints of the booksApp
- to log in, users need an account. Take a look at swagger how to create one.
- Figure out the strategy of creating accounts that will be user in the user journeys



