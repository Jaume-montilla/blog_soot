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
let idUser = getCookie("userId");
console.log(idUser);
let articles = [];
let users = [];

const nonLogNav = document.getElementsByClassName("nav-elements nolog");
const logNav = document.getElementsByClassName("nav-elements log");
const logAdmin = document.getElementsByClassName("nav-elements admin");

if (idUser) {
	getInfoUsrs();
	function navBar(usuario) {
		console.log(usuario);
		if (usuario["userIde"]) {
			nonLogNav[0].style.display = "none";
			logNav[0].style.display = "none";
		} else {
			window.location.href = "http://localhost:5173/";
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
		body: JSON.stringify({ what: "CHECKADMIN", cookie: idUser }),
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

function saveJSON(json) {
	json["articulos"].forEach((element) => {
		let articleTest = new Article(
			element["Title"],
			element["InfoTxt"],
			element["Rating"],
			element["createdBy"],
			element["ID"],
		);
		articles.push(articleTest);
	});
	json["usrs"].forEach((element) => {
		let ususario = new Users(
			element["ID"],
			element["Name"],
			element["Surname"],
			element["eMail"],
			element["ROL"],
			element["path"],
		);
		users.push(ususario);
	});
	showArticles();
	showUsers();
}
function Users(id, name, surname, eMail, rol) {
	this.Id = id;
	this.Name = name;
	this.Surname = surname;
	this.Mail = eMail;
	this.Rol = rol;
}
function getInfoServer() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "POST",
		},
		body: JSON.stringify({ what: "ADMIN", cookie: idUser }),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			saveJSON(JSON.parse(data));
			try {
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}
getInfoServer();

function Article(titulo, resumen, rating, created, id, img) {
	this.Title = titulo;
	this.InfoTxt = resumen;
	this.rating = rating;
	this.created = created;
	this.ID = id;
	this.img = img;
}
function showArticles() {
	let tableArticles = document.getElementById("articulosTable");
	articles.forEach((article) => {
		let row = document.createElement("tr");
		let titleCell = document.createElement("td");
		let summaryCell = document.createElement("td");
		let ratingCell = document.createElement("td");
		let createdCell = document.createElement("td");
		let actionCell = document.createElement("td");

		titleCell.innerText = article.Title;
		summaryCell.innerText = article.InfoTxt;
		ratingCell.innerText = article.rating;
		createdCell.innerText = article.created;

		let deleteButton = document.createElement("button");
		deleteButton.id = article.ID;
		deleteButton.onclick = () => deleteInfo("ARTICLES", article.ID);
		deleteButton.classList.add("delete");
		deleteButton.innerHTML =
			"<img src='../../img/papelera-de-reciclaje.png' alt='delete' width='25vw' height='25vw'>";
		actionCell.appendChild(deleteButton);
		row.appendChild(titleCell);
		row.appendChild(summaryCell);
		row.appendChild(ratingCell);
		row.appendChild(createdCell);
		row.appendChild(actionCell);

		titleCell.addEventListener("click", function () {
			editCell(titleCell, "Title", article);
		});
		summaryCell.addEventListener("click", function () {
			editCell(summaryCell, "InfoTxt", article);
		});

		tableArticles.appendChild(row);
	});
}

function showUsers() {
	let tableUsrs = document.getElementById("usuariosTable");
	users.forEach((user) => {
		let rowUser = document.createElement("tr");

		let name = document.createElement("td");
		let surname = document.createElement("td");
		let email = document.createElement("td");
		let rol = document.createElement("td");
		let action = document.createElement("td");

		name.innerText = user.Name;
		surname.innerText = user.Surname;
		email.innerText = user.Mail;
		rol.innerText = user.Rol;
		let deleteButton = document.createElement("button");
		deleteButton.id = user.Id;
		deleteButton.onclick = () => deleteInfo("USERS", user.Id);
		deleteButton.classList.add("delete");
		deleteButton.innerHTML =
			"<img src='../../img/papelera-de-reciclaje.png' alt='delete' width='25vw' height='25vw'>";
		action.appendChild(deleteButton);

		rol.addEventListener("click", function () {
			chgRol(rol, user);
		});

		rowUser.appendChild(name);
		rowUser.appendChild(surname);
		rowUser.appendChild(email);
		rowUser.appendChild(rol);
		rowUser.appendChild(action);

		tableUsrs.appendChild(rowUser);
	});
}
function chgRol(rolUser, user) {
	let currentRole = rolUser.innerText;
	let select = document.createElement("select");

	let optionUser = document.createElement("option");
	optionUser.value = "USER";
	optionUser.innerText = "USER";

	let optionAdmin = document.createElement("option");
	optionAdmin.value = "ADMIN";
	optionAdmin.innerText = "ADMIN";

	select.appendChild(optionUser);
	select.appendChild(optionAdmin);
	select.value = currentRole;
	rolUser.innerHTML = "";
	rolUser.appendChild(select);

	select.addEventListener("change", function () {
		user.Rol = select.value;
		rolUser.innerHTML = select.value;
		editInfo("USRS", user.Id, user.Rol, "ROL");
	});
}

function editCell(info, campo, article) {
	let input = document.createElement("input");
	input.type = "text";
	input.value = info.innerText;
	info.innerHTML = "";
	info.appendChild(input);
	input.focus();
	let newValue = "";
	input.addEventListener("blur", function () {
		newValue = input.value;
		article[campo] = newValue;
		info.innerHTML = newValue;
		console.log(campo);
		editInfo("ARTICLES", article.ID, newValue, campo);
	});
}

function deleteInfo(what, id) {
	console.log(what + " " + id);
	fetch("http://localhost:8080", {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "DELETE",
		},
		body: JSON.stringify({ what: what, id: id, cookie: idUser }),
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
				window.location.href = "http://localhost:5173/views/admin/adminView.html";
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}
function editInfo(what, id, newInfo, field) {
	console.log(what + " " + id + " " + newInfo + " " + field);
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: JSON.stringify({
			what: what,
			do: "EDIT",
			id: id,
			newInfo: newInfo,
			field: field,
			cookie: idUser,
		}),
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
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

let crearUser = document.getElementById("createUser");
crearUser.addEventListener("click", () => {
	let tabla = document.getElementById("usersTabla");
	tabla.style.display = "none";
	let form = document.getElementById("usrsForm");
	form.style.display = "";
	let name = document.getElementById("name");
	let surname = document.getElementById("surname");
	let mail = document.getElementById("mail");
	let pwd = document.getElementById("pwd");
	let rol = document.getElementById("rol");
	let age = document.getElementById("age");
	document.getElementById("sendUsr").addEventListener("click", () => {
		let json = JSON.stringify({
			name: name.value,
			surname: surname.value,
			mail: mail.value,
			pwd: pwd.value,
			rol: "USER",
			age: age.value,
			what: "USRS",
			do: "CREATE",
			cookie: idUser,
		});
		sendInfo(json);
		name.value = "";
		surname.value = "";
		mail.value = "";
		pwd.value = "";
		rol.value = "USR";
		age.value = "";
		form.style.display = "none";
		tabla.style.display = "";
	});
});
let crearArt = document.getElementById("createArticle");
crearArt.addEventListener("click", () => {
	let tabla = document.getElementById("articulosTabla");
	tabla.style.display = "none";
	let form = document.getElementById("artForm");
	form.style.display = "";
	let title = document.getElementById("title");
	let img = document.getElementById("img");
	let infoTxt = document.getElementById("infoTxt");

	document.getElementById("send").addEventListener("click", () => {
		let json = JSON.stringify({
			title: title.value,
			info: infoTxt.value,
			img: img.value,
			cookie: idUser,
			what: "ARTICLES",
			do: "CREATE",
		});
		sendInfo(json);
		title.value = "";
		img.value = "";
		infoTxt.value = "";
		form.style.display = "none";
		tabla.style.display = "";
	});
});

function sendInfo(json) {
	console.log(json);
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: json,
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
				window.location.href = "";
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => {
			console.error("Error al cargar los datos:", error);
		});
}

function search() {
	let searchValue = document.getElementById("search").value.toLowerCase();
	let tableArticles = document.getElementById("articulosTable");
	tableArticles.innerHTML = "";

	if (searchValue === "") {
		showArticles();
	} else {
		articles.forEach((article) => {
			if (
				article.Title.toLowerCase().includes(searchValue) ||
				article.InfoTxt.toLowerCase().includes(searchValue) ||
				article.ID.toString().includes(searchValue)
			) {
				let row = document.createElement("tr");

				let titleCell = document.createElement("td");
				let summaryCell = document.createElement("td");
				let ratingCell = document.createElement("td");
				let createdCell = document.createElement("td");
				let actionCell = document.createElement("td");

				titleCell.innerText = article.Title;
				summaryCell.innerText = article.InfoTxt;
				ratingCell.innerText = article.rating;
				createdCell.innerText = article.created;
				actionCell.innerHTML =
					"<button class='delete'><img src='../../img/papelera-de-reciclaje.png' alt='delete' width='25vw' height='25vw'></button>";
				actionCell.onclick = () => deleteInfo("USERS", user.Id);

				titleCell.addEventListener("click", function () {
					editCell(titleCell, "Title", article);
				});
				summaryCell.addEventListener("click", function () {
					editCell(summaryCell, "InfoTxt", article);
				});

				row.appendChild(titleCell);
				row.appendChild(summaryCell);
				row.appendChild(ratingCell);
				row.appendChild(createdCell);
				row.appendChild(actionCell);

				tableArticles.appendChild(row);
			}
		});
	}
}

document.getElementById("search").addEventListener("input", search);

function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.querySelectorAll(".logOut").forEach(function (logOutButton) {
	logOutButton.addEventListener("click", function () {
		deleteCookie("userId");

		window.location.href = "http://localhost:5173/";
	});
});


document.getElementById("createReview").addEventListener("click", () => {
    let reviewsTable = document.getElementById("reviewsTable");
    reviewsTable.style.display = "none";
		document.getElementById("reviewForm").style.display = ""
			
});

document.getElementById("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const titulo = document.getElementById("tit").value;
    const infoText = document.getElementById("infoText").value;
    const rating = parseFloat(document.getElementById("rating").value);
		const idArticle = parseInt(document.getElementById("idComment").value);


		let json = JSON.stringify({
			title: titulo,
			info: infoText,
			rating: rating,
			cookie: idUser,
			what: "REVIEW",
			do: "CREATE",
			idArticle: idArticle,

		});
		alert(titulo)
		sendInfo(json);


    document.getElementById("reviewForm").reset();

});

function getReviews() {
	fetch("http://localhost:8080", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "POST",
		},
		body: JSON.stringify({ what: "REVIEWS", limit: 0}),
	})
		.then((response) => {
			return response.text();
		})
		.then((data) => {
			try {
				const jsonData = JSON.parse(data);
				createReviews(jsonData.reviews)
			} catch (error) {
				console.error("Error al convertir a JSON:", error);
			}
		})
		.catch((error) => { });
}
getReviews();
function createReviews(reviews) {
    let reviewsBody = document.getElementById("reviewsBody");

    // Limpiar las filas previas (en caso de que ya haya contenido)
    reviewsBody.innerHTML = '';

    // Iterar sobre las reseñas y agregar las filas
    reviews.forEach((review) => {
        let row = document.createElement("tr");

        let titleCell = document.createElement("td");
        titleCell.textContent = review.Title; 
        row.appendChild(titleCell);

        let textCell = document.createElement("td");
        textCell.textContent = review.InfoText; 
        row.appendChild(textCell);

        let ratingCell = document.createElement("td");
        ratingCell.textContent = review.Rating; 
        row.appendChild(ratingCell);

        let userIdCell = document.createElement("td");
        userIdCell.textContent = review.UsrID; 
        row.appendChild(userIdCell);

        let commentIdCell = document.createElement("td");
        commentIdCell.textContent = review.IDArticle; 
        row.appendChild(commentIdCell);

        reviewsBody.appendChild(row);
    });
}