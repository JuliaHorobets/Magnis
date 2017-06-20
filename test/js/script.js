$(document).ready(function () { 
  $('#year').keydown(function (e) {//натиснення Enter
    if (e.keyCode == 13) {
      validate();
    return false;
    }
  });
});

window.onload = function () {//змінено рік або місяць
  document.getElementById("year").onchange = validate;
  document.getElementById("month").onchange = validate;
};

function validate(){
  
  var year = document.getElementById("year").value;
  if (year>=0 && year<=9999) { //перевірка чи правильно введено рік
    var monthValue = document.getElementById("month").value; 
    var yearValue =  document.getElementById("year").value;

    createCalendar("cal", yearValue, monthValue); //виклик функціі побудови календаря

    var rows = document.getElementById('cal').getElementsByTagName('table')[0].getElementsByTagName('tr');
    var cells = document.getElementById('cal').getElementsByTagName('table')[0].getElementsByTagName('td');
    
    for (i = 0; i < rows.length; i++) {//визначає яка клітинка з датою була натиснута
      for (j = 0; j < rows[i].cells.length; j++){       
        rows[i].cells[j].onclick = function() {getval(this);};
      };  
    };

    function getval(cel) {//висвітлює значення натиснутої комірки і місяця
      var monthName= ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня","Серпня","Вересня","Жовтня","Листопада","Грудня"];
      var i=monthValue;
      alert(cel.innerHTML+"  "+monthName[i]);
    };
  }
  else {
    alert("Ви ввели неправильно дату");
  };
   
};

function createCalendar(id, year, month) {
    
  var elem = document.getElementById(id);
  var d = new Date(year, month);
  var table = '<table><tr><th>Понеділок</th><th>Вівторок</th><th>Середа</th><th>Четвер</th><th>Пятниця</th><th>Субота</th><th>Неділя</th></tr><tr>';
  var p = '<p>Посилання на код <a href="https://github.com/JuliaHorobets/Magnis/tree/master/test" target="_blank">GitHub</a></p>'    
  for (var i = 0; i < getDay(d); i++) { //перший рядок заповнюєть пустими значеннями 
                                        //від Пн до дня, з якого починається місяць
    table += '<td></td>';
  };
      
  while (d.getMonth() == month) { // заповнення календаря числами
    table += '<td>' + d.getDate() + '</td>';        
    if (getDay(d) % 7 == 6) { //після неділі,створення нового рядка 
      table += '</tr><tr>';
    };        
    d.setDate(d.getDate() + 1);     
  };
     
  if (getDay(d) != 0) {//заповнення таблиці пустими комірками до кінця тижня        
    for (var i = getDay(d); i < 7; i++) {          
      table += '<td></td>';        
    };      
  };
    
  table += '</tr></table>';
  elem.innerHTML = table+p;

};
  

function getDay(date) { //отримання номера дня тижня, від 0(пн) до 6 (нд)
  var day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
};

 








   