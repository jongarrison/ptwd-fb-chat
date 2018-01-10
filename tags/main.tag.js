module.exports = function(){
	const tag = this;
	const db = firebase.database();
	this.messages = [];
	this.login = false;

	this.on('before-mount', function(){
		db.ref('/chat').on('child_added', (data) => {
			tag.messages.push({ 
				key: data.key, 
				val: data.val()
			});
			tag.update();
		});
	}); 

	this.send_message = async function(e){
		e.preventDefault();
		const el = document.getElementById('send-message');
		const val = el.value;

		try {
			await db.ref('/chat').push(val);
		} catch(e) {
			alert(e);
			tag.login = true;
			tag.messages.pop();
			tag.update();
		}

		const el2 = document.querySelector('.messages-window');
		el2.scrollTop = el2.scrollHeight;

		return el.value = '';
	}

	this.login_anonymous = function(){
		try {
			firebase.auth().signInAnonymously();
		} catch(error) {
		  // Handle Errors here.
		  const errorCode = error.code;
		  const errorMessage = error.message;
			console.log('error is ', error);
		  // ...
		} finally {
			tag.login = false;
		}
	}

	this.login_email = function(e){
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		try {
			firebase.auth().createUserWithEmailAndPassword(email, password);
		} catch(error) {
		  // Handle Errors here.
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log('error is ', error);
		  // ...
		} finally {
			tag.login = false;
		}
	}

}












