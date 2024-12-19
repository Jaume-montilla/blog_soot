let articlesDiv = document.getElementById("articles");
let comments = document.getElementById("comments");
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
		console.log(usuario);
		if (usuario["userIde"]) {
			nonLogNav[0].style.display = "none";
			logNav[0].style.display = "none";
		} else {
			nonLogNav[0].style.display = "none";
			logAdmin[0].style.display = "none";
		}
	}
} else {
	window.location.href = "http://localhost:5173/";
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
			console.log("Respuesta recibida:", response.status);
			return response.text();
		})
		.then((data) => {
			console.log("Datos recibidos:", data);
			try {
				const jsonData = JSON.parse(data);
				console.log("Datos JSON:", jsonData);
				navBar(jsonData);
				return jsonData;
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => { });
}

getNames(userId);

function getNames(userId) {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({ what: "USER", id: 0, cookie: userId }),
	})
		.then((response) => {
			if (!response.ok) {
			}
			return response.json();
		})
		.then((data) => {
			console.log("Datos recibidos:", data);
			document.getElementById("userName").innerText = data.name;
			return data;
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
			reject(error);
		});
}

function getArticle() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({ what: "ARTICLES", user: true, cookie: userId }),
	})
		.then((response) => {
			console.log("Respuesta recibida:", response.status);
			return response.json();
		})
		.then((data) => {
			console.log("Datos recibidos:", data);
			processArticle(data);
			showArticles();
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

getArticle();

let articles = [];
function processArticle(json) {
	json["articulos"].forEach((element) => {
		let articleTest = new Article(
			element["Title"],
			element["InfoTxt"],
			element["IMG"],
			element["ID"],
			element["Rating"],
			element["Date"],
			element["createdBy"],
		);
		articles.push(articleTest);
	});
}
function Article(titulo, resumen, path, id, rating, date, createdby) {
	this.title = titulo;
	this.summary = resumen;
	this.path = path;
	this.id = id;
	this.rating = rating;
	this.date = date;
	this.creador = createdby;
}
function getInfoServer() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({ what: "COMMENTS", user: true, cookie: userId }),
	})
		.then((response) => {
			console.log("Respuesta recibida:", response.status);
			return response.json();
		})
		.then((data) => {
			console.log("Datos recibidos:", data);
			safeJSON(data);
			showComments();
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

getInfoServer();

let comentarios = [];

function Comentario(usuario, comment, respuesta, id, date) {
	this.usuario = usuario;
	this.comment = comment;
	this.respuesta = respuesta;
	this.id = id;
	this.date = date;
}

function safeJSON(json) {
	if (json["comentarios"]) {
		json["comentarios"].forEach((element) => {
			let esRespuesta = element["IDRelated"] ? true : false;
			let commentTest = new Comentario(
				element["UserID"],
				element["InfoTxt"],
				esRespuesta,
				element["ID"],
				element["Date"],
			);
			comentarios.push(commentTest);
		});
	}
}
console.log("comentarios: ", comentarios);
console.log("articulos: ", articles);

function showArticles() {
	articles.forEach((article) => {
		let articleDiv = document.createElement("div");
		articleDiv.classList = "article";
		let h3 = document.createElement("h3");
		let link = document.createElement("a");
		link.innerText = article.title;
		h3.appendChild(link);
		articleDiv.appendChild(link);
		let divInfo = document.createElement("div");
		divInfo.classList = "article-info";
		let span1 = document.createElement("span");
		span1.innerText = "publicado por: " + article.creador;
		divInfo.appendChild(span1);
		let span2 = document.createElement("span");
		span2.innerText = "Fecha: " + article.date;
		divInfo.appendChild(span2);
		articleDiv.appendChild(divInfo);
		articleDiv.addEventListener("click", () => {
			saveCookie(article.id);
			window.location.href = "http://localhost:5173/views/articulos/index.html";
		});
		articlesDiv.appendChild(articleDiv);
	});
}

function saveCookie(id) {
	let expire = new Date();
	expire.setMinutes(expire.getMinutes() + 20);
	document.cookie =
		"articleId=" +
		id +
		"; expires=" +
		expire.toUTCString() +
		"; path=/views/articulos/index.html";
}

function showComments() {
	comentarios.forEach((comment) => {
		let commentDiv = document.createElement("div");
		commentDiv.classList = "comment";
		let commentInfo = document.createElement("span");
		commentInfo.innerText = comment.comment;
		commentDiv.appendChild(commentInfo);

		let divInfo = document.createElement("div");
		divInfo.classList = "class-info";
		let created = document.createElement("p");
		created.innerText = "Publicado el: " + comment.date;
		divInfo.appendChild(created);
		commentDiv.appendChild(divInfo);
		commentDiv.addEventListener("click", () => {
			saveCookie(comment);
			window.location.href = "http://localhost:5173/views/articulos/index.html";
		});
		comments.appendChild(commentDiv);
	});
}
function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.querySelectorAll(".logOut").forEach(function (logOutButton) {
	logOutButton.addEventListener("click", function () {
		deleteCookie("userId");

		window.location.href = "http://localhost:5173/";
	});
});
