
var app = angular.module("MyApp", ["ui.bootstrap.modal"]);

app.controller("MyCtrl", function($scope) {
// fucntion: open - is to open the modal
  $scope.open = function() {
    $scope.showModal = true;
  };
  /**
   * showchart : function name
   * this is for debugging purpose 
   * todo: delete after using it
   */
  $scope.showchart = function(val) {
    console.log("you clicked tab"+val);
    alert("click is working");
  }
  /**
   * I : an integer
   * this is to generate dynamic increasing ids to generated tabs .
   */
  $scope.i = 1;
  /**
   * newele : an array
   * this is to store the generated charts
   */
  $scope.newele= [];
  /**
 * generatechartfromtab : function
 * this function generates the chart from the selected tab
 */
$scope.generatechartfromtab = function (val) {
 $scope.mytabdata = this.savedcharts[val-1];
  console.log(this.mytabdata);
  $scope.tabchartname = this.mytabdata[0];
  $scope.tabcharttype = this.mytabdata[1];
  this.myheight = this.mytabdata[2];
  this.mywidth = this.mytabdata[3];
  
/**
 * generating the charts form tab data
 * 
 */

if(this.tabcharttype == "line"){
  $scope.chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        this.mytabdata[4],
        this.mytabdata[5]
      ]
    }
});
}if(this.tabcharttype == "bar"){

var chart = c3.generate({
data: {
  columns: [
    this.mytabdata[4],
    this.mytabdata[5]
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
if(this.tabcharttype == "pie"){
$scope.piedata = [];
for(var i =0;i<this.mytabdata[4].length-1;i++){
this.piedata.push(["data"+i,this.mytabdata[4][i+1]]);
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

}
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
  this.newele.push(this.selectedchart);
  $scope.my = this.i;
  var ele = angular.element("<button class='tab'"+"id="+this.my+">"+this.mychartname+" </button>"); 
  $scope.newalert = function() {
    alert("I am done");
  } 
  tohere.append(ele); 
  document.getElementById(this.my).addEventListener("click", function(event){ 
    angular.element(document.body).scope().generatechartfromtab(event.toElement.id);
    console.log(event.toElement.id);
  });
  /**
   * Incrementing i after every tab generation
   */
  this.i = this.i +1;
  };

/**
 * default value to the chart selection dropdown
 */
  $scope.selectedchart ='none';
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
  }
  /**
   * initializing myname variable to empty
   */
  $scope.myname='';
  $scope.addtodata;
  /**
   * cancel: function
   * hiding the modal
   */
  $scope.cancel = function() {
    $scope.showModal = false;
  };
 /**
  * option: array
  * the list of names of the charts
  */
  $scope.options = ['line','bar','pie'];
  /**
   * data1, data2 : array
   * two datas for chart generation
   */
  $scope.data1= ['data1', 30, 200, 100, 400, 150, 250];
  $scope.data2= ['data2', 50, 20, 10, 40, 15, 25];
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
    console.log(this.data1);
    console.log(this.data2);
    alert("new data added successfully");
  }
  /**
   * savingcharts : function
   * saves the generated chart to savedcharts array
   */
  $scope.savingcharts = function() {
    $scope.charttype = this.selectedchart;
    $scope.chartname = this.myname;
    $scope.chartheight = this.myheight;
    $scope.chartwidth = this.mywidth;
    $scope.chartdata1 = this.data1;
    $scope.chartdata2 = this.data2;
    this.savedcharts.push([this.chartname,this.charttype,this.chartheight,this.chartwidth,this.chartdata1.slice(0),this.chartdata2.slice(0)]);
  }
  /**
   *showthecharts : function
   * this function shows the upto now saved charts 
   */
$scope.showthecharts = function() {
  console.log(this.savedcharts);
  document.getElementById("showsaved").innerHTML=this.savedcharts;
}

  /**
   * generatechart : function
   * this function generates the chart
   */
  $scope.generatechart = function() {

    if(this.selectedchart == "line"){
      $scope.chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            this.data1,
            this.data2
          ]
        }
    });
    }if(this.selectedchart == "bar"){

    var chart = c3.generate({
    data: {
      columns: [
        this.data1,
        this.data2
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
    if(this.selectedchart == "pie"){
    $scope.piedata = [];
    for(var i =0;i<this.data1.length-1;i++){
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

  }
  /**
   * mysubmit : function
   * generates the chart
   * appends the generated tab
   */
  $scope.mysubmit = function () {
    this.appendtab();
    this.generatechart();
   this.savingcharts();

  
  if(this.myname != '' && this.selectedchart !='none'){
    console.log("not emppty");
    this.cancel();
    this.clear();
  }else{
    console.log("empty");
  }
  };

});