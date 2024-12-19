let inputemail = document.getElementById("email");
let inputpsswd = document.getElementById("psswd");
let btnSignup = document.getElementById("btnSignUp");

//array para almacenar los articulos a medida que los consumimos
let articles = [];

// es 2 ya que es el ultimo valor que se ve de las tarjetas del blog
let currentArticle = 2;

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
////// funcionando, recibe php, vamos a testear de a;adir al dom
function login(data) {
	fetch("http://localhost:8080", {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Access-Control-Request-Method": "PUT",
		},
		body: data,
	})
		.then((response) => {
			console.log("Respuesta recibida:", response.status);
			return response.json();
		})
		.then((data) => {
			console.log("Datos recibidos:", data);
			saveLoginCookies(data);
		});
}
btnSignup.addEventListener("click", () => {
	let verifyUSR = JSON.stringify({
		what: "USRS",
		do: "CHECK",
		usr: inputemail.value,
		pwd: inputpsswd.value,
	});
	login(verifyUSR);
	inputemail.value = "";
	inputpsswd.value = "";
});

function saveLoginCookies(username) {
	console.log(username["cookie"]);
	if (!username["cookie"]) {
		return;
	}
	let expire = new Date();
	expire.setDate(expire.getDate() + 20);

	document.cookie =
		"userId=" +
		username["cookie"] +
		"; expires=" +
		expire.toUTCString() +
		"; path=/";
		window.location.href = "../../index.html"; 
}
function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.querySelectorAll('.logOut').forEach(function(logOutButton) {
	logOutButton.addEventListener('click', function() {
		deleteCookie('userId');
		
		window.location.href = 'http://localhost:5173/';  
	});
});
