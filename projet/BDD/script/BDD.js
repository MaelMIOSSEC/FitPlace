let xmlhttp = new XMLHttpRequest();
function loadXMLDoc() {
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      fetchData();
    }
  };
  xmlhttp.open(
    "GET",
    "D:/Fac/L1 ISI/depot_finale/projet/BDD/xml/BDD.xml",
    true
  );
  xmlhttp.send();
}

function fetchData() {
  let i;
  let xmlDoc = xmlhttp.responseXML;
  let table =
    "<tr><th>Nom d'utilisateur</th><th>Mot de passe</th><th>Prenom</th><th>Nom de famille</th><th>Adresse</th><th>Code postal</th><th>Email</th></tr>";
  let x = xmlDoc.getElementsByTagName("USER");
  for (i = 0; i < x.length; i++) {
    table +=
      "<tr><td>" +
      x[i].getElementsByTagName("USERNAME")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("FIRSTNAME")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("LASTNAME")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("ADDRESS")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("ZIPCODE")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("MAIL")[0].childNodes[0].nodeValue +
      "</td>" +
      '<td><button type="button" onclick="editForm(' +
      x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
      ')">' +
      "Edit</button></td>" +
      '<td><button type="button" onclick="deleteForm(' +
      x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
      ')">' +
      "Delete</button></td>" +
      "</tr>";
  }
  document.getElementById("data").innerHTML = table;
}

function editForm(id) {
  let tblForm = document.getElementById("tblForm");
  let txtUsername = document.getElementById("txtUsername");
  let txtPassword = document.getElementById("txtPassword");
  let txtFirstname = document.getElementById("txtFirstname");
  let txtLastname = document.getElementById("txtLastname");
  let txtAddress = document.getElementById("txtAddress");
  let txtZipcode = document.getElementById("txtZipcode");
  let txtMail = document.getElementById("txtMail");
  let hId = document.getElementById("hId");

  let xmlDoc = xmlhttp.responseXML;
  let Forms = xmlDoc.getElementsByTagName("USER");
  let Form;

  for (i = 0; i < Forms.length; i++) {
    if (Forms[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
      Form = Forms[i];
    }
  }

  tblBook.style.display = "block";
  hId.value = Form.getElementsByTagName("ID")[0].childNodes[0].nodeValue;
  txtUsername.value =
    Form.getElementsByTagName("USERNAME")[0].childNodes[0].nodeValue;
  txtPassword.value =
    Form.getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue;
  txtFirstname.value =
    Form.getElementsByTagName("FIRSTNAME")[0].childNodes[0].nodeValue;
  txtLastname.value =
    Form.getElementsByTagName("LASTNAME")[0].childNodes[0].nodeValue;
  txtAddress.value =
    Form.getElementsByTagName("ADDRESS")[0].childNodes[0].nodeValue;
  txtZipcode.value =
    Form.getElementsByTagName("ZIPCODE")[0].childNodes[0].nodeValue;
  txtMail.value = Form.getElementsByTagName("MAIL")[0].childNodes[0].nodeValue;
}

function updateForm() {
  let xmlDoc = xmlhttp.responseXML;
  let id = document.getElementById("hId").value;
  let Forms = xmlDoc.getElementsByTagName("USER");
  let Form;

  for (i = 0; i < Forms.length; i++) {
    if (Forms[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
      Form = Forms[i];
    }
  }

  let txtUsername = document.getElementById("txtUsername");
  let txtPassword = document.getElementById("txtPassword");
  let txtFirstname = document.getElementById("txtFirstname");
  let txtLastname = document.getElementById("txtLastname");
  let txtAddress = document.getElementById("txtAddress");
  let txtZipcode = document.getElementById("txtZipcode");
  let txtMail = document.getElementById("txtMail");

  Form.getElementsByTagName("USERNAME")[0].childNodes[0].nodeValue =
    txtUsername.value;
  Form.getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue =
    txtPassword.value;
  Form.getElementsByTagName("FIRSTNAME")[0].childNodes[0].nodeValue =
    txtFirstname.value;
  Form.getElementsByTagName("LASTNAME")[0].childNodes[0].nodeValue =
    txtLastname.value;
  Form.getElementsByTagName("ADDRESS")[0].childNodes[0].nodeValue =
    txtAddress.value;
  Form.getElementsByTagName("ZIPCODE")[0].childNodes[0].nodeValue =
    txtZipcode.value;
  Form.getElementsByTagName("MAIL")[0].childNodes[0].nodeValue = txtMail.value;

  fetchData();
}

function deleteForm(id) {
  let xmlDoc = xmlhttp.responseXML;
  let Forms = xmlDoc.getElementsByTagName("USER");
  let Form;

  for (i = 0; i < Forms.length; i++) {
    if (Forms[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
      Form = Forms[i];
    }
  }

  xmlDoc.documentElement.removeChild(Form);
  fetchData();
}

function makeTextFile(text) {
  let textFile = null;
  let data = new Blob([text], { type: "text/plain" });

  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  return textFile;
}

function saveForm() {
  let create = document.getElementById("btnSave");

  let link = document.createElement("a");
  link.setAttribute("download", "BDD.xml");

  const s = new XMLSerializer();

  link.href = makeTextFile(s.serializeToString(xmlhttp.responseXML));
  document.body.appendChild(link);

  window.requestAnimationFrame(function () {
    let event = new MouseEvent("click");
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}

function addForm() {
  let xmlDoc = xmlhttp.responseXML;
  let Forms = xmlDoc.getElementsByTagName("USER");
  let Form = xmlDoc.createElement("USER");
  let id = xmlDoc.createElement("ID");
  let Username = xmlDoc.createElement("USERNAME");
  let Password = xmlDoc.createElement("PASSWORD");
  let Firstname = xmlDoc.createElement("FIRSTNAME");
  let Lastname = xmlDoc.createElement("LASTNAME");
  let Address = xmlDoc.createElement("ADDRESS");
  let Zipcode = xmlDoc.createElement("ZIPCODE");
  let Mail = xmlDoc.createElement("MAIL");
  let Username_value = txtUsername.value;
  let Password_value = txtPassword.value;
  let Firstname_value = txtFirstname.value;
  let Lastname_value = txtLastname.value;
  let Address_value = txtAddress.value;
  let Zipcode_value = txtZipcode.value;
  let Mail_value = txtMail.value;
  let id_Text = xmlDoc.createTextNode(Forms.length + 1);
  id.appendChild(id_Text);
  let Username_Text = xmlDoc.createTextNode(Username_value);
  Username.appendChild(Username_Text);
  let Password_Text = xmlDoc.createTextNode(Password_value);
  Password.appendChild(Password_Text);
  let Firstname_Text = xmlDoc.createTextNode(Firstname_value);
  Firstname.appendChild(Firstname_Text);
  let Lastname_Text = xmlDoc.createTextNode(Lastname_value);
  Lastname.appendChild(Lastname_Text);
  let Address_Text = xmlDoc.createTextNode(Address_value);
  Address.appendChild(Address_Text);
  let Zipcode_Text = xmlDoc.createTextNode(Zipcode_value);
  Zipcode.appendChild(Zipcode_Text);
  let Mail_Text = xmlDoc.createTextNode(Mail_value);
  Mail.appendChild(Mail_Text);
  Form.append(id);
  Form.appendChild(Username);
  Form.appendChild(Password);
  Form.appendChild(Firstname);
  Form.appendChild(Lastname);
  Form.appendChild(Address);
  Form.appendChild(Zipcode);
  Form.appendChild(Mail);
  let library = xmlDoc.getElementsByTagName("LIBRARY")[0];
  library.appendChild(Form);
  fetchData();
}
