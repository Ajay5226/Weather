let weather = {
    apiKey: "ca56baec78f38b0ade3ccfecf7143f97",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      ).then((response) => {
          if (!response.ok) {
             // alert("Sorry, place not found in database");
              //document.getElementsByClassName("search-bar").focus;
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;

      //to show country name code
      //    const { country } = data.sys; 
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { feels_like } = data.main;   
      const { temp_min } = data.main;
      const { temp_max } = data.main;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;
      

      document.querySelector(".city").innerText = name;
    //to show country namecode
    //  document.querySelector(".country").innerText = country;
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
      document.querySelector(".feelslike").innerText ="Sensible: " + feels_like + " °C";
      document.querySelector(".tempminmax").innerText ="Min: " + temp_min + " °C" + " | Max: " + temp_max + " °C";;

      let srise=sunrise;
      let srisedate = new Date(srise*1000);
      let risehour= srisedate.getHours();      let riseminute= srisedate.getMinutes(); 
      document.querySelector(".sunrise").innerText ="Sunrise: 0" + risehour + ":"+ riseminute + " AM";
      
      let sset=sunset;
      let ssetdate = new Date(sset*1000);
      let sethour= ssetdate.getHours();      let setminute= ssetdate.getMinutes(); 
      document.querySelector(".sunset").innerText ="Sunset: " + sethour + ":"+ setminute + " PM";


      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
      
      
    },
  };
  
  document.querySelector(".search").addEventListener("click", function () {
    weather.search();
    
  });
  
  document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
        document.querySelector(".city").innerText = " ";
      }
    });

  weather.fetchWeather("surat");

  //to convert celsius/fahrenheit
  let temp = document.getElementById("temp");
  
  temp.addEventListener("click", ()=> {
      let st=document.getElementById("temp").innerHTML;
      
      if(st.endsWith("C")){
            let st=parseFloat(document.getElementById("temp").innerHTML);
            let fah = parseFloat(st * 9/5 + 32).toFixed(1);
            fah = fah.toString();
            document.getElementById("temp").innerHTML = fah +" °F";
    }else{
            let st=parseFloat(document.getElementById("temp").innerHTML);
            let cel = parseFloat((st-32) * 5/9).toFixed(1);
            cel = cel.toString();
            document.getElementById("temp").innerHTML = cel +" °C";
    }   
});