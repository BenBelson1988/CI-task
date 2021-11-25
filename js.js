//email service init

const sendEmail = (e) => {
  e.preventDefault();

  //get form inputs
  const form = document.getElementById("main-form").elements;

  let firstName = form[0].value;
  let familyName = form[1].value;
  let id = form[2].value;
  let phone = form[3].value;
  let email = form[4].value;
  let city = form[5].value;
  let street = form[6].value;
  let steetNumber = form[7].value;
  let mustApprove = form[8].checked;
  let wantMedia = form[9].checked;

  //form-validation

  document.getElementsByClassName("errorMsg").forEach((element) => {
    element.innerText = "";
  });
  let formValidation = true;

  if (firstName === "" || familyName === "") {
    document.getElementById("nameError").innerText = "נא למלא שם מלא.";
    formValidation = false;
  }

  if (id === "") {
    document.getElementById("idError").innerText = "נא למלא תעודת זהות.";
    formValidation = false;
  }

  if (email === "") {
    document.getElementById("emailError").innerText = "נא למלא אימייל";
    formValidation = false;
  }

  if (!mustApprove) {
    document.getElementById("checkError").innerText =
      "נא לאשר שקראת והסכמת לתנאים.";
    formValidation = false;
  }

  if (!formValidation) return;
  console.log("valid form!");

  var csvFileData = [
    [firstName, "שם פרטי "],
    [familyName, "שם משפחה"],
    [id, "תעודת זהות"],
    [phone, "טלפון נייד"],
    [email, "אימייל"],
    [city, "עיר"],
    [street, "רחוב"],
    [steetNumber, "מספר רחוב"],
    [wantMedia ? "כן" : "לא", "מעוניין בדיור ומידע שיווקי"],
  ];

  //create the csv
  var csv = "0,1\n";
  csvFileData.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });

  //64base
  var b64csv = window.btoa(unescape(encodeURIComponent(csv)));

  //email sending
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "belson1988@gmail.com",
    Password: "843D00BF54DF3032F0F93C557F030137971D",
    To: "maayan.felcher@connectedinsurance.ai",
    From: "belson1988@gmail.com",
    Subject: "CI task, new message from " + firstName,
    Body: "New message from CI task. The details in the CSV file.",
    Attachments: [{ name: "CI_task_csv.csv", data: b64csv }],
  }).then((message) =>
    alert(message === "OK" ? "The request was sent successfully" : message)
  );
};
