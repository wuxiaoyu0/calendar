
import React, { Component, PropTypes } from 'react'

import CommonShow from './CommonShow'


function getLiItem(){
  var arr=[],
  num=9;
  for(var i=0;i<=24;i++){
    arr.push(parseInt((num)));
    if(num>=12.5){
      num=0.5;
    }
    num=num+0.5;
  }
  return arr;
}

var timeList=getLiItem().map((num,i)=>{
  if(i%2==0){
    return (<li key={i}>
            <span>{num}:00</span>
            <span>{(i<8)?"AM":"PM"}</span>
            </li>
          )
  }else{
    return (<li key={i}>
      <span>{num}:30</span>
    </li>)
  } 
});

var events=[
  {start:30,end:150},
  {start:540,end:600},
  {start:550,end:620},
  {start:560,end:630},
  {start:570,end:650},
  {start:640,end:690}
];

const elementLeft = (
    <ul className="cal-left">
      {timeList}
    </ul>
);
var left=0,width=100;
var num=0,arr=[];
for (let i = 1; i < events.length-1; i++) {
  if((events[i].end-events[i+1].start)>0){
    num++;
  }
}
for(var i=0;i<num;i++){
  arr.push(100/num*i);
}
const elementRight = events.map((event,index)=>{
  var top=event.start,
  height=event.end-event.start;
  // 从题目要求来看所有的事件中第一条数据和最后一条数据都是以left=0；的情况下显示的，因此可以循环遍历中间的数据来判断他们的显示情况
  if(index>=1&&index<=num){
    width=100/num;
    for(var i=0;i<arr.length;i++){
      if(index==i+1){
        left=arr[i];
      }
    }
  }else if(index==events.length-1){
    left=0;
   if((events[events.length-2].end-events[events.length-1].start)>0){
     width=100-(100/num);
   }else{
     width=100;
   }
  }

  return <CommonShow data={{top:top,height:height,left:left,width:width}}  key={index} />;
});


class Index extends Component {
  render() {
      return ( 
        <div className = "main-box" >
          {elementLeft}
          <div className="cal-right">
            <div className="cal-box">
              {elementRight}
            </div>
          </div>
        </div>
          
      )
  }
}

export default Index