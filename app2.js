const container = document.getElementById("container");
const spinner = document.getElementById("spinner");

let limit = 5;
let postCount = 1;
const maxPost = 100; // Set number which is multiple of limit

const getPost = async () => {
  console.log(postCount);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postCount++}`
  );
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
  spinner.classList.add("invisible");
};

for (let i = 0; i < limit; i++) {
  getPost();
}

const showData = () => {
  console.log("called showdatas");
  for (let i = 0; i < limit; i++) {
    setTimeout(() => {
      getPost();
    }, 1000);
  }
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (
    Math.ceil(scrollTop + clientHeight) == scrollHeight &&
    postCount <= maxPost
  ) {
    console.log(scrollTop + clientHeight, scrollHeight);
    spinner.classList.remove("invisible");
    showData();
  }
});
