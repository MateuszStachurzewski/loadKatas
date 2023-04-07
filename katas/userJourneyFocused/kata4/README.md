## Leveraging privileges of authenticated users

### App: BooksApp v1

### Description
Being authenticated provides a lot of benefits for the users like e.g. collecting loyalty points or receiving
attractive discounts. This is why one of the epics sitting in the backlog of your project is that users should 
be able to create accounts and log in.

Since your selling strategy offers a nice discount for first shopping done by authenticated users, 
your team expects there might be a high traffic of users creating accounts and logging into the 
application only to use the discount. 

This sprint, your job was to test out how the app will handle the traffic given there are users reaching only
for discounts but also users who tend to come back and do regular shopping as logged in users. 

### Task
Create a user journey that would represent the behaviour described above.

#### New user aiming to get a discount for first time shoppers

1. Go to main page with books listing
2. Search for a book by name
3. Go to book's details
4. Add the book to basket
5. Go to basket
6. Create an account
7. Log in to the app
8. Return to the basket
9. Submit order

#### Retained user collecting loyalty points

1. Go to main page with books listing
2. Log in
3. Go back to main page with books listing
4. Search for a book by name
5. Go to book's details
6. Add the book to basket
7. Go to basket
8. Submit order


### Success Criteria:
- both user journeys are executed in the above order
- both user journeys are executed interchangeably
- the ratio of execution between user journeys is random
- your solution can be run on 10 users
- account for the first time shopper is created for each scenario run
- account for the loyal shopper is created for each spawned user

### Tips:
- read the repository's `/loadKatas/README.md`
- take a look at swagger endpoints of the booksApp v1
- basket is assigned either to sessionId or userId




