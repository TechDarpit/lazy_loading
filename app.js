const container = document.getElementById("container");
const spinner = document.getElementById("spinner");
// console.log(spinner);

let limit = 5;
let pageCount = 1;
let postCount = 1;
const maxPost = 30; // Set number which is multiple of limit

const getPost = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=3$_page=1`
  );
  //   console.log(response);
  const data = await response.json();
  // console.log(data);
  data.map((curEle, index) => {
    const htmlPost = `
    <div class="card bg-custom">
          <h5 class="card-header bg-custom-title">${postCount++}</h5>
          <div class="card-body">
            <h5 class="card-title">${curEle.title}</h5>
            <p class="card-text">
              ${curEle.body}
            </p>
          </div>
        </div>
    `;
    // console.log(htmlPost);
    container.insertAdjacentHTML("beforeend", htmlPost);
  });
  spinner.classList.add("invisible");
};

getPost();

const showData = () => {
  setTimeout(() => {
    pageCount++;
    console.log("called showdatas");
    getPost();
  }, 1000);
};

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && postCount <= maxPost) {
    console.log("end");
    spinner.classList.remove("invisible");
    showData();
  }
});
