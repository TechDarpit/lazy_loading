const container = document.getElementById("container");
const spinner = document.getElementById("spinner");
// console.log(spinner);

let limit = 5;
let pageCount = 1;
let postCount = 1;
const maxPost = 30; // Set number which is multiple of limit

const getPost = async () => {
  console.log(postCount);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postCount}`
  );
  //   console.log(response);
  const data = await response.json();
  console.log(data);
  // data.map((curEle, index) => {
  const htmlPost = `
    <div class="card bg-custom">
          <h5 class="card-header bg-custom-title">${postCount}</h5>
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">
              ${data.body}
            </p>
          </div>
        </div>
    `;
  // console.log(htmlPost);
  container.insertAdjacentHTML("beforeend", htmlPost);
  // });
  spinner.classList.add("invisible");
};

for (let i = 0; i < limit; i++) {
  getPost();
  postCount++;
}

const showData = () => {
  console.log("called showdatas :" + postCount);
  for (let i = 0; i < limit; i++) {
    setTimeout(() => {
      getPost();
      postCount++;
    }, 1000);
  }
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (
    Math.floor(scrollTop + clientHeight) + 1 >= scrollHeight &&
    postCount <= maxPost
  ) {
    console.log(scrollTop + clientHeight, scrollHeight);
    spinner.classList.remove("invisible");
    showData();
  }
});
