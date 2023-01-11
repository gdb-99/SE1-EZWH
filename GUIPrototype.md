# Graphical User Interface Prototype  

Authors: Bianchi Giulia, Colella Edoardo, Colotti Manuel Enrique, Di Benedetto Giovanna



| Version number | Change               |
| -------------- | :------------------- |
| 1.0            | First drafts of GUI  |
| 2.0            | Final version of GUI |



- [Graphical User Interface Prototype](#graphical-user-interface-prototype)
- [Gui wireframes](#gui-wireframes)
  - [Login - UC25](#login---uc25)
  - [Home](#home)
  - [Admin area](#admin-area)
    - [New user - UC9](#new-user---uc9)
    - [View and edit user - UC10](#view-and-edit-user---uc10)
    - [Delete user - UC11](#delete-user---uc11)
  - [Test Area](#test-area)
    - [Test History](#test-history)
      - [View and Edit Test Log - UC19](#view-and-edit-test-log---uc19)
    - [Test Schedule](#test-schedule)
      - [View and edit Test Schedule - UC17](#view-and-edit-test-schedule---uc17)
      - [New Test Scheduling - UC16](#new-test-scheduling---uc16)
      - [Delete Test Schedule - UC18](#delete-test-schedule---uc18)
    - [Test Case Management](#test-case-management)
      - [New Test Case - UC13](#new-test-case---uc13)
      - [View and Edit Test Case - UC14](#view-and-edit-test-case---uc14)
      - [Delete Test Case - UC15](#delete-test-case---uc15)
    - [Test Area - Mobile Version](#test-area---mobile-version)
  - [Order Area](#order-area)
    - [Internal Order](#internal-order)
      - [View and Edit Internal Order - UC1](#view-and-edit-internal-order---uc1)
      - [Delete Internal Order](#delete-internal-order)
    - [Placing an order - UC2](#placing-an-order---uc2)
    - [External Order History](#external-order-history)
      - [Delete External Order](#delete-external-order)
    - [Suppliers List](#suppliers-list)
      - [Adding a Supplier - UC21](#adding-a-supplier---uc21)
    - [View and Edit Supplier - UC22](#view-and-edit-supplier---uc22)
    - [Delete Supplier - UC23](#delete-supplier---uc23)
  - [Warehouse Management - UC3](#warehouse-management---uc3)
    - [New Item](#new-item)
    - [View and Edit Item By Code - UC7, UC24](#view-and-edit-item-by-code---uc7-uc24)
      - [Insert an Item - UC5](#insert-an-item---uc5)
      - [View and Edit Item - UC6](#view-and-edit-item---uc6)
      - [Delete Item - UC8](#delete-item---uc8)
    - [Warehouse Area - Mobile Version](#warehouse-area---mobile-version)

# Gui wireframes

##  Login - UC25

<img src="gui_images/login.png" alt="Login" width="600"/>

In the login window, a warehouse user can insert email and password to login in the application. Eventually he can recover password clicking on *Forgot password?*. There is also a mobile version of the window.
 
##  Home

<img src="gui_images/home.png" alt="Home" width="600"/>

In the home window a user can access to the different areas of the applications. It is possibile to logout and the name and the role of the user are visibile in the right-down corner. There is also a mobile version of the window.

## Admin area

<img src="gui_images/admin_area.png" alt="Admin area" width="600"/>

Accessing to the administration Area, with admin permissions, it is possible to view the user list of the applications. It is possible to select a user to view all the information, search a user by name, view users' data, add a new user or delete an existing user. The confirm of a delete is asked by a Alert Dialog window. It is possible to go back to home window clicking *back* button. If a user without admin permission accesses to admin area, he jumps to his own profile page

### New user - UC9

<img src="gui_images/new_user.png" alt="New user" width="600"/>

An admin can add a user to the user list inserting all the needed informations.

### View and edit user - UC10

<img src="gui_images/view_user.png" alt="View and Edit user" width="600"/>

An user can view and edit his own informations. An admin can view and edit informations about all users.

### Delete user - UC11

<img src="gui_images/delete_user.png" alt="Delete user" width="300"/>

This window appears to ask confirm about the delete of a user. Only admins can delete a user.

## Test Area

<img src="gui_images/test_area.png" alt="Test Area" width="600"/>

In the test area is possible to access to Test History, Test Scheduling and Test Management areas.

### Test History

<img src="gui_images/test_history.png" alt="Test History" width="600"/>

In the Test History Area is possible to visualize a log of the test that have been executed. Clicking on a row is possible to open a more complete page aboute the single log

#### View and Edit Test Log - UC19

<img src="gui_images/view_test_log.png" alt="View and Edit Test Log" width="600"/>

In this page is possiible to view and edit informations about a test log. Only quality officiers can edit informations.

### Test Schedule

<img src="gui_images/test_schedule.png" alt="Test Schedule" width="600"/>

In the Test Schedule Area it is possible to visualize the schedule of the test that have been planned. Clicking on a row is possible to open a more complete page aboute the single scheduled test.

#### View and edit Test Schedule - UC17

<img src="gui_images/view_scheduled_test.png" alt="View and Edit Test Schedule" width="600"/>

In this page it is possible to view and edit informations about a single scheduled test.

#### New Test Scheduling - UC16

<img src="gui_images/new_test_scheduling.png" alt="New Test Scheduling" width="600"/>

In this page it is possible to schedule new tests, in a fixed o random way.

#### Delete Test Schedule - UC18

<img src="gui_images/delete_test_schedule.png" alt="Delete Test Scheduling" width="300"/>

With this Alert Dialog Window it is asked confirm for the delete of a scheduled test

### Test Case Management

<img src="gui_images/test_case_management.png" alt="Test Case Management" width="600"/>

In this page is possible to visualize the list of all test cases. It is possibile to add a new Test Case with the button down-right, search a test by code with the search bar down-left or get back to the home with the Back button.

#### New Test Case - UC13

<img src="gui_images/new_test_case.png" alt="New Test Case" width="600"/>

In this page is possible to create a new test case. The code will be procedurally created.

#### View and Edit Test Case - UC14

<img src="gui_images/view_test_case.png" alt="View and Edit Test Case" width="600"/>

In this page it is possible to view and edit informations about a single test case.

#### Delete Test Case - UC15

<img src="gui_images/delete_test_case.png" alt="Delete Test Case" width="300"/>

With this Alert Dialog Window is asked confirm for the delete of a test case

### Test Area - Mobile Version

<img src="gui_images/mobile_test.png" alt="Test Area - Mobile Version" width="600"/>

This is a mobile version of the whole Test Area

## Order Area

<img src="gui_images/order_area.png" alt="Order Area" width="600"/>

In the Order Area it is possible to access to Internal Order History, External Order History, Suppliers list and it is possible to place an order

### Internal Order

<img src="gui_images/OU_orders.png" alt="Internal Order" width="600"/>

Here it is possible to visualize the orders received from Organizational Units. It is possibile to search an order by code with the search bar down-left or get back to the home with the Back button.

#### View and Edit Internal Order - UC1

<img src="gui_images/view_internal_order.png" alt="View and Edit Internal Order" width="600"/>

In this page it is possible to view and edit informations about a single Internal Order Log. 

#### Delete Internal Order

<img src="gui_images/delete_internal_order.png" alt="Delete Internal Order" width="300"/>

With this Alert Dialog Window is asked confirm for the delete of an internal order.

### Placing an order - UC2

<img src="gui_images/place_an_order.png" alt="Placing an order" width="600"/>

Here it is possible to place an order, selecting an Item, a Supplier and the quantity.

### External Order History

<img src="gui_images/orders_history.png" alt="Orders History" width="600"/>

In this page it is possible to view and edit informations about a single External Order Log. It is possibile to search an order by code with the search bar down-left or get back to the home with the Back button.

#### Delete External Order 

<img src="gui_images/delete_external_order.png" alt="Delete External Order" width="300"/>

With this Alert Dialog Window is asked confirm for the delete of an external order

### Suppliers List

<img src="gui_images/supplier_list.png" alt="Suppliers List" width="600"/>

Here it is possible to visualize the list of all the suppliers. It is possibile to add a new Supplier with the button down-right, search an Item by code with the search bar down-left or get back to the home with the Back button.


#### Adding a Supplier - UC21

<img src="gui_images/new_supplier.png" alt="Adding a Supplier" width="600"/>

In this page is possible to add a new Supplier.

### View and Edit Supplier - UC22

<img src="gui_images/view_supplier.png" alt="View and Edit Supplier" width="600"/>

In this page it is possible to view and edit informations about a single Supplier.

### Delete Supplier - UC23

<img src="gui_images/delete_supplier.png" alt="Delete Supplier" width="300"/>

With this Alert Dialog Window is asked confirm for the delete of a supplier

## Warehouse Management - UC3

<img src="gui_images/warehouse_management.png" alt="Warehouse Management" width="600"/>

In this page it is possible to see a list of every type of items stored. It is possibile to add a new Item with the button down-right, search an Item by code with the search bar down-left or get back to the home with the Back button.

### New Item 

<img src="gui_images/new_item.png" alt="New Item" width="600"/>

In this page is possible to add a new item.

### View and Edit Item By Code - UC7, UC24

<img src="gui_images/view_item_by_code.png" alt="View and Edit Item By Code" width="600"/>

In this page is possible to view all the article of a type of item. It is even possible to eliminate or edit the position of the article in the warehouse clicking on the pencil button.

#### Insert an Item - UC5

<img src="gui_images/insert_item.png" alt="Inserting Item" width="600"/>

In this page is possible to insert a new article in the warehouse. With the Autocomplete button an algoritm finds a way to insert every item in a free spot. 

#### View and Edit Item - UC6

<img src="gui_images/view_item.png" alt="View and Edit Item" width="600"/>

In this page it is possible to view and edit informations about a single item type.

#### Delete Item - UC8

<img src="gui_images/delete_item.png" alt="Delete Item" width="300"/>

With this Alert Dialog Window is asked confirm for the delete of an item

### Warehouse Area - Mobile Version

<img src="gui_images/warehouse_mobile.png" alt="Warehouse Area - Mobile Version" width="600"/>

