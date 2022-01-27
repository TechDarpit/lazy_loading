const container = document.getElementById("container");
const spinner = document.getElementById("spinner");

let limit = 5;
let pageCount = 1;
let postCount = 1;
const maxPost = 100; // Set number which is multiple of limit

const getPost = async () => {
  console.log(postCount);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postCount++}`
  );
  // console.log(response);
  const data = await response.json();
  // console.log(data);
  const htmlPost = `
    <div class="card bg-custom">
          <h5 class="card-header bg-custom-title">${data.id}</h5>
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">
              ${data.body}
            </p>
          </div>
        </div>
    `;
  container.insertAdjacentHTML("beforeend", htmlPost);
};

const htmlData = () => {};

for (let i = 0; i < limit; i++) {
  getPost();
}

const showData = () => {
  console.log("called showdatas :" + postCount);
  for (let i = 0; i < limit; i++) {
    setTimeout(() => {
      getPost();
      spinner.classList.add("invisible");
    }, 1000);
  }
};

window.addEventListener("scroll", () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset;
  const clientHeight = window.innerHeight;
  if (
    Math.ceil(scrollTop + clientHeight) == scrollHeight &&
    postCount <= maxPost
  ) {
    console.log(scrollTop + clientHeight, scrollHeight);
    spinner.classList.remove("invisible");
    showData();
  }
});
