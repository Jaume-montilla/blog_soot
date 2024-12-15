let left_arrow = document.getElementById("left_arrow");
let right_arrow = document.getElementById("right_arrow");
let articles_info = document.getElementById("articles_info");

function getCookie(name) {
	let cookieArr = document.cookie.split(";");
	for (let i = 0; i < cookieArr.length; i++) {
		let cookie = cookieArr[i].trim();
		if (cookie.startsWith(name + "=")) {
			return cookie.split("=")[1];
		}
	}
	return null;
}

let userId = getCookie("userId");

const nonLogNav = document.getElementsByClassName("nav-elements nolog");
const logNav = document.getElementsByClassName("nav-elements log");
const logAdmin = document.getElementsByClassName("nav-elements admin");

if (userId) {
	getInfoUsrs();
	function navBar(usuario) {
		if (usuario["userIde"]) {
			nonLogNav[0].style.display = "none";
			logNav[0].style.display = "none";
		} else {
			nonLogNav[0].style.display = "none";
			logAdmin[0].style.display = "none";
		}
	}
} else {
	logNav[0].style.display = "none";
	logAdmin[0].style.display = "none";
}

function getInfoUsrs() {
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: JSON.stringify({ what: "CHECKADMIN", cookie: userId }),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				const jsonData = JSON.parse(data);
				navBar(jsonData);
				return jsonData;
			} catch (error) {
				console.error();
			}
		})
		.catch((error) => { });
}

let articles = [];

// es 2 ya que es el ultimo valor que seve de las tarjetas del blog
let currentArticle = 0;

function preloadArticles() {
	for (let i = 0; i < 3; i++) {
		createArticles(articles[i]);
	}
}

function safeJSON(json) {
	console.log(json["articulos"]);
	json["articulos"].forEach((element) => {
		let articleTest = new Article(
			element["Title"],
			element["InfoTxt"],
			element["IMG"],
			element["ID"],
			element["Rating"],
		);
		articles.push(articleTest);
	});
	preloadArticles();
}

function getInfoServer() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "POST",
		},
		body: JSON.stringify({ what: "ARTICLES", user: false, id: 0, art: false }),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				const jsonData = JSON.parse(data);
				safeJSON(jsonData);
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => { });
}

getInfoServer();

//constructor de articulos
function Article(titulo, resumen, path, id, rating) {
	this.title = titulo;
	this.summary = resumen;
	this.path = path;
	this.id = id;
	this.rating = rating;
}

left_arrow.addEventListener("click", () => {
	console.log("left arrow");

	//cargar las tres posiciones anteriores del array de articulos
	if (currentArticle > 2) showArticles(-1);
});
right_arrow.addEventListener("click", () => {
	//mostrar los siguientes tres articulos del array y si quedan menos de 6 por ver, pedir otros 9 de manera async y almacenarlos en el array
	console.log("right arrow");
	if (currentArticle <= articles.length) showArticles(1);
});

function showArticles(which) {
	articles_info.innerHTML = "";

	switch (which) {
		case -1:
			if (currentArticle > 2) {
				currentArticle -= 3;
			}
			break;

		case 1:
			if (currentArticle + 3 < articles.length) {
				currentArticle += 3;
			}
			break;

		default:
			console.error("Parametro no valido");
			return;
	}

	for (
		let i = currentArticle;
		i < currentArticle + 3 && i < articles.length;
		i++
	) {
		createArticles(articles[i]);
	}
}

function createArticles(article) {
	let table = document.createElement("td");
	let articleDom = document.createElement("a");
	articleDom.href = "/views/articulos/index.html";
	articleDom.addEventListener("click", () => {
		saveCookie(article);
	});
	articleDom.classList.add("card_click");
	let divArticle = document.createElement("div");
	divArticle.classList.add("card");
	let pArticle = document.createElement("p");
	pArticle.innerText = article.title;
	divArticle.appendChild(pArticle);
	let imgArt = document.createElement("img");
	imgArt.src = "img/" + article.path;
	divArticle.appendChild(imgArt);

	let rating = document.createElement("p");
	rating.innerText = article.rating + " / 5";
	divArticle.appendChild(rating);
	articleDom.appendChild(divArticle);
	table.appendChild(articleDom);
	articles_info.appendChild(table);
}

function saveCookie(article) {
	let expire = new Date();
	expire.setMinutes(expire.getMinutes() + 20);
	document.cookie =
		"articleId=" +
		article.id +
		"; expires=" +
		expire.toUTCString() +
		"; path=/views/articulos/index.html";
}

function search() {
	let searchValue = document.getElementById("search").value;
	articles_info.innerHTML = "";
	if (searchValue == "") {
		createArticles(articles[0]);
		createArticles(articles[1]);
		createArticles(articles[2]);
	}
	articles.forEach((i) => {
		if (
			i.title.toLowerCase().includes(searchValue.toLowerCase()) ||
			i.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
			i.path.toLowerCase().includes(searchValue.toLowerCase)
		) {
			createArticles(i);
		}
	});
}

function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.querySelectorAll(".logOut").forEach(function (logOutButton) {
	logOutButton.addEventListener("click", function () {
		deleteCookie("userId");

		window.location.href = "../index.html"; // Asegúrate de que la ruta sea correcta
	});
});

//// funcion crear infinite scroll

//const handleInfiniteScroll = () => {
//	console.log("test");
//	const endOfPage =
//		window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
//
//	if (endOfPage) {
//		console.log("hola");
//	}
//};
//window.addEventListener("scroll", handleInfiniteScroll);
//const handleScroll = () => {
//	const endOfPage =
//		window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

//	if (endOfPage) {
//		console.log("end");
//	} else {
//		console.log("not end");
//	}
//};

//var throttleWait;

//const throttle = (callback, time) => {
//	if (throttleWait) return;
//	throttleWait = true;

//	setTimeout(() => {
//		callback();
//		throttleWait = false;
//	}, time);
//};
//
//window.addEventListener("scroll", () => {
//	throttle(handleScroll, 250);
//});
function getReviews() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "POST",
		},
		body: JSON.stringify({ what: "REVIEWS", limit: 3 }),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				const jsonData = JSON.parse(data);
				createReviews(jsonData.reviews);
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => { });
}
getReviews();
function createReviews(reviews) {
	const reviewsContainer = document.getElementById("reviews");
	const table = reviewsContainer.querySelector("table");
	reviews.forEach((review, index) => {
		const td = document.createElement("td");
		td.classList.add("reviewCell");

		const reviewDiv = document.createElement("div");
		reviewDiv.classList.add("review");

		const ratingImg = document.createElement("img");
		ratingImg.src = "img/rating.png";
		ratingImg.alt = "rating";
		ratingImg.classList.add("rating");
		reviewDiv.appendChild(ratingImg);

		const reviewTitle = document.createElement("h3");
		reviewTitle.innerText = review.Title;
		reviewDiv.appendChild(reviewTitle);

		const bodyReview = document.createElement("p");
		bodyReview.id = "bodyReview";
		bodyReview.innerText = review.InfoText;
		reviewDiv.appendChild(bodyReview);

		const reviewerName = document.createElement("p");
		reviewerName.classList.add("name");
		reviewerName.innerText = "Reviewer: " + review.UsrID;
		reviewDiv.appendChild(reviewerName);

		const reviewDate = document.createElement("p");
		reviewDate.classList.add("date_reviewed");
		reviewDate.innerText = "Date: " + review.CreateDate;
		reviewDiv.appendChild(reviewDate);

		td.appendChild(reviewDiv);
		table.appendChild(td);
	});
}
