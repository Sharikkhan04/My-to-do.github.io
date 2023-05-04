const inputBox = document.getElementById("inputbox");
const ul = document.getElementById("list");
const errorMessage = document.getElementById("error");
const All = document.getElementById("all");
const Pending = document.getElementById("pending");
const Complete = document.getElementById("complete");
const deleteAll = document.getElementById("delete-btn");
const Option = document.getElementById("option");

function addTask() {
  if (inputBox.value === "") {
    error.innerHTML = "Please insert a task.";
  } else {
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    ul.appendChild(li);
    const button = document.createElement("button");
    button.innerHTML = "Delete";
    button.classList.add("delete-btn");
    li.appendChild(button);
    deleteAll.classList.remove("disableDeleteAll");
    deleteAll.classList.add("enableDeleteAll");
    error.innerHTML = "";
    saveData();
  }
  inputBox.value = "";
}

document.getElementById("delete-btn").addEventListener("click", function () {
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
    deleteAll.classList.remove("enableDeleteAll");
    deleteAll.classList.add("disableDeleteAll");
    saveData();
  }
});

Option.addEventListener("click", function (e) {
  const targetChild = e.target;
  const children = Option.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child !== targetChild) {
      child.classList.remove("active");
    } else {
      child.classList.add("active");
    }
  }
});

ul.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    if (ul.innerHTML === "") {
      deleteAll.classList.add("disableDeleteAll");
      deleteAll.classList.remove("enableDeleteAll");
    }
    saveData();
  }
});

function saveData() {
  localStorage.setItem("listItems", ul.innerHTML);
}

function showTask() {
  const savedItems = localStorage.getItem("listItems");
  if (savedItems != null) {
    ul.innerHTML = savedItems;
  }
}

showTask();

All.addEventListener("click", () => {
  let child = ul.children;
  Array.from(child).forEach((val, index) => {
    val.style.display = "";
    ul.appendChild(val);
  });
});

Complete.addEventListener("click", () => {
  let child = ul.children;
  Array.from(child).forEach((val, index) => {
    // If a child class contain checked
    if (val.classList.contains("checked")) {
      // console.log(val)
      // Show or append the element
      val.style.display = "";
      ul.appendChild(val);
    } else {
      // Hide or remove the element
      val.style.display = "none";
    }
  });
});

Pending.addEventListener("click", () => {
  let child = ul.children;
  Array.from(child).forEach((val, index) => {
    // If a child class not contain checked
    if (!val.classList.contains("checked")) {
      //  console.log(val)
      // Show or append the element
      val.style.display = "";
      ul.appendChild(val);
    } else {
      // Hide or remove the element
      val.style.display = "none";
    }
  });
});
