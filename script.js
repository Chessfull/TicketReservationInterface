const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();

calculateTotal();

// ▼ Adding click attribute that calculate price and get selected class to all seat items exclude 'reserved seat' ▼
container.addEventListener("click", function (x) {
  if (
    x.target.classList.contains("seat") &&
    !x.target.classList.contains("reserved")
  ) {
    x.target.classList.toggle("selected");
    calculateTotal(); // calling calculate function for bottom text '.. seat .. price'
  }
});

// ▼ Triggering calculate function when movie selected from dropdown ▼
select.addEventListener("change", function (e) {
  calculateTotal();
});

// ▼ This is a function when triggered calculates seat count and total cost ▼
function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected"); // → Getting selected seats

  const selectedSeatsArr = []; // → array for setting localstorate index of selected seats
  const seatsArr = []; // → array for finding selected seats indexes

  // ▼ Adding each selected seats to array ▼
  selectedSeats.forEach(function (seat) { 
    selectedSeatsArr.push(seat);
  });

  // ▼ Adding all seats to array ▼
  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  // ▼ Finding indexes of selected seats for localstorate
  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  // ▼ This part for bottom inner texts count and price ▼
  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * select.value;

  // ▼ Calling function for saving indexes in localstorage ▼
  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

// ▼ Function for saving indexes in localstorage ▼
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
