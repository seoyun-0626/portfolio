(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS public key 입력
})();

function sendResume() {
  const userEmail = document.getElementById("userEmail").value;

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    to_email: userEmail
  }).then(() => {
    alert("이력서가 전송되었습니다!");
  });
}
