window.onload = () => {
  print();
};

// add a new one
document.querySelector('form').onsubmit = async (event) => {
  event.preventDefault();
  const values = Object.values(event.target).reduce(
    (acc, input) =>
      !input.name
        ? acc
        : {
            ...acc,
            [input.name]: input.type == 'checkbox' ? input.checked : input.value,
          },
    {}
  );
  if (values.name.trim().length > 0 && isNaN(values.name)) {
    await axios.post('http://localhost:3000/task', values);
    print();
  }
  document.querySelector('form').reset();
};

// print to the html
async function print() {
  const res = await axios.get('http://localhost:3000/task');
  const toDoListArryServer = res.data;
  // not done print to the todo
  document.getElementById('toDo').innerHTML = toDoListArryServer
    .map((item) => {
      if (item.doing == false) {
        return ` <label class="b-contain" for="${item._id}"> <span class="btn-x" onclick="deleteTaskById('${item._id}')" ><i class="fas fa-times"></i></span>  <span class="name" >${item.name}</span>  <div class="b-input"></div> <div  onclick="changeDoing('${item._id}')"  class="btn-v"><i class="fas fa-check"></i></div>  </label> `;
      }
    })
    .join('');
  // if its already done print to do already
  document.getElementById('doAlready').innerHTML = toDoListArryServer
    .map((item) => {
      if (item.doing == true) {
        return `<label class="b-contain" for="${item._id}"> <span class="btn-x" onclick="deleteTaskById('${item._id}')" ><i class="fas fa-times"></i></span>  <span class="name" ">${item.name}</span>  <div class="b-input"></div> <div onclick="{changeDoing('${item._id}')}" class="btn-v-checked"><i class="fas fa-check"></i></div>  </label>`;
      }
    })
    .join('');
}

// on check change to doing = false/true and print again
async function changeDoing(_id) {
  await axios.put('http://localhost:3000/task', { _id });
  print();
}

// delete one item onclick by id
async function deleteTaskById(_id) {
  await axios.delete(`http://localhost:3000/task/${_id}`);
  print();
}

// make all of them as didnt do it
async function clearTheList() {
  await axios.put('http://localhost:3000/task/all');
  print();
}

// delete all of the list by click
async function deleteTheList() {
  await axios.delete('http://localhost:3000/taskall');
  print();
}
