var app = angular.module("MyApp", ["ui.bootstrap.modal"]);
app.service("myservice",function(){
    this.mysaved=[];
});

app.controller("MyCtrl", function($scope,myservice) {

// fucntion: open - is to open the modal
  $scope.open = function() {
    $scope.showModal = true;
  };
  
   /**
   * ok : function
   * to hide the mode
   */
  $scope.ok = function() {
    $scope.showModal = false;
  };
  /**
   * clear: function
   * to clear all the filled details of the form with name myform
   */
  $scope.clear = function () {
    document.getElementById("myform").reset();
    this.selectedchart = "none";
    //document.getElementById("selectcharttype") = "none";
  }
  /**
   * cancel: function
   * hiding the modal
   */
  $scope.cancel = function() {
    $scope.showModal = false;
  };
/**
 * default value to the chart selection dropdown
 */
$scope.selectedchart ='none';

 /**
  * initializing myname variable to empty
  */
 $scope.myname='';
 $scope.addtodata;
 
/**
 * option: array
 * the list of names of the charts
 */
 $scope.options = ['line','bar','pie','area','donut'];
 /**
  * data1, data2 : array
  * two datas for chart generation
  */
 $scope.data1= ['data1', 30, 200, 100, 400, 150, 250];
 $scope.data2= ['data2', 50, 20, 10, 40, 15, 25];

  /**
   * initializing the save button to hide
   */
  $scope.savebutton ="none";
  /**
   * changesavebutton : function
   * to make the save button visible
   */
  $scope.changesavebutton = function() {
    this.savebutton = "block";
  }
 /**
  * declaring and initializing  myheight and mywidth
  */
  
  $scope.myheight;
  $scope.mywidth;

  /**
   * todo: this.myheight is undefined.
   * know what is the reaon
   */
  //console.log(this.myheight);


  /**
   * assignheightwidth : function
   * this function assigns the myheight and mywidth to 1000
   * if no value is given to the input height and input width at modal
   */
  /*
  $scope.assignheightwidth = function() {
    this.mywidth = document.getElementById("mywidth").value;
    this.myheight = document.getElementById("myheight").value;
    
    if(this.mywidth == '' ){
      this.mywidth = 1000;
      console.log("your width is:"+this.mywidth);
    }
    if(this.myheight == ''){
      this.myheight = 1000;
    }
  };
  */
  /**
   * generatechart : function
   * this function generates the chart
   */
  $scope.generatechart = function() {
    this.newheight = document.getElementById("myheight").value;
    this.newwidth = document.getElementById("mywidth").value;
    console.log("from function"+this.newheight);
//	var newele = angular.element("<div id='chart'"+"height="+$scope.newheight+"px width="+$scope.newwidth+"px ></div>");
//  var here = angular.element(document.querySelector("#showchart"));
//	here.append(newele);
	if(this.selectedchart =='donut'){
      this.donutchart(this.data1,this.data2);
    }
    if(this.selectedchart =='area'){
      this.areachart(this.data1,this.data2);
    };
    if(this.selectedchart == "line"){
     this.linechart(this.data1,this.data2);
    }if(this.selectedchart == "bar"){
    this.barchart(this.data1,this.data2);
    }
  if(this.selectedchart == "pie"){
    this.piechart(this.data1,this.data2);
    } 

  }


/**
 * i : an integer
 * this is to generate dynamic increasing ids to generated tabs .
 */
$scope.i = 1;
/**
 * appendtab : function
 * this is to append a new tab at tab space
 * do : increments the value of i by 1
 * pushes the name of chart selected to newele array
 * add the onclick event handeler to each tab
 */
$scope.appendtab = function () {
  $scope.mychartname = document.getElementById("chartname").value;    
  var tohere = angular.element( document.querySelector( '#tabs' ) );
  $scope.my = this.i;
  var ele = angular.element("<li class='tab'"+"id="+this.my+">"+this.mychartname+" </li>"); 
  tohere.append(ele); 
  document.getElementById(this.my).addEventListener("click", function(event){ 
    angular.element(document.body).scope().generatechartfromtab(event.toElement.id);
  });
  /**
   * Incrementing i after every tab generation
   */
  this.i = this.i +1;
};  
/**
* generatechartfromtab : function
* this function generates the chart from the selected tab
*/
$scope.mytabdata =[];

$scope.generatechartfromtab = function (val) {
  console.log(val);
  console.log(this.savedcharts[val-1]);
 $scope.mytabdata = this.savedcharts[val-1].slice(0);
 // console.log(this.mytabdata);
  /**
   * the data for generating the charts are available with
   * mytabdata[4]
   * mytabdata[5]
   */
  $scope.tabchartname = this.mytabdata[0];
  $scope.tabcharttype = this.mytabdata[1];
  this.newheight = parseInt(this.mytabdata[2]);
  this.newwidth = parseInt(this.mytabdata[3]);
  $scope.mydiv = document.getElementById("chart");
  this.mydiv.style.height = this.mytabdata[2]+"px";
  this.mydiv.style.width = this.mytabdata[3]+"px";
  this.mydiv.style.maxHeight = this.mytabdata[2];
  console.log(this.mydiv.style);
  console.log("the height should be"+this.mytabdata[2]);
  
/**
 * generating the charts form tab data
 * 
 */
  if(this.tabcharttype =='donut'){
    this.donutchart(this.mytabdata[4],this.mytabdata[5]);
  }
  if(this.tabcharttype == 'area'){
    this.areachart(this.mytabdata[4],this.mytabdata[5]);
  };
  if(this.tabcharttype == "line"){
    this.linechart(this.mytabdata[4],this.mytabdata[5]);
  }if(this.tabcharttype == "bar"){
  this.barchart(this.mytabdata[4],this.mytabdata[5]);
  }
  if(this.tabcharttype == "pie"){
  this.piechart(this.mytabdata[4],this.mytabdata[5]);  
  } 
}
/**
 * savedcharts : array
 * initialing with empty array to save the charts there after
 */
$scope.savedcharts = [];
/**
 * addto :function
 * to add the value to the data1 and data2 arrays
 */
$scope.addto = function() {
  this.data1.push(this.addtodata);
  this.data2.push(this.addtodata);
  this.addtodata=null;
  // console.log(this.data1);
  // console.log(this.data2);
  alert("new data added successfully");
}
/**
 * savingcharts : function
 * saves the generated chart to savedcharts array
 */
  $scope.savingcharts = function() {
    $scope.charttype = this.selectedchart;
    $scope.chartname = this.myname;
    //$scope.myarr = [this.newheight,this.newwidth];
  
    $scope.chartheight = document.getElementById("myheight").value;
    $scope.chartwidth = document.getElementById("mywidth").value;
    $scope.chartdata1 = this.data1;
    $scope.chartdata2 = this.data2;
    this.savedcharts.push([this.chartname,this.charttype,this.chartheight,this.chartwidth,this.chartdata1.slice(0),this.chartdata2.slice(0)]);
    myservice.mysaved.push([this.chartname,this.charttype,this.chartheight,this.chartwidth,this.chartdata1.slice(0),this.chartdata2.slice(0)]);
    console.log("from service");
    console.log(myservice.mysaved);

  }
  /**
   *showthecharts : function
   * this function shows the upto now saved charts in the div showsaved
   */
$scope.showthecharts = function() {
  console.log(this.savedcharts);
  document.getElementById("showsaved").innerHTML=this.savedcharts;
}


/**
 * mysubmit : function
 * generates the chart
 * appends the generated tab
 */
  $scope.mysubmit = function () {

    if(this.myname != '' && this.selectedchart !='none'){
      //console.log("not emppty");
      //this.assignheightwidth();
      this.appendtab();
      this.changesavebutton();
      this.savingcharts();
      this.generatechart();
      this.cancel();
      this.clear();
    }else{
      alert("fields of name and type cannot be empty");
      console.log("empty");
    }
  };
  /**
   * This is independent function to generate area chart
   * params: data1
   * params: data
   */
/**
 * linechart
 */
  $scope.linechart = function(data1,data2) {
    $scope.chart = c3.generate({
      data: {
        columns: [
          data1,
          data2
        ]
      }
    });
  }
/**
 * barchart
 */
$scope.barchart = function(data1,data2){
  
  var chart = c3.generate({
    data: {
      columns: [
        data1,
        data2
      ],
      type: 'bar'
    },
    bar: {
      width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
      }
      // or
      //width: 100 // this makes bar width 100px
    }
    });

} 
/**
 * piechart
 */
$scope.piechart = function(data1,data2) {
  $scope.piedata = [];
  for(var i =0;i<data1.length-1;i++){
  this.piedata.push(["data"+i,this.data1[i+1]]);
  }
  console.log(this.piedata);
  var chart = c3.generate({
  data: {
      // iris data from R
      columns: this.piedata,
      type : 'pie',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  }
  });
}
  /**
   * areachart : function
   */
  $scope.areachart = function(data1,data2) {
    var chart = c3.generate({
      data: {
          columns: [
              data1,
              data2,
          ],
          types: {
              data1: 'area-spline',
              data2: 'area-spline'
          }
      }
    });

  }
  /**
   * donutchart : function
   */
  $scope.donutchart = function(data1,data2){
   // console.log(data1);
    var chart = c3.generate({
      data: {
          columns: [
              data1,
             data2
          ],
          type : 'donut',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      donut: {
          title: "Iris Petal Width"
      }
    });
  }

});