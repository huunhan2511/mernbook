# SAGOBO Book-store
Description: An e-commerce bookstore website using RESTful API with some basic features: register/login, shopping, order manage/tracking,... most special with sand box virtual online pay (VNPAY).

> ### **Live Demo**: 
> ### **API Server**: 

## Tech Stack (MERN)

**Front-end :**
Reactjs, Redux

**Back-end :** 
Nodejs, Expressjs

## Authors
- [@Haotk](https://github.com/Haotk)
- [@phuongnam2811](https://github.com/phuongnam2811)
- [@huunhan2511](https://github.com/huunhan2511)
---
## API Reference

### Auth routes

Method | API | Description |
:----: | ------------- | ------------- |
POST | /auth/register | Register user account |
POST | /auth/login | User login |
GET | /auth/reset | Reset password |

### Admin routes

Method | API | Description |Authorization
:----: | ------------- | ------------- | ------------- 
GET | /admin | Get all admin account | JSON Web Token
POST | /admin/login | Admin login | JSON Web Token
POST | /admin/register/ | Register admin account | JSON Web Token

### Accounts routes

Method | API | Description  | Authorization
:----: | ------------- | ------------- | ------------- 
GET | /accounts |  Get all accounts | JSON Web Token
PATCH | /accounts/change-password |  Change account password | JSON Web Token
GET | /accounts/orders | Get cart | JSON Web Token
GET | /accounts/orders/:id | Get cart | JSON Web Token
PATCH | /accounts/orders | Get cart | JSON Web Token
GET | /accounts/information | Get account information | JSON Web Token
PATCH | accounts/information | Update information  | JSON Web Token

### Vouchers routes

Method | API | Description |  Authorization
:----: | ------------- | ------------- | -------------
GET | /vouchers |Get all vouchers | JSON Web Token
GET | /vouchers/:code | Get voucher by code | JSON Web Token
POST | /vouchers | Create new voucher | JSON Web Token
PATCH | /vouchers | Update voucher | JSON Web Token
GET | /apply:code | Apply voucher | JSON Web Token

### Authors routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /authors |Get all authors | JSON Web Token
GET | /authors/:id | Get author by id | JSON Web Token
POST | /authors | Create new author | JSON Web Token
PATCH | /authors | Update author | JSON Web Token

### Categories routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /category |Get all categories | JSON Web Token
GET | /category/:id | Get category by id | JSON Web Token
POST | /category | Create new category | JSON Web Token
PATCH | /category | Update category | JSON Web Token
DELETE | /category/:id | Delete category | JSON Web Token

### Publishers routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /publishers | Get all publishers | JSON Web Token
GET | /publishers/:id | Get publishers by id | JSON Web Token
POST | /publishers | Create new publishers | JSON Web Token
PATCH | /publishers | Update publishers | JSON Web Token

### Orders routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /orders | Get all orders | JSON Web Token
GET | /orders/:id | Get orders by id | JSON Web Token
POST | /orders | Create new orders | JSON Web Token
PATCH | /orders | Update orders | JSON Web Token

### Products routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /products | Get all products | JSON Web Token
GET | /products/:id | Get products by id | JSON Web Token
POST | /products | Create new products | JSON Web Token
PATCH | /products | Update products | JSON Web Token

### Status routes

Method | API | Description | Authorization
:----: | ------------- | ------------- | -------------
GET | /status | Get all status | JSON Web Token
GET | /status/:id | Get status by id | JSON Web Token
POST | /status | Create new status | JSON Web Token
PATCH | /status | Update status | JSON Web Token


---

## Some Screenshots
| **Home** | **Products** |
| :-: | :-: |
| ![Home](https://imgur.com/m5bYAxe.png) | ![Products](https://imgur.com/PnFuIw8.png) |

| **Product** | **Cart** |
| :-: | :-: |
| ![Product](https://imgur.com/n6bO10X.png) | ![Cart](https://imgur.com/0absd0q.png) |

