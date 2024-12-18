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
let commentName = "";

const nonLogNav = document.getElementsByClassName("nav-elements nolog");
const logNav = document.getElementsByClassName("nav-elements log");
const logAdmin = document.getElementsByClassName("nav-elements admin");
let access = false;
if (userId) {
	getInfoUsrs();
	function navBar(usuario) {
		if (usuario["userIde"]) {
			nonLogNav[0].style.display = "none";
			logNav[0].style.display = "none";
			access = true;
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
			}
		})
		.catch((error) => { });
}

let idArticle = getCookie("articleId");

function getArticle() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({
			what: "ARTICLES",
			id: idArticle,
			user: false,
			art: false,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			processArticle(data);
		})
		.catch((error) => {
		});
}

getArticle();

function processArticle(json) {
	let title = document.getElementById("title");
	let imagen = document.getElementById("imagen");
	let bodyArt = document.getElementById("bodyArt");

	let art = json["articulos"][0]
	console.log(art["createdBy"])
	document.getElementById("data").innerText = art["DateCreated"];
	

	title.textContent = art["Title"];
	imagen.src = "../../img/" + art["IMG"];
	bodyArt.textContent = art["InfoTxt"];
	let twitter = document.getElementById("twitter");
	twitter.setAttribute(
		"data-text",
		"¡Qué interesante el artículo: " + art["Title"] + "!",
	);
}

function getInfoServer() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({ what: "COMMENTS", id: idArticle, user: false }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			safeJSON(data);
		})
		.catch((error) => {
		});
}

getInfoServer();

let comentarios = [];

function Comentario(usuario, comment, respuesta, id, idRespuesta) {
	this.usuario = usuario;
	this.comment = comment;
	this.respuesta = respuesta;
	this.id = id;
	this.idRespuesta = idRespuesta;
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
				element["IDRelated"],
			);
			createComents(commentTest);
			comentarios.push(commentTest);
		});
	}
}

let enviar = document.getElementById("btnSend");
enviar.addEventListener("click", () => {
	let txtValue = document.getElementById("textInput").value;
	if (txtValue == "") {
	} else {
		let json = JSON.stringify({
			what: "COMMENTS",
			do: "CREATE",
			txt: txtValue,
			cookie: userId,
			id: idArticle,
		});

		sendForm(json);
	}
});

function sendForm(json) {
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: json,
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			document.getElementById("textInput").value = "";
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

async function createComents(comentarioPrint) {
	let json = JSON.stringify({ what: "USER", id: comentarioPrint.usuario, cookie: 0 })
	const commentName = await getNames(json);
	let templateBase = `
        <p class='usr'>${commentName}</p>
        <p class="commentContent" id='commentContent'>${comentarioPrint.comment}</p>
        <a onclick="reply(${comentarioPrint.id})"><img src="/../../img/reply-all.png" alt="reply" class="commentIcon first"></a>`;

	if (comentarioPrint.respuesta) {
		let idRespuesta = document.getElementById(comentarioPrint.idRespuesta);
		let div = document.createElement("div");
		div.innerHTML =
			`<div class="comment replied" id="${comentarioPrint.id}">` + templateBase;
		idRespuesta.insertAdjacentElement("afterend", div);
		return;
	} else if (!comentarioPrint.respuesta) {
		templateBase =
			`<div class="comment" id="${comentarioPrint.id}">` + templateBase;
	}

	let commentHTML = document.getElementById("comments");
	commentHTML.innerHTML += templateBase;
}

function getNames(json) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:8080", {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: json ,
		})
			.then((response) => {
				if (!response.ok) {
					return reject(`Error al obtener datos: ${response.statusText}`);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data)
				resolve(data.name);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

let addFav = document.getElementById("addFav");
addFav.addEventListener("click", () => {
	let metodo = "PUT";
	let json = JSON.stringify({
		what: "ADDFAV",
		cookie: userId,
		artId: idArticle,
	});
	if (addFav.classList[1]) {
		metodo = "DELETE";
		json = JSON.stringify({ what: "REMOVEFAV", cookie: userId, id: idArticle });
		document.getElementById("addFav").classList.add("fav");
	}

	fetch("http://localhost:8080/", {
		method: metodo,
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": metodo,
		},
		body: json,
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				const jsonData = JSON.parse(data);
				return jsonData;
			} catch (error) { }
		})
		.catch((error) => { });
});

getFav();
let test = JSON.stringify({
	what: "ARTICLES",
	art: true,
	user: false,
	cookie: userId,
	articleID: idArticle,
});
function getFav() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify({
			what: "ARTICLES",
			art: true,
			user: false,
			cookie: userId,
			articleID: idArticle,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.exists) {
				document.getElementById("addFav").classList.add("fav");
			}
		})
		.catch((error) => { });
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

function deleteInfo(id) {
	fetch("http://localhost:8080", {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "DELETE",
		},
		body: JSON.stringify({ what: "COMMENTS", id: id, cookie: userId }),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				JSON.parse(data);
			} catch (error) { }
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

let rating = document.getElementsByName("rating");
for (let i = 0; i < rating.length; i++) {
	rating[i].addEventListener("click", () => {
		ratingUpdate(rating[i].value);
	});
}

function ratingUpdate(ratingUser) {
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: JSON.stringify({
			what: "RATING",
			cookie: userId,
			id: idArticle,
			rating: ratingUser,
		}),
	})
		.then((response) => {
			return response.text();
		})
}

function reply(commentId) {
	let txtValue = document.getElementById("textInput").value;
	let json = JSON.stringify({
		what: "COMMENTS",
		do: "CREATE",
		txt: txtValue,
		cookie: userId,
		id: idArticle,
		related: commentId,
	});

	sendForm(json);
}
