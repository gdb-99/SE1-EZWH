# Integration and API Test Report

Date: 25/05/2022

Version: 1.0

# Contents

- [Dependency graph](#dependency graph)

- [Integration and API Test Report](#integration-and-api-test-report)
- [Contents](#contents)
- [Dependency graph](#dependency-graph)
- [Integration approach](#integration-approach)
- [Integration Tests](#integration-tests)
  - [Restock Orders Controllers Test Suite](#restock-orders-controllers-test-suite)
  - [Return Orders Controllers Test Suite](#return-orders-controllers-test-suite)
  - [Internal Orders Controllers Test Suite](#internal-orders-controllers-test-suite)
  - [SkuItem Controller Test Suite](#skuitem-controller-test-suite)
  - [Position Controller Test Suite](#position-controller-test-suite)
  - [SKU Controller Test Suite](#sku-controller-test-suite)
  - [User Controller Test Suite](#user-controller-test-suite)
  - [Test Descriptor Controller Test Suite](#test-descriptor-controller-test-suite)
  - [Test Result Controller Test Suite](#test-result-controller-test-suite)
  - [Item Controller Test Suite](#item-controller-test-suite)
- [Coverage of Scenarios and FR](#coverage-of-scenarios-and-fr)
- [Coverage of Non Functional Requirements](#coverage-of-non-functional-requirements)
    - [](#)


  

- [Tests](#tests)

- [Scenarios](#scenarios)

- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)



# Dependency graph 

<img src="images/DependencyGraph.png" alt="DependencyGraph" width="1200"/>
     
# Integration approach
To implement Integration tests we have used a mixed approach between Top-Down and Bottom-Up, this is because our Integration and Unit Tests are merged together in several test suites.
The reason of this choice is that in our Unit Tests we were obliged to test together more than one class (it'd have been useless to test only a single Controller that can't perform any operation without the database) at a time because of our application design, which is in contrast with the definition of "Unit Test".


    


#  Integration Tests


## Restock Orders Controllers Test Suite 
| Classes                                                           | Jest test cases                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------ |
| controller.js - restockOrderController.js - dbManager.js          | test("Successfully add new Restock Order to Database")       |
| controller.js - restockOrderController.js - dbManager.js          | test("Insertion of a RestockOrder with malformed date")      |
| controller.js - restockOrderController.js - dbManager.js          | test("Insertion of a RestockOrder with invalid supplierId")  |
| controller.js - restockOrderController.js - dbManager.js          | test('Successfully edit a Restock Order')                    |
| controller.js - restockOrderController.js - dbManager.js          | test('Edit a Restock Order with an invalid state')           |
| controller.js - restockOrderController.js - dbManager.js          | test('Edit a non-existing Restock Order')                    |
| controller.js - restockOrderController.js - dbManager.js          | test('Successfully delete a Restock Order')                  |
| controller.js - restockOrderController.js - dbManager.js          | test('Delete a non-existing Restock Order')                  |
| controller.js - restock, sku, skuItems controllers - dbManager.js | test("Add SKU Items to Restock Order")                       |
| ontroller.js - restock, sku, skuItems controllers - dbManager.js  | test("Failed to add SKU Items due to invalid SKU")           |
| controller.js - restockOrderController.js - dbManager.js          | test("Get restock order to be returned")                     |
| controller.js - restockOrderController.js - dbManager.js          | test("Get restock order to be returned with wrong params")   |
| controller.js - restockOrderController.js - dbManager.js          | test('Add and Get a Transport Note in a Restock Order Test') |
| controller.js - restockOrderController.js - dbManager.js          | test('Failed to add transportNote due to state')             |
| controller.js - restockOrderController.js - dbManager.js          | test('Failed to add transportNote due to invalid date')      |
| controller.js - restockOrderController.js - dbManager.js          | test('Failed to add transportNote due to old delivery date') |



## Return Orders Controllers Test Suite
| Classes                                                 | Jest test cases                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| controller.js - returnOrderController.js - dbManager.js | test('Successfully create a new Return Order')                           |
| controller.js - returnOrderController.js - dbManager.js | test('Creation of a Return Order with an invalid Restock Order id'       |
| controller.js - returnOrderController.js - dbManager.js | test('Creation of a Return Order with an invalid date'                   |
| controller.js - returnOrderController.js - dbManager.js | test('Creation of a Return Order with one or more non-existing products' |
| controller.js - returnOrderController.js - dbManager.js | test('Successfully delete a Return Order'                                |
| controller.js - returnOrderController.js - dbManager.js | test('Delete a non-existing Return Order')                               |


## Internal Orders Controllers Test Suite
| Classes                                                   | Jest test cases                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| controller.js - internalOrderController.js - dbManager.js | test("Successfully add a new Internal Order to Database")            |
| controller.js - internalOrderController.js - dbManager.js | test("Insertion of an Internal Order with malformed date")           |
| controller.js - internalOrderController.js - dbManager.js | test("Insertion of an Internal Order with invalid customerId")       |
| controller.js - internalOrderController.js - dbManager.js | test("Successfully edit an Internal Order with state = 'ACCEPTED'")  |
| controller.js - internalOrderController.js - dbManager.js | test("Successfully edit an Internal Order with state = 'COMPLETED'") |
| controller.js - internalOrderController.js - dbManager.js | test("Edit an Internal Order with an invalid state")                 |
| controller.js - internalOrderController.js - dbManager.js | test("Edit a non-existing Internal Order")                           |
| controller.js - internalOrderController.js - dbManager.js | test("Successfully delete an Internal Order")                        |
| controller.js - internalOrderController.js - dbManager.js | test("Delete a non-existing Internal Order")                         |


## SkuItem Controller Test Suite

   
| Classes                                             | Jest test cases                                                   |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| controller.js - skuItemController.js - dbManager.js | test('successfull use of getAllSkuItems')                         |
| controller.js - skuItemController.js - dbManager.js | test('successfull use of getSkuItems')                            |
| controller.js - skuItemController.js - dbManager.js | test('attempt to use getSkuItems with a non-existant skuid')      |
| controller.js - skuItemController.js - dbManager.js | test('attempt to use getSkuItems with a invalid skuid')           |
| controller.js - skuItemController.js - dbManager.js | test('successfull use of getSkuItem')                             |
| controller.js - skuItemController.js - dbManager.js | test('attempt to use getSkuItem with a non-existant rfid')        |
| controller.js - skuItemController.js - dbManager.js | test('attempt to use getSkuItem with an invalid rfid')            |
| controller.js - skuItemController.js - dbManager.js | test('successful use of createSku and createSKUitem')             |
| controller.js - skuItemController.js - dbManager.js | test('attempt to create SkuItem with non-existent SKUId')         |
| controller.js - skuItemController.js - dbManager.js | test('attempt to create SkuItem with invalid rfid')               |
| controller.js - skuItemController.js - dbManager.js | test('attempt to create SkuItem with an already used rfid')       |
| controller.js - skuItemController.js - dbManager.js | test('attempt to create SkuItem with invalid SKUId')              |
| controller.js - skuItemController.js - dbManager.js | test('attempt to create SkuItem with invalid date')               |
| controller.js - skuItemController.js - dbManager.js | test('successful use of createSkuItem and editSkuItem')           |
| controller.js - skuItemController.js - dbManager.js | test('attempt to edit a non-existant SkuItem')                    |
| controller.js - skuItemController.js - dbManager.js | test('attempt to edit a SkuItem with an invalid rfid')            |
| controller.js - skuItemController.js - dbManager.js | test('attempt to edit a SkuItem with an invalid available value') |
| controller.js - skuItemController.js - dbManager.js | test('attempt to edit a SkuItem with an invalid date')            |
| controller.js - skuItemController.js - dbManager.js | test('successful use of createSkuItem and deleteSkuItem')         |
| controller.js - skuItemController.js - dbManager.js | test('attempt to delete a SkuItem with an invalid rfid')          |




## Position Controller Test Suite 

   
| Classes                                              | Jest test cases                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| controller.js - positionController.js - dbManager.js | test('successfully use of getAllPositions')                        |
| controller.js - positionController.js - dbManager.js | test('successfully use of createPosition')                         |
| controller.js - positionController.js - dbManager.js | test('attempt of createPosition with invalid PositionID')          |
| controller.js - positionController.js - dbManager.js | test('attempt of createPosition with incompatible position codes') |
| controller.js - positionController.js - dbManager.js | test('attempt of createPosition with an undefined parameter')      |
| controller.js - positionController.js - dbManager.js | test('attempt of createPosition with negative weight')             |
| controller.js - positionController.js - dbManager.js | test('attempt of createPosition with negative volume')             |
| controller.js - positionController.js - dbManager.js | test('successful use of editPositionVer1')                         |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with an invalid positionID')     |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with non-existant position')     |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with invalid position codes')    |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with negative weight')           |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with negative volume')           |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with negative occupiedWeight')   |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer1 with negative occupiedVolume')   |
| controller.js - positionController.js - dbManager.js | test('successful use of editPositionVer2')                         |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer2 with a non-existant position')   |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer2 with an invalid oldPositionID')  |
| controller.js - positionController.js - dbManager.js | test('attempt of editPositionVer2 with an invalid newPositionID')  |
| controller.js - positionController.js - dbManager.js | test('successful use of deletePosition')                           |
| controller.js - positionController.js - dbManager.js | test('attempt of deletePosition with invalid positionId')          |
| controller.js - positionController.js - dbManager.js | test('successful use of checkPositionID')                          |
| controller.js - positionController.js - dbManager.js | test('attempt of checkPositionID with invalid PositionID')         |
| controller.js - positionController.js - dbManager.js | test('attempt of checkPositionID with invalid aisleID')            |
| controller.js - positionController.js - dbManager.js | test('attempt of checkPositionID with invalid row')                |
| controller.js - positionController.js - dbManager.js | test('attempt of checkPositionID with invalid col')                |
| controller.js - positionController.js - dbManager.js | test('attempt of checkPositionID with incompatible codes')         |

## SKU Controller Test Suite 
| Classes                                         | Jest test cases                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| controller.js - skuController.js - dbManager.js | test('successful use of getAllSku')                                                                                            |
| controller.js - skuController.js - dbManager.js | test('successful use of getSku')                                                                                               |
| controller.js - skuController.js - dbManager.js | test('use of getSku with invalid id')                                                                                          |
| controller.js - skuController.js - dbManager.js | test('use of getSku with non-existant sku')                                                                                    |
| controller.js - skuController.js - dbManager.js | test("Successfully add new Sku to Database")                                                                                   |
| controller.js - skuController.js - dbManager.js | test("Insertion of a sku with a missing value")                                                                                |
| controller.js - skuController.js - dbManager.js | test("Insertion of a Sku with negative volume")                                                                                |
| controller.js - skuController.js - dbManager.js | test('Successfully edit a sku')                                                                                                |
| controller.js - skuController.js - dbManager.js | test('Edit a sku with an invalid new volume')                                                                                  |
| controller.js - skuController.js - dbManager.js | test('Edit a sku in such a way that newWeight*newAvailableQuantity>maxWeight of the position in which is stored')              |
| controller.js - skuController.js - dbManager.js | test('Edit a non-existing Sku')                                                                                                |
| controller.js - skuController.js - dbManager.js | test('Edit a sku with an undefined value)                                                                                      |
| controller.js - skuController.js - dbManager.js | test('Successfully edit a position of a sku')                                                                                  |
| controller.js - skuController.js - dbManager.js | test('Edit a Sku with a position that is not capable to satisfy volume and weight constraints for available quantity of sku ') |
| controller.js - skuController.js - dbManager.js | test('Edit a non-existing Sku')                                                                                                |
| controller.js - skuController.js - dbManager.js | test('Edit a Sku with a non-existing position ')                                                                               |
| controller.js - skuController.js - dbManager.js | etst('Successfully delete a Sku')                                                                                              |
| controller.js - skuController.js - dbManager.js | test('attempt to delete a Sku with an invalid skuid')                                                                          |
| controller.js - skuController.js - dbManager.js | test('Delete a non-existing Sku')                                                                                              |

## User Controller Test Suite 
| Classes                                          | Jest test cases                                                      |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| controller.js - userController.js - dbManager.js | test("Succesful test, user is manager and is logged")                |
| controller.js - userController.js - dbManager.js | test("Failure test, user is not logged")                             |
| controller.js - userController.js - dbManager.js | test("Succesfully get the manager")                                  |
| controller.js - userController.js - dbManager.js | test("Succesfully get an user ")                                     |
| controller.js - userController.js - dbManager.js | test("Test failure, user is not logged")                             |
| controller.js - userController.js - dbManager.js | test("Succesfully get all the Suppliers")                            |
| controller.js - userController.js - dbManager.js | test("Succesfully get all the Users")                                |
| controller.js - userController.js - dbManager.js | test("Succesful creation of a new user")                             |
| controller.js - userController.js - dbManager.js | test("Not succesfull creation, user with same email and type exist") |
| controller.js - userController.js - dbManager.js | test("Not succesful creation, attempted to create a manager" )       |
| controller.js - userController.js - dbManager.js | test("Succesful login")                                              |
| controller.js - userController.js - dbManager.js | test("Failed login, the username is not in the body")                |
| controller.js - userController.js - dbManager.js | test("Failed login, wrong username")                                 |
| controller.js - userController.js - dbManager.js | ttest("Succesful logout, user is logged")                            |
| controller.js - userController.js - dbManager.js | test("Failure, the user is not logged")                              |
| controller.js - userController.js - dbManager.js | test("Succesful test, edit done")                                    |
| controller.js - userController.js - dbManager.js | test("Failure, wrong username")                                      |
| controller.js - userController.js - dbManager.js | test("Failure, tryng to change type into manager")                   |
| controller.js - userController.js - dbManager.js | test("Succesfully delete an user")                                   |
| controller.js - userController.js - dbManager.js | test("User not deleted, trying to delete a manager")                 |
| controller.js - userController.js - dbManager.js | test("User not deleted, trying to delete a non existing user")       |



## Test Descriptor Controller Test Suite
   
| Classes                                                    | Jest test cases                                                |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| controller.js - testDescriptorController.js - dbManager.js | test("Successfully create a Test Descriptor")                  |
| controller.js - testDescriptorController.js - dbManager.js | test("Insertion of a test descriptor with a non-existing SKU") |
| controller.js - testDescriptorController.js - dbManager.js | test("Insertion of a test descriptor with invalid body")       |
| controller.js - testDescriptorController.js - dbManager.js | test("Successfully edit a Test Descriptor")                    |
| controller.js - testDescriptorController.js - dbManager.js | test("Edit a Test Descriptor with invalid id")                 |
| controller.js - testDescriptorController.js - dbManager.js | test("Edit a Test Descriptor with a non-existent SKU")         |
| controller.js - testDescriptorController.js - dbManager.js | test("Successfully delete a Test Descriptor")                  |
| controller.js - testDescriptorController.js - dbManager.js | test("Delete a non-existing Test Descriptor")                  |

## Test Result Controller Test Suite
   
| Classes                                                | Jest test cases                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------- |
| controller.js - testResultController.js - dbManager.js | test("successful use of getTestResults")                                |
| controller.js - testResultController.js - dbManager.js | test("attempt of getTestResults with an undefined parameter")           |
| controller.js - testResultController.js - dbManager.js | test("attempt of getTestResults with an invalid parameter")             |
| controller.js - testResultController.js - dbManager.js | attempt of getTestResults with a non-existant rfid                      |
| controller.js - testResultController.js - dbManager.js | test("successful use of getTestResult")                                 |
| controller.js - testResultController.js - dbManager.js | test("attempt of getTestResults with an undefined parameter")           |
| controller.js - testResultController.js - dbManager.js | test("attempt of getTestResult with an invalid parameter")              |
| controller.js - testResultController.js - dbManager.js | test("attempt of getTestResults with a non-existant testResult")        |
| controller.js - testResultController.js - dbManager.js | test("Successful use of createTestResult")                              |
| controller.js - testResultController.js - dbManager.js | test("attempt of createTestResult with a non-existant test descriptor") |
| controller.js - testResultController.js - dbManager.js | test("attempt of createTestResult with a non-existant skuitem")         |
| controller.js - testResultController.js - dbManager.js | test("attempt of createTestResult with an undefined parameter")         |
| controller.js - testResultController.js - dbManager.js | test("attempt of createTestResult with an invalid parameter")           |
| controller.js - testResultController.js - dbManager.js | test("attempt of createTestResult with an invalid date")                |
| controller.js - testResultController.js - dbManager.js | test("successful use of editTestResult")                                |
| controller.js - testResultController.js - dbManager.js | test("attempt of editTestResult with an undefined parameter")           |
| controller.js - testResultController.js - dbManager.js | test("attempt of editTestResult with an invalid parameter")             |
| controller.js - testResultController.js - dbManager.js | test("attempt of editTestResult with a non-existant testDescriptor")    |
| controller.js - testResultController.js - dbManager.js | test("attempt of editTestResult with a non-existant testResult")        |
| controller.js - testResultController.js - dbManager.js | test("attempt of editTestResult with a non-existant skuitem")           |
| controller.js - testResultController.js - dbManager.js | test("successful use of deleteTestResult")                              |
| controller.js - testResultController.js - dbManager.js | test("attempt of deleteTestResult with an undefined parameter")         |
| controller.js - testResultController.js - dbManager.js | test("attempt of deleteTestResult with an invalid parameter")           |

## Item Controller Test Suite
| Classes                                          | Jest test cases                                             |
| ------------------------------------------------ | ----------------------------------------------------------- |
| controller.js - itemController.js - dbManager.js | test('successful use of getAllItems')                       |
| controller.js - itemController.js - dbManager.js | test('successful use of getItem')                           |
| controller.js - itemController.js - dbManager.js | test('attempt of getItem with undefined id')                |
| controller.js - itemController.js - dbManager.js | test('attempt of getItem with invalid id')                  |
| controller.js - itemController.js - dbManager.js | test('attempt of getItem with non-existant item')           |
| controller.js - itemController.js - dbManager.js | test('successful use of createItem')                        |
| controller.js - itemController.js - dbManager.js | test('attempt of createItem with an undefined parameter')   |
| controller.js - itemController.js - dbManager.js | test('attempt of createItem with an invalid id')            |
| controller.js - itemController.js - dbManager.js | test('attempt of createItem with a negative parameter')     |
| controller.js - itemController.js - dbManager.js | test('attempt of createItem with a non-existant sku')       |
| controller.js - itemController.js - dbManager.js | test('attempt of createItem with an already existant item') |
| controller.js - itemController.js - dbManager.js | test('successful use of editItem')                          |
| controller.js - itemController.js - dbManager.js | test('attempt of editItem with an undefined parameter')     |
| controller.js - itemController.js - dbManager.js | test('attempt of editItem with a invalid parameter')        |
| controller.js - itemController.js - dbManager.js | test('attempt of editItem with a negative parameter')       |
| controller.js - itemController.js - dbManager.js | test('attempt of editItem with a non-existant item')        |
| controller.js - itemController.js - dbManager.js | test('successful use of deleteItem')                        |
| controller.js - itemController.js - dbManager.js | test('attempt of deleteItem with undefined id')             |
| controller.js - itemController.js - dbManager.js | test('attempt of deleteItem with invalid id')               |

# Coverage of Scenarios and FR


We have decided to not include in this document the implementation of each mocha test for comprehensibility. The latters are available inside the "test" folder and can be identified by the same name written in the following table. 
Please note that many of the mocha test cases' implemented (each of them testing a specific API with different values for the specified predicates) are not present in this table as they don't entirely correspond to a specific Functional Requirement or Scenario.




| Scenario ID   | Functional Requirements covered | Mocha  Test(s)                                                                               |
| ------------- | ------------------------------- | -------------------------------------------------------------------------------------------- |
| 3-1, 3-2      | FR 5.1, 5.2, 5.3, 5.5           | Succesfully add and get a new Restock Order                                                  |
| 3-1, 3-2      | FR 5.2, 5.3                     | Successfully add a list of SKUItems                                                          |
| 3             | FR 5.6                          | Successfully add a transportNote to a Restock Order                                          |
| 4             | FR1.3, FR1.4                    | Succesfully get all user info                                                                |
| 4-1           | FR1.1                           | Succesfully add a new user                                                                   |
| 4-2           | FR1.1, 1.5                      | Succesfully edit user                                                                        |
| 4-3           | FR1.2                           | Succesfully delete a user                                                                    |
| 5-2-1 - 5-2-3 | FR 5.7, 5.8.2                   | Edit restock order state, Succesfully add a new Test result                                  |
|               | FR 5                            | Successfully delete a Restock Order                                                          |
| 6             | FR 5.9                          | Successfully create a new Return Order                                                       |
| 6             | FR 5.11                         | Successfully delete a Return Order                                                           |
| 7-1           | FR1.5                           | Succesfully log a customer, manager, supplier, clerk, quality employee and delivery amployee |
| 7-2           | FR1.5                           | Succesfully logout                                                                           |
| 9.1           | FR 6                            | Successfully add a new Internal Order                                                        |
| 9.3           | FR 6                            | Successfully delete an internal order                                                        |
| 11.1          | FR 7                            | Successfully add a new Item                                                                  |
| 11.2          | FR 7                            | Successfully edit an Item                                                                    |
| 12-1          | FR3.2.1                         | Succesfully add a new Test Descriptor                                                        |
| 12-2          | FR3.2.2                         | Succesfully edit Test Descriptor                                                             |
| 12-3          | FR3.2.3                         | Succesfully delete a Test Descriptor                                                         |
| 1-1           | FR 2.1                          | Successfully created a sku                                                                   |
|               | FR 2.2                          | Successfully deleted a sku                                                                   |
|               | FR 2.3                          | Successfully got a list of SKUs                                                              |
| 2-1           | FR 3.1.1                        | Successfully created a position                                                              |
| 2-5           | FR 3.1.2                        | Successfully deleted a position                                                              |
|               | FR 3.1.3                        | Successfully got a list of positions                                                         |
| 2-2, 2-3, 2-4 | FR 3.1.4                        | Successfully edited a position                                                               |


# Coverage of Non Functional Requirements


<Report in the following table the coverage of the Non Functional Requirements of the application - only those that can be tested with automated testing frameworks.>


### 

| Non Functional Requirement | Test name                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| NFR2                       | All                                                                                          |
| NFR3                       | All                                                                                          |
| NFR4                       | RestockOrderAPITest.js, ReturnOrderAPITest.js, PositionAPITest.js                            |
| NFR6                       | RestockOrderAPITest.js, ReturnOrderAPITest.js, SkuItemAPITest.js                             |
| NFR9                       | InternalOrderAPITest.js, RestockOrderAPITest.js, ReturnOrderAPITest.js, TestResultAPITest.js |
