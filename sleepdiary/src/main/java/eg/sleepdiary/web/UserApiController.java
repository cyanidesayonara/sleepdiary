package eg.sleepdiary.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eg.sleepdiary.domain.User;
import eg.sleepdiary.domain.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")

public class UserApiController {
	
	@Autowired
	private UserRepository userRepo;
	
	//get user by id
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long id)
	        throws ResourceNotFoundException {
	        User user = userRepo.findById(id)
	          .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
	        return ResponseEntity.ok().body(user);
	    }
	
	//get all users
	@GetMapping("/users/")
	public ResponseEntity<Iterable<User>> findAll() {
		Iterable<User> users = userRepo.findAll();
		return new ResponseEntity<Iterable<User>>(users, HttpStatus.OK);
	}
	
	//create new user
	@PostMapping("/users/")
	public ResponseEntity<?> postUser(@RequestBody User user) {
		User createdUser = userRepo.save(user);
		return new ResponseEntity<User>(createdUser, HttpStatus.OK);
	}
	
	//update user
	@PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long id,
         @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));

        user.setUserName(userDetails.getUserName());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(user.getPassword());
        user.setUserLevel(userDetails.getUserLevel());
        final User updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }
	
	//delete user
	@DeleteMapping("/users/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long id)
         throws ResourceNotFoundException {
        User user = userRepo.findById(id)
       .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));

        userRepo.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
