import React from 'react'

const Contact = () => {
  return (
    <div id="Contact" class="jumbotron box">
	<h1 style={{"text-align": "center","font-weight": "bolder"}}>Contact Us</h1><hr />
	<form action="https://formspree.io/moqknwbn" method="POST">
		<fieldset>
		<div class="row my-3">
			<div class="col col-xs-6">
				<label>First Name <input type="text" name="First name" placeholder="First" class="form-control" required /></label>
			</div>
			<div class="col col-xs-6">
        		<label>Last Name <input class="form-control" type="text" name="Last name" placeholder="Last" required /></label>
			</div>
		</div>
		<div class="form-group my-3">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="_replyto" placeholder="example@gmail.com" required />
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
	    <div class="row">
	    	<div class="col col-xs-12">
	    		<label for="validationTextarea">Any Queries</label>
    <textarea class="form-control" name="message" id="validationTextarea" placeholder="Your Suggestions.." required></textarea>
	    		
	    	</div>
	    </div>
	    <div class="form-group form-check my-3">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" required />
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
	    <div class="row">
	    	<div class="col col-xs-12">
	    		<button type="submit" class="btn btn-success">Send</button>
	    	</div>
	    </div>
    </fieldset>
	</form>
</div>	
  )
}

export default Contact