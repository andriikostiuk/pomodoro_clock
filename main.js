$(document).ready(function(){
    var session_Sec;
    var session_Min;
    var session_Hou;
    var break_Sec;
    var break_Min;
    var break_Hou;
    var session_Sec_Initial;
    var session_Min_Initial;
    var session_Hou_Initial;
    var break_Sec_Initial;
    var break_Min_Initial;
    var break_Hou_Initial; 
    var session_Time;
    var sessionTimeCompare;
    var session_Countdown;
    var break_Time;
    var breakTimeCompare;
    var break_Countdown;
    var flag;
    var flagState;
    var char;
    var sessionLength;
    var breakLength;
    var sessionAngle;
    var breakAngle;
    var sessionAngleInitial;
    var breakAngleInitial;
    
    $('#timer').hide();
    
    if ($('#backgroundTimer').width()<640){
      $('#session_Name').append('<br>');
      $('#break_Name').append('<br>');
    }
    
    function getStringNumber(i) {
      return i < 10 ? ('0' + i) : i;
    }
    
    function timerInitial(){
      for(var i=0; i<100; i++){
        $('#sel_Session_H').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
        $('#sel_Break_H').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
      }    
      for(var i=0; i<60; i++){
        $('#sel_Session_M').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
        $('#sel_Session_S').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
        $('#sel_Break_M').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
        $('#sel_Break_S').append('<option value='+i+'>'+getStringNumber(i)+'</option>');
      }      
    }
    
    function countdownTimer(j){
      var hours=Math.floor(j/(1000*60*60));
      var minutes=Math.floor((j%(1000*60*60))/(1000*60));
      var seconds=Math.floor((j%(1000*60))/(1000));
      char=String.fromCharCode(8758);
      $('#timer_H').val(getStringNumber(hours));
      $('#colon_1').val(char);
      $('#timer_M').val(getStringNumber(minutes));
      $('#colon_2').val(char);
      $('#timer_S').val(getStringNumber(seconds));
    }
      
    function animation (ang) {
      var cx=$('#backgroundTimer').width()/2;
      var cy=$('#backgroundTimer').height()/2;
      var endPoint;
      var shape;
      var angMax=Math.atan(cx/cy)*180/Math.PI;
      if(ang<=angMax){
        endPoint=cy*Math.tan(ang*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+endPoint+' 0 Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if(ang>angMax && ang<=90){
        endPoint=cy-(cx*Math.tan((90-ang)*Math.PI/180));
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+endPoint+' Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if(ang>90 && ang<=(90+angMax)){
        endPoint=cx*Math.tan((ang-90)*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+cy+' l0 '+endPoint+' Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if(ang>(90+angMax) && ang<=180){
        endPoint=cx-(cy*Math.tan((180-ang)*Math.PI/180));
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+2*cy+' l-'+endPoint+' 0 Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if (ang>180 && ang<=(180+angMax)){
        endPoint=cx+cy*Math.tan((ang-180)*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+2*cy+' l-'+endPoint+' 0 Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if (ang>(180+angMax) && ang<=270){
        endPoint=cy-cx*Math.tan((270-ang)*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+2*cy+' l-'+2*cx+' 0'+'l0 -'+endPoint+' 0 Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if (ang>270 && ang<=(360-angMax)){
        endPoint=cy+cx*Math.tan((ang-270)*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+2*cy+' l-'+2*cx+' 0'+'l0 -'+endPoint+' Z';
        $('#timerSector').attr({
          d: shape
        });
      } else if (ang>(360-angMax)){
        endPoint=cx-cy*Math.tan((360-ang)*Math.PI/180);
        shape='M'+cx+' '+cy+' L'+cx+' 0 '+'l'+cx+' 0'+'l0 '+2*cy+' l-'+2*cx+' 0'+'l0 -'+2*cy+'l'+endPoint+' 0'+' Z';
        $('#timerSector').attr({
          d: shape
        });
      }
      if (flag=='currentSession'){
        $('#timerSector').attr({
          fill: 'rgb(179, 255, 179)'
        });
      } else if (flag=='currentBreak'){
        $('#timerSector').attr({
          fill: 'rgb(255, 179, 179)'
        });
      }
    }
    
    timerInitial();
    
    function session_Timer(){
      if (flag===undefined){
        flag='currentSession';
        session_Time=session_Sec*1000+session_Min*60*1000+session_Hou*60*60*1000-1000;
        sessionTimeCompare=1;
        countdownTimer(session_Time);
        animation(sessionAngle);
        sessionAngle=sessionAngle+sessionAngleInitial;
        session_Time=session_Sec*1000+session_Min*60*1000+session_Hou*60*60*1000-2000;
        session_Countdown=setInterval(function(){
          sessionTimeCompare=0;
          countdownTimer(session_Time);
          animation(sessionAngle);
          session_Time=session_Time-1000;
          sessionAngle=sessionAngle+sessionAngleInitial;
          if(session_Time<0){
            clearInterval(session_Countdown);
            sessionAngle=360/sessionLength;
            break_Timer();
          }
        }, 1000);
      } else if (flag=='currentBreak' || flag=='nextSession'){
          flag='currentSession';
          session_Time=session_Sec*1000+session_Min*60*1000+session_Hou*60*60*1000-1000;
          sessionTimeCompare=1;
          session_Countdown=setInterval(function(){
            sessionTimeCompare=0;
            countdownTimer(session_Time);
            animation(sessionAngle);
            session_Time=session_Time-1000;
            sessionAngle=sessionAngle+sessionAngleInitial;
            if(session_Time<0){
              clearInterval(session_Countdown);
              sessionAngle=360/sessionLength;
              break_Timer();
            }
          }, 1000);       
        }
    }  
    
    function break_Timer(){
      flag='currentBreak';    
      break_Time=break_Sec*1000+break_Min*60*1000+break_Hou*60*60*1000-1000;
      breakTimeCompare=1;
      break_Countdown=setInterval(function(){
        breakTimeCompare=0;
        countdownTimer(break_Time);
        animation(breakAngle);
        break_Time=break_Time-1000;
        breakAngle=breakAngle+breakAngleInitial;
        if(break_Time<0){
          clearInterval(break_Countdown);
          breakAngle=360/breakLength;
          session_Timer();
        }
      }, 1000);
    } 
    
    function session_Timer_Go_On(){
      session_Sec=parseInt($('#timer_S').val());
      session_Min=parseInt($('#timer_M').val());
      session_Hou=parseInt($('#timer_H').val());
      session_Time=session_Sec*1000+session_Min*60*1000+session_Hou*60*60*1000-1000;
      session_Countdown=setInterval(function(){
        countdownTimer(session_Time);
        animation(sessionAngle);
        session_Time=session_Time-1000;
        sessionAngle=sessionAngle+sessionAngleInitial;
        if(session_Time<0){
          clearInterval(session_Countdown);
          session_Sec=session_Sec_Initial;
          session_Min=session_Min_Initial;
          session_Hou=session_Hou_Initial;
          sessionAngle=360/sessionLength;
          break_Timer();
        }
      }, 1000);
    }  
    
    function break_Timer_Go_On(){
      break_Sec=parseInt($('#timer_S').val());
      break_Min=parseInt($('#timer_M').val());
      break_Hou=parseInt($('#timer_H').val());
      break_Time=parseInt(break_Sec)*1000+parseInt(break_Min)*60*1000+parseInt(break_Hou)*60*60*1000-1000;
      break_Countdown=setInterval(function(){
        countdownTimer(break_Time);
        animation(breakAngle);
        break_Time=break_Time-1000;
        breakAngle=breakAngle+breakAngleInitial;
        if(break_Time<0){
          clearInterval(break_Countdown);
          break_Sec=break_Sec_Initial;
          break_Min=break_Min_Initial;
          break_Hou=break_Hou_Initial;
          breakAngle=360/breakLength;
          session_Timer();
        }
      }, 1000);
    }
    
    function startButton(){
      session_Sec=parseInt($('#sel_Session_S option:selected').text());
      session_Min=parseInt($('#sel_Session_M option:selected').text());
      session_Hou=parseInt($('#sel_Session_H option:selected').text());
      break_Sec=parseInt($('#sel_Break_S option:selected').text());
      break_Min=parseInt($('#sel_Break_M option:selected').text());
      break_Hou=parseInt($('#sel_Break_H option:selected').text());
      sessionLength=session_Sec+session_Min*60+session_Hou*60*60;
      breakLength=break_Sec+break_Min*60+break_Hou*60*60;
      sessionAngleInitial=360/sessionLength;
      breakAngleInitial=360/breakLength;
      sessionAngle=360/sessionLength;
      breakAngle=360/breakLength;
      if(sessionLength===0 || breakLength===0){
        alert('Please set session and break time.');
      } else{
        flagState='start';
        session_Sec_Initial=parseInt($('#sel_Session_S option:selected').text());
        session_Min_Initial=parseInt($('#sel_Session_M option:selected').text());
        session_Hou_Initial=parseInt($('#sel_Session_H option:selected').text());
        break_Sec_Initial=parseInt($('#sel_Break_S option:selected').text());
        break_Min_Initial=parseInt($('#sel_Break_M option:selected').text());
        break_Hou_Initial=parseInt($('#sel_Break_H option:selected').text());
        $('#sessionLength').hide();
        $('#breakLength').hide();
        $('#timer').show();
        $('#set_Pomodoro').text('Pause');
        $('#set_Pomodoro').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(204, 163, 0)',
          'color': 'rgb(255, 255, 255)'
        });
        $('#clear').attr('disabled', false);
        $('#clear').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(128, 128, 128)',
          'color': 'rgb(255, 255, 255)'
        });
        $('input').css({
          'color': '#000000'
        });
        session_Timer();
      }
    }
    
    function pauseButton(){
      flagState='pause';
      clearInterval(session_Countdown);
      clearInterval(break_Countdown);
      $('#set_Pomodoro').text('Go');
      $('#set_Pomodoro').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(0, 128, 0)',
          'color': 'rgb(255, 255, 255)'
        });
      if (session_Time<0 && flag=='currentBreak' && sessionTimeCompare===0 && breakTimeCompare==1){
        flag='nextBreak';
      }
      if (break_Time<0 && flag=='currentSession' && breakTimeCompare===0 && sessionTimeCompare==1){
        flag='nextSession';
      }
    }
    
    function goButton(){
      flagState='go';
      switch(flag){
        case 'currentSession':
          session_Timer_Go_On();
          break;
        case 'currentBreak':
          break_Timer_Go_On();
          break;
        case 'nextSession':
          session_Timer();
          break;
        case 'nextBreak':
          break_Timer();
          break;        
                 }
      $('#set_Pomodoro').text('Pause');
      $('#set_Pomodoro').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(204, 163, 0)',
          'color': 'rgb(255, 255, 255)'
        });
    }  
    
    $('#set_Pomodoro').click(function(){
      switch(flagState){
        case undefined:
          startButton();
          break;
        case 'start':
          pauseButton();
          break;
        case 'pause':
          goButton();
          break;
        case 'go':
          pauseButton();
          break;
                      }
      });
    
    $('#clear').click(function(){
      clearInterval(session_Countdown);
      clearInterval(break_Countdown);
      flagState=undefined;
      timerInitial();
      session_Sec=undefined;
      session_Min=undefined
      session_Hou=undefined;
      break_Sec=undefined;
      break_Min=undefined;
      break_Hou=undefined;
      session_Time=undefined;
      session_Countdown=undefined;
      break_Time=undefined;
      break_Countdown=undefined;
      flag=undefined;
      sessionAngle=360/sessionLength;
      breakAngle=360/breakLength;
      $('#sessionLength').show();
      $('#breakLength').show();
      $('#timer').hide();
      $('#timer_H').val('');
      $('#colon_1').val('');
      $('#timer_M').val('');
      $('#colon_2').val('');
      $('#timer_S').val('');
      $('#timerSector').attr({
          fill: 'none'
        });
      $('#set_Pomodoro').text('Start');
      $('#set_Pomodoro').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(0, 128, 0)',
          'color': 'rgb(255, 255, 255)'
        });
      $('#clear').attr('disabled', true);
      $('#clear').css({
          'border': '3px solid rgb(255, 255, 255)',
          'background-color': 'rgb(204, 204, 204)',
          'color': 'rgb(255, 255, 255)'
        });
    });
      
  });