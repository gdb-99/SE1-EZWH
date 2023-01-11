# Project Estimation  
<<<<<<< HEAD

Authors: Bianchi Giulia, Colella Edoardo, Colotti Manuel Enrique, Di Benedetto Giovanna

| Version number | Change                    |
| -------------- | :------------------------ |
| 1.0            | Initial base version      |
| 2.0            | Updated estimation tables |

=======
Date:

Version:
>>>>>>> master


# Estimation approach
Consider the EZWH  project as described in YOUR requirement document, assume that you are going to develop the project INDEPENDENT of the deadlines of the course
# Estimate by size
### 
<<<<<<< HEAD
|                                                                                                         | Estimate                                                                  |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| NC =  Estimated number of classes to be developed                                                       | 25 (model) + 30 (interfaces + abstract) + 10 (view) + 25(Controller) = 90 |
| A = Estimated average size per class, in LOC                                                            | 140 LOC                                                                   |
| S = Estimated size of project, in LOC (= NC * A)                                                        | 90 * 140 = 12600                                                          |
| E = Estimated effort, in person hours                                                                   | 12600 / 10 = 1260                                                         |
| C = Estimated cost, in euro (here use 1 person hour cost = 30 euro)                                     | 1260 * 30 = 37800                                                         |
| Estimated calendar time, in calendar weeks (Assume team of 4 people, 8 hours per day, 5 days per week ) | 1260 / (8 * 4 * 5) = 7,8 weeks                                            |

- Effort is evaluated considering 10 LOC per hour produced by each employee
- Number of classes and LOC for each class are computed considering a real Java project

# Estimate by product decomposition
### 
| component name       | Estimated effort (person hours) |
| -------------------- | ------------------------------- |
| requirement document | 296                             |
| GUI prototype        | 120                             |
| design document      | 112                             |
| code                 | 144                             |
| unit tests           | 48                              |
| api tests            | 80                              |
| management documents | 32                              |
=======
|             | Estimate                        |             
| ----------- | ------------------------------- |  
| NC =  Estimated number of classes to be developed   |                             |             
|  A = Estimated average size per class, in LOC       |                            | 
| S = Estimated size of project, in LOC (= NC * A) | |
| E = Estimated effort, in person hours (here use productivity 10 LOC per person hour)  |                                      |   
| C = Estimated cost, in euro (here use 1 person hour cost = 30 euro) | | 
| Estimated calendar time, in calendar weeks (Assume team of 4 people, 8 hours per day, 5 days per week ) |                    |               

# Estimate by product decomposition
### 
|         component name    | Estimated effort (person hours)   |             
| ----------- | ------------------------------- | 
|requirement document    | |
| GUI prototype ||
|design document ||
|code ||
| unit tests ||
| api tests ||
| management documents  ||

>>>>>>> master


# Estimate by activity decomposition
### 
<<<<<<< HEAD
| Activity name |                                        | Estimated effort (person hours) |
| ------------- | -------------------------------------- | ------------------------------- |
| Git Maven     |                                        | 32                              |
|               | Project setup                          | 32                              |
| Requirements  |                                        | 296                             |
|               | Stakeholders definition                | 32                              |
|               | Actors definition                      | 8                               |
|               | Functional Requirements definition     | 64                              |
|               | Non-Functional Requirements definition | 32                              |
|               | Use cases definition                   | 48                              |
|               | Scenarios definition                   | 64                              |
|               | Use cases diagram formalization        | 8                               |
|               | Glossary formalization                 | 16                              |
|               | System design formalization            | 16                              |
|               | Deployment diagram formalization       | 8                               |
| GUI Prototype |                                        | 120                             |
|               | GUI structure definition               | 24                              |
|               | GUI drafts creation                    | 96                              |
| Design        |                                        | 112                             |
|               | High level design                      | 32                              |
|               | Low level design                       | 48                              |
|               | Verification traceability matrix       | 16                              |
|               | Verification sequence diagrams         | 16                              |
| Coding        |                                        | 144                             |
|               | Definition of programming patterns     | 32                              |
|               | Implementation of classes              | 64                              |
|               | Integration among classes              | 48                              |
| Testing       |                                        | 128                             |
|               | Unit Testing                           | 48                              |
|               | Integration Testing                    | 48                              |
|               | Acceptance Testing                     | 32                              |

### Gantt Chart

<img src="./images/Gantt_chart.png" />

=======
|         Activity name    | Estimated effort (person hours)   |             
| ----------- | ------------------------------- | 
| | |
###
Insert here Gantt chart with above activities
>>>>>>> master

# Summary

Report here the results of the three estimation approaches. The  estimates may differ. Discuss here the possible reasons for the difference

<<<<<<< HEAD
|                                    | Estimated effort (person hours) | Estimated duration (days) |
| ---------------------------------- | ------------------------------- | ------------------------- |
| estimate by size                   | 1200                            | 54                        |
| estimate by product decomposition  | 840                             | 38                        |
| estimate by activity decomposition | 860                             | 40                        |


The estimation obtained by size of the project is the most reliable one as it is based on a real project, even if for a different domain.
The other two values instead are purely based on estimation and suppositions related to the amount of work that four people could do to get to the desired results.

Since the amount of experience on which the last two estimation are built upon is low, the two results are very similar one to another
=======
|             | Estimated effort                        |   Estimated duration |          
| ----------- | ------------------------------- | ---------------|
| estimate by size ||
| estimate by product decomposition ||
| estimate by activity decomposition ||
>>>>>>> master




