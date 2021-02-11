import { Component } from '@angular/core';
import {MyserviceService} from './myservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todayDate;
  public persondata = [];


  constructor(private myservice: MyserviceService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.todayDate = this.myservice.showTodayDate();
    this.myservice.getData().subscribe(data => {
      this.persondata = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.persondata);
    },)
  }

  title = 'Welcome To Angular Project';
  description = 'This project is built by using the most popular JavaScript Framework.';

  months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

  isAvailable = true;

  samplePipeData = "This is pipe testing.";

  setTrue(){
    console.log("The value is set to TRUE.")
  }

  setFalse(){
    console.log("The value is set to FALSE")
  }

  firstFeature = {
    heading: "Feature One",
    body: "Some feature of the first feature for demo" 
  };

  secondFeature = {
    heading: "Feature Two", 
    body: "Some feature of the second feature for demo" 
  };

  thirdFeature = {
    heading: "Feature Three",
    body: "Some feature of the third feature for demo"
  };

  fourthFeature = {
    heading: "Feature Four",
    body: "Some feature of the fourth feature for demo" 
  };
  
  

}
