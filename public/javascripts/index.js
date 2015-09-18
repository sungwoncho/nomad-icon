$(document).ready(function () {
  var cities = ['Tokyo','Yokohama','New York Metro','Sao Paulo','Seoul','Incheon','Mexico City','Osaka','Kobe','Kyoto','Manila','Mumbai','Delhi','Jakarta','Lagos','Kolkata','Cairo','Los Angeles','Buenos Aires','Rio de Janeiro','Moscow','Shanghai','Karachi','Paris','Istanbul','Nagoya','Beijing','Chicago','London','Shenzhen','Essen','Düsseldorf','Tehran','Bogota','Lima','Bangkok','Johannesburg','East Rand','Chennai','Taipei','Baghdad','Santiago','Bangalore','Hyderabad','St Petersburg','Philadelphia','Lahore','Kinshasa','Miami','Ho Chi Minh City','Madrid','Tianjin','Kuala Lumpur','Toronto','Milan','Shenyang','Dallas','Fort Worth','Boston','Belo Horizonte','Khartoum','Riyadh','Singapore','Washington','Detroit','Barcelona','Houston','Athens','Berlin','Sydney','Atlanta','Guadalajara','San Francisco','Oakland','Montreal','Monterey','Melbourne','Ankara','Recife','Phoenix','Mesa','Durban','Porto Alegre','Dalian','Jeddah','Seattle','Cape Town','San Diego','Fortaleza','Curitiba','Rome','Naples','Minneapolis','St. Paul','Tel Aviv','Birmingham','Frankfurt','Lisbon','Manchester','San Juan','Katowice','Tashkent','Fukuoka','Baku','Sumqayit','St. Louis','Baltimore','Sapporo','Tampa','St. Petersburg','Taichung','Warsaw','Denver','Cologne','Bonn','Hamburg','Dubai','Pretoria','Vancouver','Beirut','Budapest','Cleveland','Pittsburgh','Campinas','Harare','Brasilia','Kuwait','Munich','Portland','Brussels','Vienna','San Jose','Damman','Copenhagen','Brisbane','Riverside','San Bernardino','Cincinnati','Accra'];

  $('.location').typed({
    strings: cities,
    contentType: 'text',
    typeSpeed: 50,
    startDelay: 1000,
    backSpeed: 30,
    backDelay: 1000,
    loop: true,
    shuffle: true,
    showCursor: true
  });

  setInterval(function () {
    var colors = ['#F77A52', '#4DC1D8', '#EA2E49'];

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    var nextColor = shuffleArray(colors)[0];
    $('.location-column').css('background-color', nextColor);
  }, 5000);
});
