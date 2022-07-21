# patients-list
An optimised patient listing algorithm that helps provide the patients with high likelihood of making their appointment.

#### Endpoints
GET : http://localhost:3000/patients?lat=60.500&lon=80.2500.   
Where `lat` and `lon` is the latitude and longitude of the facility respectively.

#### Setting up
- clone the repo
- run `npm install`
- run `npm start`


### Sorting Factors
- Offer cancellation history
- Offer acceptance history
- Proximity to the Facilty
- Response time history.

##### Offer Cancellation History
This factor is weighted 30%, and it is gotten by taking evaluating the patients cancellation ratio.            
`cancelledOrders/(totalOrders)`
Patients that haven't made any orders yet have a full score here.

##### Offer Acceptance History
This factor is weighted 30%, and it is gotten by taking evaluating the patients acceptance ratio.            
`accetedOrders/(totalOrders)`
Patients that haven't made any orders yet have a full score here.

##### Response time 
This factor is weighted 20%, and it is gotten by taking evaluating the patients responseTime ratio.            
`patientAvgResponseTime/(AverageResponseAcrossAllUsers)`

##### Proximity to Faciilty
This factor is weighted 10%, and it is gotten by taking evaluating the patients distance to the facilty and giving it a percentage.                        
`Within 10km > 10% of total score`.          
`Within 20km 9% of total score`.        
`Within 30km 8% of total score`.    
`Others, 7% of total score`.  

#### Age
After a series of analysis conducted on the data set, `Age` was found not to be a good determining factor, hence all patients gets a full score for age.

| Age Group      | Avg Response Time | Avg Acceptance Percentage |
| ----------- | ----------- | ----------- |
|  21- 30     | 1836       | 49%      |
|  31- 40     | 1711       | 52%      |
|  41- 50     | 1841       | 51%      |
|  51- 60     | 1727       | 48%       |
|  61- 70     | 1960       | 49%       |
|  71- 80     | 1882       | 50%       |
|  81- 90     | 1681       | 49%       |


