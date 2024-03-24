let target=document.getElementById('btn')
target.addEventListener('click',function(){
   let HTML=Number(document.getElementById('HTML').value);
   let CSS=Number(document.getElementById('CSS').value);
   let JS=Number(document.getElementById('JS').value);
   let Pyt=Number(document.getElementById('Pyt').value);

   let total = HTML+ CSS + JS + Pyt;
   let per=(total*100) /400; 

   let grade;

   if(per>= 79 && per<= 100){ 
       grade = "A - Pass";
   }
   else if(per >= 60 && per <79){
        grade = "B - Pass";
   }
   else if(per >= 50 && per < 60){
        grade = "C - Pass";
   }
   else if(per >= 40 && per <50){
        grade = "D - Fail";
   }
   else if( per < 40){
       grade = "E - Fail";
   }

   document.getElementById('text').innerHTML=`Your marks ${total} Out of 400 <br>
   Your Percentage is: ${per}% <br> Your Grade Is ${grade}`;
   
});

