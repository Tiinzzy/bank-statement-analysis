# bank-statement-analysis
<h3> A functional project where, users can upload their bank statements in CSV format to display and track their expense habbits, written in Javacript.</h3>

![Group 2bsa ](https://user-images.githubusercontent.com/117464310/210423962-53b38e47-1c61-4589-8665-bb8baf290ecd.jpg)

<h4>Introduction</h4>
<p>This project oprates the same as apps such as Mint but in a lower level and simpler way. Bank Statement Analysis (BSA) doesn't require user to put any personal or banking information, just simply download their bake statement in CSV format and upload it. Both frontend and backend are written in Javascript, using node-json-db as database. For handling queries and REST APIs I have implemented Express and Axios.
</p>

<h4>Instructions</h4>
<p>BSA works by users uploading their CSV format bank statement and setting categories for each row. Then they can view their expenses habits and filter through the data, either by graphs or grid.

<p>BSA allows users to: </p><Li> Set categories for their expenses</li>
<li>Filter through their expenses</li> 
<li>Monitor their total spending for each category</li>
<li>Have overall view or detailed view of expenses on graphs</li>
</p>

<h4>User Installation</h4>
<p>
<ol>
  <li>Users can simply clone the project</li>
  <li>Run the clonned project in terminal by going to both main folders (cd bank-statement-analysis/back-end) and (cd bank-statement-analysis/front-end) and run (npm install) command, to install all modules and packages</li>
  <li>Open two sperate terminals and go to front-end folder and run the (npm start) command and in another terminal go to back-end folder and run (node index.js) command</li>
  <li>Browser will bring up the application and it is ready for use</li>
</ol> 
</p>

![Screenshot from 2023-01-03 14-34-15](https://user-images.githubusercontent.com/117464310/210428472-b54a7bbf-2113-4377-91fd-f1ef3ca52dee.png)
![Screenshot from 2023-01-03 14-46-45](https://user-images.githubusercontent.com/117464310/210430251-d30f48c0-757c-405f-a510-db8c2b3f2e51.png)

<h4>Limitations</h4>
  <li>Users can only upload one file at a time</li>
  <li>Uploading a new file will remove any pre-existing data</li>
  <li>Users can't have access to their old sets of data</li>
  <li>The grid only displays data with rows (length) of 100, users can't upload bigger files</li>

