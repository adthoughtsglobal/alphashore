var dexts = ["com", "net", "co", "org", "io"]
function gid(gg) {
	return document.getElementById(gg);
}
var amihost = false;
var tgid = null; // Initialize tgid
var waitingTimeout = null; // Initialize the timeout variable
var loader = `<span class="loader"></span>`;
var trdiv = gid("tfr"), sesr = [];

var net = new WebSocket("wss://wss.adthoughtsglobal.repl.co");

net.onopen = (event) => {
	console.log("Connected to the Shore Network!");
};

function iframeLoadedSuccessfully() {

	if (trdiv) {
		return trdiv.innerHTML == "<center style='color: white; padding-top: 20vh;'>Requesting...</center>";
	}
}


net.onmessage = (event) => {
	console.log(event.data);
	let inda = JSON.parse(event.data);
	try {
		if (inda.ty == "gd" && inda.gt == gid("mydm").value) {
			let x = {};
			x.dt = gid("tbsd").value;
			x.id = inda.id;
			x.ty = "hd";
			net.send(JSON.stringify(x));
		}
		if (inda.ty == "hd" && inda.id == tgid) {

			if (trdiv) {
				trdiv.innerHTML = inda.dt;
				clearTimeout(waitingTimeout);
				gid("load").innerHTML = "";
			}
		}
	} catch (error) {
		console.error("Error parsing JSON:", error);
	}
	if (amihost) {
		if (inda.ty === "ses" && absc(gid("ttbs").value, inda.vl)) {
			let x = {};
			x.dt = gid("tbsd").value.substring(0, 17);
			x.id = inda.id;
			x.ty = "sesh";
			x.dm = gid("mydm").value;
			x.vl = gid("ttbs").value;
			net.send(JSON.stringify(x));
		}
	}
	if (inda.ty == "sesh" && inda.id == tgid) {
		let x = {};
		x.t = inda.vl;
		x.d = inda.dt;
		x.s = inda.dm;
		sesr.push(x)
	}
};

const uppercasePattern = /[A-Z]/;

// Function to check if a string contains one or more uppercase letters
function hasUppercaseLetters(inputString) {
	// Use the test method of the regular expression to check for uppercase letters
	return uppercasePattern.test(inputString);
}

function hostSite() {
	let x = prompt("What do you want your domain name to be?\n\nThis will be followed by a 3 letter random code.");
	if (x != null) {
		if (hasUppercaseLetters(x)) {
			alert("The site domain, " + x + ", will be lowercased into " + x.toLowerCase());
			x = x.toLowerCase();
		}

		gid("mydm").value = x + "." + guc2();
		gid("hp").showModal();
		amihost = true;
	}
}

function brg() {
	if (trdiv) {
		// Clear the content of body
		trdiv.innerHTML = "";

		// Set the "Requesting..." message
		trdiv.innerHTML = `<center style=' padding-top: 20vh;'><div class="custom-loader"></div></center>`;
	}

	if (gid("buin").value != "ad.com") {
		gid("load").innerHTML = loader;
		let x = {};
		x.id = guc();
		x.ty = "gd";
		x.gt = gid("buin").value;
		net.send(JSON.stringify(x)); // Convert to JSON before sending
		tgid = x.id;

		// Set a timeout of 3 seconds
		waitingTimeout = setTimeout(function() {
			if (!iframeLoadedSuccessfully()) {
				// Clear the content and set a 404 message
				if (trdiv) {
					trdiv.innerHTML = "<center style='color: white; padding-top: 20vh;'><h1>404</h1>No Such Server Exist.</center>";
				}
				gid("load").innerHTML = "";
			}
		}, 3000);
	} else {
		gid("tfr").src = "https://home.adthoughtsglobal.repl.co/";
	}
}

function guc() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
	const codeLength = 10;
	let uniqueCode = '';

	for (let i = 0; i < codeLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		uniqueCode += characters.charAt(randomIndex);
	}

	return uniqueCode;
}

function guc2() {
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const codeLength = 3;
	let uniqueCode = '';

	for (let i = 0; i < codeLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		uniqueCode += characters.charAt(randomIndex);
	}

	return uniqueCode;
}

function goq(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		sesearch();
	}
}

function oturl(ed) {
	gid("buin").value = ed;
	brg();
	gid("br").showModal();
}

function stbm() {
	gid('br').showModal();
	gid("buin").focus();
	gid("buin").select();
}

function sesearch() {
	gid("seres").innerHTML = "<div class='oftr'><sup>Searching over 9000 libraries...</sup></div>";
	let x = {};
	x.id = guc();
	tgid = x.id;
	x.ty = "ses";
	x.vl = gid("seinp").value;
	net.send(JSON.stringify(x));
	seseths()
	setTimeout(function() {
		renderJSONDataToHTML(sesr);
	}, 2000)
}

function seseths() {
	const searchParam = gid("seinp").value;

	// Adjust the Levenshtein distance threshold here (e.g., 5).
	const threshold = 5;

	getResult(searchParam, threshold).then((result) => {
		
	gid("seres").innerHTML = "";
		if (result) {
			gid("seres").innerHTML += `<div class='oftr'><p>${result.result}</p><sup>Data we have indexed.</sup></div>`;
			console.log(`Search term: "${searchParam}"`);
			console.log(`Best match: "${result.key}"`);
			console.log(`Result: ${result.result}`);
		} else {
			console.log('No result found.');
		}
	});
}

function absc(str1, str2, threshold = 0.7) {
	const matrix = [];

	for (let i = 0; i <= str1.length; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= str2.length; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= str1.length; i++) {
		for (let j = 1; j <= str2.length; j++) {
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j - 1] + cost
			);
		}
	}

	const maxLen = Math.max(str1.length, str2.length);
	const similarityRatio = 1 - matrix[str1.length][str2.length] / maxLen;

	return similarityRatio >= threshold;
}

function renderJSONDataToHTML(jsonList) {
	if (jsonList.length < 1) {
		document.getElementById("seres").innerHTML += `<div class='oftr'><p>No server serves your search term as title. Use the browser to discover individual pages.</p><sup>That's all we know.</sup></div>`
	}
	const serusElement = document.getElementById("seres");

	// Loop through the JSON list and create a div for each item
	for (const item of jsonList) {
		const div = document.createElement("div");

		// Check if the JSON item has keys 't', 'd', and 's'
		if (item.hasOwnProperty('t') && item.hasOwnProperty('d') && item.hasOwnProperty('s')) {
			// Set the HTML content of the div using the values from the JSON
			div.classList = "oftr";
			div.setAttribute("onclick", "oturl('"+ item.s +"')")
			div.innerHTML = `
                <h1>${item.t}</h1>
                <p>${item.d}...</p>
                <sup>URL: ${item.s}</sup>
            `;
			sesr = []
		} else {
			return;
		}

		// Append the div to the "serus" element
		serusElement.appendChild(div);
	}
}

function calculateLevenshteinDistance(a, b) {
	const matrix = Array.from(Array(a.length + 1), (_, i) => [i]);
	for (let j = 0; j < b.length; j++) {
		matrix[0][j + 1] = j + 1;
	}

	for (let i = 0; i < a.length; i++) {
		for (let j = 0; j < b.length; j++) {
			const cost = a[i] === b[j] ? 0 : 1;
			matrix[i + 1][j + 1] = Math.min(
				matrix[i][j + 1] + 1, // Deletion
				matrix[i + 1][j] + 1, // Insertion
				matrix[i][j] + cost   // Substitution
			);
		}
	}

	return matrix[a.length][b.length];
}

// Define a function to fetch and return the result based on the most similar key.
async function getResult(param, threshold = 3) {
	try {
		// Fetch the JSON data from the server.
		const response = await fetch('/ans.json');
		const data = await response.json();

		// Initialize variables to track the best match and its corresponding value.
		let bestMatch = '';
		let bestMatchValue = '';
		let bestDistance = Infinity;

		// Iterate through the keys in the JSON data.
		for (const key in data) {
			const distance = calculateLevenshteinDistance(param.toLowerCase(), key.toLowerCase());

			// If the Levenshtein distance is below the threshold and better (smaller), update the best match.
			if (distance < threshold && distance < bestDistance) {
				bestDistance = distance;
				bestMatch = key;
				bestMatchValue = data[key];
			}
		}

		// If no match is found above the threshold, return null.
		if (bestDistance === Infinity) {
			return null;
		}

		// Return the result of the best matching key.
		return { key: bestMatch, result: bestMatchValue };
	} catch (error) {
		// Handle any errors that occur during the fetch.
		console.error('Error fetching data:', error);
		return null;
	}
}