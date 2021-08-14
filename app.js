console.log("hello")

const render = data => {
    data.forEach(item => {
      const $listItem = $("<div>").text(item.descriptor);
      const $whatPoliceDoButton = $("<button>").attr("type", "button").text("WHAT DID THE POLICE DO");
      const $resolutionDescription = $("<p>").text(item.resolution_description).addClass("hidden").addClass("show");
      $listItem.append($whatPoliceDoButton, $resolutionDescription);
      $(".container").append($($listItem));
      $whatPoliceDoButton.on("click", event => {
          console.log(event)
          $resolutionDescription.toggleClass("hidden")
          $resolutionDescription.toggleClass("show")
      })
    })
  }
  const clearContainer = () => {$(".container").empty()}
  $(() => {
      $("button").on("click", event => {
      clearContainer();
      const $borough = $(event.currentTarget).val();
      const $inputValue = $("#input-box").val();
      let $numComplaints = 10;
      if ($inputValue) $numComplaints = $inputValue;
      const $promiseCity = $.ajax({
        url: "https://data.cityofnewyork.us/resource/erm2-nwe9.json?",
        type: "GET",
        data: {
          $limit: $numComplaints,
          $$app_token: "QstcBdZReElTLIDJ7XF2Ne8gl",
          agency: "NYPD",
          borough: $borough
        }
      });
      $promiseCity.then(function(data) {
        console.log(data)
        render(data);
      });
    });
  });