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


let name = document.getElementById("firstName")
let surname = document.getElementById("lastName")
let mail = document.getElementById("email")
let pwd = document.getElementById("password")
let age = document.getElementById("age")

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
	});
	sendInfo(json);
	name.value = "";
	surname.value = "";
	mail.value = "";
	pwd.value = "";
	rol.value = "USR";
	age.value = "";
		window.location.href = 'http://localhost:5173/';  
});
