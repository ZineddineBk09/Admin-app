# Client:

- [x] Fix login issues (Re-create Login from scratch)

  - [x] Frontend:
    - [x] Update login form
    - [x] Add login error handling
    - [x] Add login redirection
  - [x] Backend:
    - [x] Update login endpoint (authapp)

- [ ] Create new order

  - [x] remove serial number (auto generated from system)

  - [x] add note on External ID (it should match the order in the client system)

  - [x] Remove Delivery Fee (it should be calculated from the system)
  - [x] Remove Pickup Address (it should be the client address)

  - [x] Delivery Address (example: https://maps.app.goo.gl/n2sgWZrN7rgjTh7UA)
    - [x] Decode it to retrieve the address with google maps API
    - [x] The alternative is to click on checkbox (collect customer location for us)
  - [x] Remove client branch (it should be encoded in the client accessToken when he logs in)

  - [x] Change payment type to Radio Group

    - [ ] Online Payment:
      - [ ] Collect Order (send payment link with paytabs) + Delivery Fees from customer (checkbox)
      - **DISABLED** Collect Delivery fees only

  <img src="./public/screenshots/Create Order - Client.png" alt="Create New Order For Client" width="750">

  - [x] Generate Reports
  - [ ] <img src="./public/screenshots/Generate Reports Example.png" alt="Generate Reports Example" width="750">

- [ ] View all orders list
  - [x] Add action column
  - [x] Make sure all filters work
  - [ ] Add pagination

# Admin:

- [x] Responsive design for all pages
- [x] Generate Reports

<img src="./public/screenshots/Generate Reports Example.png" alt="Generate Reports Example" width="750">

- [ ]

# Other tasks:

- [x] Change the code structure (admin, client)
