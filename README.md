# Chat Bot Node.js
This Chat Bot was created for a challenge in a job interview. What this bot does is, it has a JSON file containing all over company's products
and as user you could ask for any product and you will have more information about it.

## Features

- Accepts user questions about specific product or list all products and possible to filter the products that it wants. E.g by product's brand.
- It's great and easily to implement

## Changelog

### Version 1.0

- First basic UI
- User could type the product's exactly name or type list to get a list of products

### Version 2.0

- Improved UI
- Changes to function that checks user's responses
  - Now the user could filter products listing by categories of a product or for a specific product's brand
  - Now the user could type "categories" for a list of product's categories
  - Keywords "list" and "categories" are now working even if user types like "please, a list of products". Detecting the keyword all along the phrase

### Version 2.0.1

- Added a function to make bot understand and continue the flow of conversation. E.g in case an user asks for a specific brand or category and after showing products listing, now it's possible to ask for "subscription price" for these products following the flow of conversation
- Changed the messages logging function to store user and bot responses, not just user responses
